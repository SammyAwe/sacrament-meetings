'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchQuery = searchParams.get('query') ?? '';

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term.trim()) {
      params.set('query', term.trim());
    } else {
      params.delete('query');
    }

    params.delete('page');

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname);
  }, 300);

  return (
    <div className="mb-8">
      <label htmlFor="meeting-search" className="sr-only">
        Search meetings
      </label>

      <input
        id="meeting-search"
        type="search"
        placeholder="Search by name or meeting type..."
        defaultValue={searchQuery}
        key={searchQuery}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded-lg border border-blue-200 bg-white px-4 py-3 text-gray-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
}