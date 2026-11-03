import MeetingCard from '@/components/MeetingCard';
import type { SacramentMeeting } from '@/lib/types';
import { headers } from 'next/headers';

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

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <main className="flex-1 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-blue-700">
            Lagos Mainland Ward
          </p>

          <h1 className="mt-2 text-3xl font-bold text-blue-900">
            All Sacrament Meetings
          </h1>

          <p className="mt-3 text-slate-600">
            Browse meeting programs and view their complete details.
          </p>
        </div>

        {meetings.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {meetings.map((meeting) => (
              <MeetingCard key={meeting.id} meeting={meeting} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-blue-50 p-6 text-center text-slate-600">
            No meetings found.
          </p>
        )}
      </div>
    </main>
  );
}