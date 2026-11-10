'use client';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(
    `${meeting.date}T00:00:00`
  ).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <article className="mx-auto max-w-4xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
      <header className="border-b border-gray-200 pb-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
          Lagos Mainland Ward
        </p>

        <h1 className="mt-2 text-3xl font-bold text-gray-900">
          Sacrament Meeting
        </h1>

        <p className="mt-2 text-gray-600">{formattedDate}</p>

        <span className="mt-3 inline-block rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold capitalize text-blue-800">
          {meeting.meetingType} Meeting
        </span>
      </header>

      <section className="grid gap-4 border-b border-gray-200 py-6 sm:grid-cols-2">
        <div>
          <h2 className="font-semibold text-gray-900">Presiding</h2>
          <p className="mt-1 text-gray-600">{meeting.presiding}</p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900">Conducting</h2>
          <p className="mt-1 text-gray-600">{meeting.conducting}</p>
        </div>
      </section>

      <section className="border-b border-gray-200 py-6">
        <h2 className="text-lg font-bold text-gray-900">Announcements</h2>

        {meeting.announcements && meeting.announcements.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
            {meeting.announcements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-500">No announcements.</p>
        )}
      </section>

      <section className="space-y-6 border-b border-gray-200 py-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Opening Hymn</h2>
          <p className="mt-2 text-gray-600">
            Hymn {meeting.openingHymn.number}: {meeting.openingHymn.title}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900">Opening Prayer</h2>
          <p className="mt-2 text-gray-600">{meeting.openingPrayer}</p>
        </div>
      </section>

      <section className="border-b border-gray-200 py-6">
        <h2 className="text-lg font-bold text-gray-900">Ward Business</h2>

        {meeting.wardBusiness.length > 0 ? (
          <ul className="mt-3 list-disc space-y-2 pl-6 text-gray-600">
            {meeting.wardBusiness.map((item, index) => (
              <li key={index}>{item.description}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-500">No ward business.</p>
        )}

        <p className="mt-4 text-gray-600">
          <span className="font-semibold text-gray-900">Stake Business:</span>{' '}
          {meeting.stakeBusiness ? 'Yes' : 'No'}
        </p>
      </section>

      <section className="border-b border-gray-200 py-6">
        <h2 className="text-lg font-bold text-gray-900">Sacrament Hymn</h2>
        <p className="mt-2 text-gray-600">
          Hymn {meeting.sacramentHymn.number}: {meeting.sacramentHymn.title}
        </p>
      </section>

      <section className="border-b border-gray-200 py-6">
        <h2 className="text-lg font-bold text-gray-900">
          Speakers and Musical Numbers
        </h2>

        {meeting.speakers.length > 0 ? (
          <ul className="mt-3 space-y-4">
            {meeting.speakers.map((item, index) => (
              <li key={index}>
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">{item.topic}</p>
                <p className="text-xs capitalize text-blue-700">
                  {item.type.replace('-', ' ')}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-gray-500">
            No speakers or musical numbers listed.
          </p>
        )}
      </section>

      <section className="space-y-6 py-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Closing Hymn</h2>
          <p className="mt-2 text-gray-600">
            Hymn {meeting.closingHymn.number}: {meeting.closingHymn.title}
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900">Closing Prayer</h2>
          <p className="mt-2 text-gray-600">{meeting.closingPrayer}</p>
        </div>
      </section>

      <div className="mt-4 flex justify-center print:hidden">
        <button
          type="button"
          onClick={() => window.print()}
          className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Print Meeting Program
        </button>
      </div>
    </article>
  );
}
