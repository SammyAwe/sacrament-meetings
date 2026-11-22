'use client';

import Link from 'next/link';

export default function MeetingsError({
  reset,
}: {
  reset: () => void;
}) {
  return (
    <main className="flex-1 bg-blue-50 px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-blue-950">
          Something went wrong
        </h2>

        <p className="mt-4 text-gray-600">
          We could not load the meetings. Please try again.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={reset}
            className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Try Again
          </button>

          <Link
            href="/meetings"
            className="rounded-lg border border-blue-700 px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50"
          >
            Back to Meetings
          </Link>
        </div>
      </div>
    </main>
  );
}