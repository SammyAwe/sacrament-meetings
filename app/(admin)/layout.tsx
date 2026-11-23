import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';
import { logout } from './actions';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await connection();

  const session = await auth();

  if (!session?.user || session.user.role !== 'bishopric') {
    redirect('/login');
  }

  return (
    <>
      <div className="mx-auto flex max-w-6xl justify-end px-6 py-4">
        <form action={logout}>
          <button
            type="submit"
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </form>
      </div>

      {children}
    </>
  );
}