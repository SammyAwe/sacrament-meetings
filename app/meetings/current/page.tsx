import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import type { SacramentMeeting } from '@/lib/types';

async function getMeetings(): Promise<SacramentMeeting[]> {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';

  if (!host) {
    throw new Error('Unable to determine the application address.');
  }

  const response = await fetch(`${protocol}://${host}/api/meetings`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to retrieve meetings.');
  }

  const data = await response.json();

  return data.meetings;
}

export default async function CurrentMeetingPage() {
  const meetings = await getMeetings();

  const today = new Date().toISOString().split('T')[0];

  const currentMeeting = meetings
    .filter(
      (meeting) =>
        meeting.date <= today &&
        new Date(`${meeting.date}T00:00:00`).getDay() === 0
    )
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  if (!currentMeeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${currentMeeting.id}`);
}