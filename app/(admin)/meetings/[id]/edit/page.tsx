import { notFound } from 'next/navigation';
import MeetingForm from '@/components/MeetingForm';
import { updateMeeting } from '@/lib/actions';
import { getMeetingById } from '@/lib/meetings-db';

export const instant = false;

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
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
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-950">
          Edit Sacrament Meeting
        </h1>

        <p className="mb-8 mt-3 text-gray-600">
          Update the details for this sacrament meeting.
        </p>

        <MeetingForm
          action={updateMeeting.bind(null, meetingId)}
          initialData={meeting}
        />
      </div>
    </main>
  );
}