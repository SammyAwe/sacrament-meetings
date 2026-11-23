
'use server';

import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import {
  createMeeting as insertMeeting,
  updateMeeting as saveMeeting,
  deleteMeeting as removeMeeting,
} from '@/lib/meetings-db';

const MeetingFormSchema = z.object({
  date: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid meeting date.')
    .refine((value) => {
      const [year, month, day] = value.split('-').map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));

      return (
        date.getUTCFullYear() === year &&
        date.getUTCMonth() === month - 1 &&
        date.getUTCDate() === day
      );
    }, 'Enter a real calendar date.'),
  meetingType: z.enum(['testimony', 'regular', 'stake', 'general', 'special']),
  presiding: z.string().trim().min(1, 'Enter the presiding person.'),
  conducting: z.string().trim().min(1, 'Enter the conducting person.'),
  announcements: z.string().optional().default(''),
  openingHymnNumber: z.coerce.number().int().positive('Enter a valid hymn number.'),
  openingHymnTitle: z.string().trim().min(1, 'Enter the opening hymn title.'),
  openingPrayer: z.string().trim().min(1, 'Enter the opening prayer.'),
  wardBusiness: z.string().optional().default(''),
  stakeBusiness: z.preprocess((value) => value === 'on', z.boolean()),
  sacramentHymnNumber: z.coerce.number().int().positive('Enter a valid hymn number.'),
  sacramentHymnTitle: z.string().trim().min(1, 'Enter the sacrament hymn title.'),
  speakers: z.string().optional().default('').refine(
    (value) =>
      value.split('\n').every((line) => {
        if (!line.trim()) return true;

        const parts = line.split('|').map((part) => part.trim());

        return (
          parts.length === 3 &&
          Boolean(parts[0]) &&
          Boolean(parts[1]) &&
          ['speaker', 'musical-number'].includes(parts[2])
        );
      }),
    'Use this format for each line: Name | Topic | speaker or musical-number.'
  ),
  closingHymnNumber: z.coerce.number().int().positive('Enter a valid hymn number.'),
  closingHymnTitle: z.string().trim().min(1, 'Enter the closing hymn title.'),
  closingPrayer: z.string().trim().min(1, 'Enter the closing prayer.'),
});

export type State = {
  message: string;
  errors?: Record<string, string[] | undefined>;
};

async function requireBishopric() {
  const session = await auth();

  if (!session?.user || session.user.role !== 'bishopric') {
    redirect('/login');
  }
}

function toMeeting(data: z.infer<typeof MeetingFormSchema>) {
  const speakers = data.speakers
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, topic, type] = line.split('|').map((part) => part.trim());

      return {
        name,
        topic,
        type: type as 'speaker' | 'musical-number',
      };
    });

  return {
    date: data.date,
    meetingType: data.meetingType,
    presiding: data.presiding,
    conducting: data.conducting,
    announcements: data.announcements
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean),
    openingHymn: {
      number: data.openingHymnNumber,
      title: data.openingHymnTitle,
    },
    openingPrayer: data.openingPrayer,
    wardBusiness: data.wardBusiness
      .split('\n')
      .map((description) => description.trim())
      .filter(Boolean)
      .map((description) => ({ description })),
    stakeBusiness: data.stakeBusiness,
    sacramentHymn: {
      number: data.sacramentHymnNumber,
      title: data.sacramentHymnTitle,
    },
    speakers,
    closingHymn: {
      number: data.closingHymnNumber,
      title: data.closingHymnTitle,
    },
    closingPrayer: data.closingPrayer,
  };
}

export async function createMeeting(
  _prevState: State,
  formData: FormData
): Promise<State> {
  await requireBishopric();

  const parsed = MeetingFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    return {
      message: 'Please correct the errors below.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await insertMeeting(toMeeting(parsed.data));
  } catch (error) {
    console.error('Create meeting failed:', error);
    throw new Error('Unable to create the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}

export async function updateMeeting(
  id: number,
  _prevState: State,
  formData: FormData
): Promise<State> {
  await requireBishopric();

  const parsed = MeetingFormSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!parsed.success) {
    return {
      message: 'Please correct the errors below.',
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  try {
    await saveMeeting(id, toMeeting(parsed.data));
  } catch (error) {
    console.error('Update meeting failed:', error);
    throw new Error('Unable to update the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  revalidatePath(`/meetings/${id}`);
  redirect('/meetings');
}

export async function deleteMeeting(id: number) {
  await requireBishopric();

  try {
    await removeMeeting(id);
  } catch (error) {
    console.error('Delete meeting failed:', error);
    throw new Error('Unable to delete the meeting. Please try again.');
  }

  revalidatePath('/meetings');
  redirect('/meetings');
}
