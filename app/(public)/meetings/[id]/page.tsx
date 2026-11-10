
import { notFound } from 'next/navigation';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';

export const instant = false;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function MeetingPage({ params }: PageProps) {
  const { id } = await params;
  const meetingId = Number(id);

  if (!Number.isInteger(meetingId) || meetingId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    notFound();
  }

  return (
    <main className="flex-1 bg-blue-50 px-6 py-12">
      <MeetingDetail meeting={meeting} />
    </main>
  );
}
