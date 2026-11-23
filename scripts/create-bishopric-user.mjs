
import { neon } from '@neondatabase/serverless';
import { hash } from 'bcryptjs';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing. Check your .env.local file.');
}

const sql = neon(process.env.DATABASE_URL);
const rl = createInterface({ input: stdin, output: stdout });

try {
  console.log('\nCreate the first bishopric account\n');

  const name = (await rl.question('Full name: ')).trim();
  const email = (await rl.question('Email address: ')).trim().toLowerCase();
  const password = await rl.question('Password: ');

  if (!name || !email || !email.includes('@')) {
    throw new Error('Please enter a valid name and email address.');
  }

  if (password.length < 12) {
    throw new Error('Use a password with at least 12 characters.');
  }

  const passwordHash = await hash(password, 12);

  const users = await sql`
    INSERT INTO bishopric_users (name, email, password_hash, role)
    VALUES (${name}, ${email}, ${passwordHash}, 'bishopric')
    ON CONFLICT (email) DO NOTHING
    RETURNING id, name, email, role
  `;

  if (users.length === 0) {
    console.log('\nAn account with that email already exists.');
  } else {
    console.log('\nBishopric account created successfully:');
    console.log(users[0]);
  }
} catch (error) {
  console.error('\nCould not create account:', error.message);
  process.exitCode = 1;
} finally {
  rl.close();
}
