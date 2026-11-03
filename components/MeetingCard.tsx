
import Link from 'next/link';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(
    `${meeting.date}T00:00:00`
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-gray-900">
          {formattedDate}
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold capitalize text-blue-800">
          {meeting.meetingType} Meeting
        </span>
      </div>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p>
          <span className="font-semibold text-gray-800">Presiding:</span>{' '}
          {meeting.presiding}
        </p>

        <p>
          <span className="font-semibold text-gray-800">Conducting:</span>{' '}
          {meeting.conducting}
        </p>

        <p>
          <span className="font-semibold text-gray-800">Opening Hymn:</span>{' '}
          {meeting.openingHymn.title} (No. {meeting.openingHymn.number})
        </p>

        <p>
          <span className="font-semibold text-gray-800">Program items:</span>{' '}
          {meeting.speakers.length}
        </p>
      </div>

      <div className="mt-6">
        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-flex rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          View Meeting Details
        </Link>
      </div>
    </article>
  );
}
