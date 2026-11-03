import { notFound } from 'next/navigation';
import { headers } from 'next/headers';
import MeetingDetail from '@/components/MeetingDetail';
import type { SacramentMeeting } from '@/lib/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getMeeting(id: string): Promise<SacramentMeeting | null> {
  const headersList = await headers();
  const host = headersList.get('host');
  const protocol = headersList.get('x-forwarded-proto') ?? 'http';

  if (!host) {
    throw new Error('Unable to determine the application address.');
  }

  const response = await fetch(
    `${protocol}://${host}/api/meetings/${id}`,
    {
      cache: 'no-store',
    }
  );

  if (response.status === 400 || response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error('Failed to retrieve meeting details.');
  }

  const data = await response.json();

  return data.meeting;
}

export default async function MeetingPage({ params }: PageProps) {
  const { id } = await params;
  const meeting = await getMeeting(id);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="flex-1 bg-blue-50 px-6 py-12">
      <MeetingDetail meeting={meeting} />
    </main>
  );
}