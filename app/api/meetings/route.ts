
import { NextResponse } from 'next/server';
import { getMeetings } from '@/lib/meetings-db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  const result = await getMeetings({
    date: date || undefined,
  });

  return NextResponse.json({
    success: true,
    count: result.totalCount,
    meetings: result.meetings,
  });
}
