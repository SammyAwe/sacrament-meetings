import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex-1 bg-white">
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-widest text-blue-700">
            Lagos Mainland Ward
          </p>

          <h2 className="text-4xl font-bold leading-tight text-blue-900 md:text-5xl">
            Plan and Organize Your Sacrament Meetings
          </h2>

          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            Keep meeting programs organized in one place. View upcoming
            meetings, review assignments, and access complete meeting details.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/meetings"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              View All Meetings
            </Link>

            <Link
              href="/meetings/current"
              className="rounded-lg border border-blue-200 px-6 py-3 font-semibold text-blue-700 transition-colors hover:bg-blue-50"
            >
              Current Meeting
            </Link>
          </div>
        </div>

        <div className="flex justify-center">
          <Image
            src="/meeting-program.svg"
            alt="Blue and white illustration of an organized meeting program"
            width={640}
            height={440}
            priority
            className="h-auto w-full max-w-xl"
          />
        </div>
      </section>

      <section className="border-t border-blue-100 bg-blue-50">
        <div className="mx-auto max-w-6xl px-6 py-12 text-center">
          <h2 className="text-2xl font-bold text-blue-900">
            Everything You Need for Your Meeting
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-600">
            Access meeting schedules, hymns, prayers, announcements, ward
            business, speakers, and musical numbers.
          </p>
        </div>
      </section>
    </main>
  );
}