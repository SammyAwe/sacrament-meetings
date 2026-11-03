
import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-11-01',
    meetingType: 'testimony',
    presiding: 'Bishop David Johnson',
    conducting: 'Brother Michael Brown',
    announcements: [
      'Ward activities will hold on Saturday.',
      'Please remember to support the missionary work.'
    ],
    openingHymn: {
      number: 2,
      title: 'The Spirit of God'
    },
    openingPrayer: 'Brother James Wilson',
    wardBusiness: [
      { description: 'Sustaining of ward officers.' }
    ],
    stakeBusiness: false,
    sacramentHymn: {
      number: 185,
      title: 'Reverently and Meekly Now'
    },
    speakers: [],
    closingHymn: {
      number: 19,
      title: 'We Thank Thee, O God, for a Prophet'
    },
    closingPrayer: 'Brother Daniel White'
  },
  {
    id: 2,
    date: '2026-10-25',
    meetingType: 'regular',
    presiding: 'Bishop David Johnson',
    conducting: 'Brother Michael Brown',
    announcements: ['Youth activity this Friday.'],
    openingHymn: {
      number: 3,
      title: 'Now Let Us Rejoice'
    },
    openingPrayer: 'Brother Peter Adams',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 181,
      title: 'Jesus of Nazareth, Savior and King'
    },
    speakers: [
      {
        name: 'Sister Mary Johnson',
        topic: 'Faith in Jesus Christ',
        type: 'speaker'
      },
      {
        name: 'Brother Samuel Williams',
        topic: 'Serving Others',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 30,
      title: 'Come, Come, Ye Saints'
    },
    closingPrayer: 'Brother John Smith'
  },
  {
    id: 3,
    date: '2026-10-18',
    meetingType: 'regular',
    presiding: 'Bishop David Johnson',
    conducting: 'Brother Michael Brown',
    announcements: ['Missionary preparation class next Sunday.'],
    openingHymn: {
      number: 4,
      title: 'Truth Eternal'
    },
    openingPrayer: 'Brother David Clark',
    wardBusiness: [
      { description: 'Ward council update.' }
    ],
    stakeBusiness: true,
    sacramentHymn: {
      number: 193,
      title: 'I Stand All Amazed'
    },
    speakers: [
      {
        name: 'Sister Grace Thomas',
        topic: 'The Power of Prayer',
        type: 'speaker'
      },
      {
        name: 'Ward Choir',
        topic: 'Come unto Christ',
        type: 'musical-number'
      }
    ],
    closingHymn: {
      number: 27,
      title: 'Praise to the Man'
    },
    closingPrayer: 'Brother Joseph Green'
  },
  {
    id: 4,
    date: '2026-10-11',
    meetingType: 'stake',
    presiding: 'Stake President Robert Miller',
    conducting: 'Brother Michael Brown',
    announcements: [],
    openingHymn: {
      number: 5,
      title: 'High on the Mountain Top'
    },
    openingPrayer: 'Brother Peter Adams',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: {
      number: 190,
      title: 'In Memory of the Crucified'
    },
    speakers: [
      {
        name: 'Stake President Robert Miller',
        topic: 'Strengthening Families',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 20,
      title: 'God of Power, God of Right'
    },
    closingPrayer: 'Brother James Wilson'
  },
  {
    id: 5,
    date: '2026-10-04',
    meetingType: 'general',
    presiding: 'General Authority',
    conducting: 'Conference Session Director',
    announcements: ['General conference session.'],
    openingHymn: {
      number: 6,
      title: 'Redeemer of Israel'
    },
    openingPrayer: 'Conference Session Prayer',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: {
      number: 194,
      title: 'There Is a Green Hill Far Away'
    },
    speakers: [
      {
        name: 'Conference Speaker',
        topic: 'Following Jesus Christ',
        type: 'speaker'
      }
    ],
    closingHymn: {
      number: 21,
      title: 'Come, Listen to a Prophet’s Voice'
    },
    closingPrayer: 'Conference Session Prayer'
  }
];

export function getMeetings(date?: string): SacramentMeeting[] {
  if (!date) {
    return [...meetings];
  }

  return meetings.filter((meeting) => meeting.date === date);
}

export function getMeetingById(id: number): SacramentMeeting | undefined {
  return meetings.find((meeting) => meeting.id === id);
}
