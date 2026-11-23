import sql from '@/lib/db';

export interface BishopricUser {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
}

export async function getUserByEmail(
  email: string
): Promise<BishopricUser | null> {
  const users = await sql`
    SELECT id, name, email, password_hash, role
    FROM bishopric_users
    WHERE email = ${email.toLowerCase().trim()}
    LIMIT 1
  `;

  return (users[0] as BishopricUser) ?? null;
}