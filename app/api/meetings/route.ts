import { NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  const meetings = getMeetings(date || undefined);

  return NextResponse.json({
    success: true,
    count: meetings.length,
    meetings,
  });
}