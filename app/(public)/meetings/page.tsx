import { Suspense } from 'react';
import MeetingCard from '@/components/MeetingCard';
import MeetingSearch from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import { getMeetings } from '@/lib/meetings-db';

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const params = await searchParams;
  const query = params.query || '';
  const page = Math.max(1, Number(params.page) || 1);

  const result = await getMeetings({
    query,
    page,
    limit: 5,
  });

  const meetings = result.meetings;

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

        <Suspense fallback={<div className="mb-8 h-12" />}>
          <MeetingSearch />
        </Suspense>

        {meetings.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {meetings.map((meeting) => (
                <MeetingCard key={meeting.id} meeting={meeting} />
              ))}
            </div>

            <Suspense fallback={null}>
              <Pagination totalPages={result.totalPages} />
            </Suspense>
          </>
        ) : (
          <p className="rounded-lg bg-blue-50 p-6 text-center text-slate-600">
            No meetings found.
          </p>
        )}
      </div>
    </main>
  );
}