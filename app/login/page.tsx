import { login } from './actions';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { connection } from 'next/server';

export const instant = false;

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  await connection();

  const session = await auth();

  if (session?.user?.role === 'bishopric') {
    redirect('/meetings/new');
  }

  const params = await searchParams;
  const hasError = Boolean(params.error);

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <div className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold">
          Bishopric Login
        </h1>

        <p className="mb-6 text-sm text-gray-600">
          Sign in to manage sacrament meetings.
        </p>

        {hasError && (
          <p
            role="alert"
            className="mb-4 rounded-md bg-red-50 p-3 text-sm text-red-700"
          >
            Invalid email or password. Please try again.
          </p>
        )}

        <form action={login} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
}