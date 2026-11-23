
import MeetingForm from '@/components/MeetingForm';
import { createMeeting } from '@/lib/actions';

export const instant = false;

export default function NewMeetingPage() {
  return (
    <main className="flex-1 bg-blue-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-blue-950">
          Create Sacrament Meeting
        </h1>

        <p className="mb-8 mt-3 text-gray-600">
          Enter the details for the new sacrament meeting.
        </p>

        <MeetingForm action={createMeeting} />
      </div>
    </main>
  );
}
