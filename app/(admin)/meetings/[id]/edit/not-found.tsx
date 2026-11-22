import Link from 'next/link';

export default function EditMeetingNotFound() {
  return (
    <main className="flex-1 bg-blue-50 px-6 py-16">
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-bold text-blue-950">
          Meeting Not Found
        </h2>

        <p className="mt-4 text-gray-600">
          The meeting you are trying to edit does not exist or may have been removed.
        </p>

        <Link
          href="/meetings"
          className="mt-6 inline-flex rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-800"
        >
          Back to Meetings
        </Link>
      </div>
    </main>
  );
}