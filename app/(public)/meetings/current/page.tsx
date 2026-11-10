
import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

export default async function CurrentMeetingPage() {
  const result = await getMeetings();
  const meetings = result.meetings;

  const today = new Date().toISOString().split('T')[0];

  const currentMeeting = meetings
    .filter(
      (meeting) =>
        meeting.date <= today &&
        new Date(`${meeting.date}T00:00:00`).getDay() === 0
    )
    .sort((a, b) => b.date.localeCompare(a.date))[0];

  if (!currentMeeting) {
    redirect('/meetings');
  }

  redirect(`/meetings/${currentMeeting.id}`);
}
