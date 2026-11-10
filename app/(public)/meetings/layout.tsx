import { Suspense } from 'react';
import NavLinks from '@/components/NavLinks';

export default function MeetingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="border-b border-blue-100 bg-blue-50">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <Suspense fallback={<div className="h-5" />}>
            <NavLinks />
          </Suspense>
        </div>
      </div>

      {children}
    </>
  );
}