export default function Loading() {
  return (
    <main className="flex min-h-[50vh] items-center justify-center bg-white px-6">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

        <p className="mt-4 font-medium text-blue-800">
          Loading meetings...
        </p>
      </div>
    </main>
  );
}