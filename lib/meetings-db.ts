
import sql from './db';
import type { SacramentMeeting } from './types';

interface MeetingFilters {
  date?: string;
  query?: string;
  page?: number;
  limit?: number;
}

interface MeetingsResult {
  meetings: SacramentMeeting[];
  totalCount: number;
  totalPages: number;
}

export async function getMeetings({
  date,
  query,
  page = 1,
  limit = 100,
}: MeetingFilters = {}): Promise<MeetingsResult> {
  const searchTerm = query?.trim() || null;
  const meetingDate = date || null;
  const currentPage = Math.max(1, page);
  const pageSize = Math.max(1, limit);
  const offset = (currentPage - 1) * pageSize;

  const countResult = await sql`
    SELECT COUNT(*) AS total
    FROM meetings
    WHERE
      (${meetingDate}::date IS NULL OR date = ${meetingDate}::date)
      AND (
        ${searchTerm}::text IS NULL
        OR meeting_type ILIKE '%' || ${searchTerm} || '%'
        OR presiding ILIKE '%' || ${searchTerm} || '%'
        OR conducting ILIKE '%' || ${searchTerm} || '%'
        OR EXISTS (
          SELECT 1
          FROM jsonb_array_elements(speakers) AS speaker
          WHERE
            speaker->>'name' ILIKE '%' || ${searchTerm} || '%'
            OR speaker->>'topic' ILIKE '%' || ${searchTerm} || '%'
        )
      )
  `;

  const totalCount = Number(countResult[0]?.total ?? 0);

  const rows = await sql`
    SELECT
      id,
      date::text AS date,
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE
      (${meetingDate}::date IS NULL OR date = ${meetingDate}::date)
      AND (
        ${searchTerm}::text IS NULL
        OR meeting_type ILIKE '%' || ${searchTerm} || '%'
        OR presiding ILIKE '%' || ${searchTerm} || '%'
        OR conducting ILIKE '%' || ${searchTerm} || '%'
        OR EXISTS (
          SELECT 1
          FROM jsonb_array_elements(speakers) AS speaker
          WHERE
            speaker->>'name' ILIKE '%' || ${searchTerm} || '%'
            OR speaker->>'topic' ILIKE '%' || ${searchTerm} || '%'
        )
      )
    ORDER BY date DESC
    LIMIT ${pageSize}
    OFFSET ${offset}
  `;

  return {
    meetings: rows as unknown as SacramentMeeting[],
    totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  };
}

export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | undefined> {
  const rows = await sql`
    SELECT
      id,
      date::text AS date,
      meeting_type AS "meetingType",
      presiding,
      conducting,
      announcements,
      opening_hymn AS "openingHymn",
      opening_prayer AS "openingPrayer",
      ward_business AS "wardBusiness",
      stake_business AS "stakeBusiness",
      sacrament_hymn AS "sacramentHymn",
      speakers,
      closing_hymn AS "closingHymn",
      closing_prayer AS "closingPrayer"
    FROM meetings
    WHERE id = ${id}
    LIMIT 1
  `;

  return rows.length > 0
    ? (rows[0] as unknown as SacramentMeeting)
    : undefined;
}

type MeetingInput = Omit<SacramentMeeting, 'id'>;

export async function createMeeting(meeting: MeetingInput) {
  const result = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    )
    VALUES (
      ${meeting.date}::date,
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ${meeting.announcements ?? []},
      ${JSON.stringify(meeting.openingHymn)}::jsonb,
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      ${JSON.stringify(meeting.speakers)}::jsonb,
      ${JSON.stringify(meeting.closingHymn)}::jsonb,
      ${meeting.closingPrayer}
    )
    RETURNING id
  `;

  return result[0];
}

export async function updateMeeting(
  id: number,
  meeting: MeetingInput
) {
  await sql`
    UPDATE meetings
    SET
      date = ${meeting.date}::date,
      meeting_type = ${meeting.meetingType},
      presiding = ${meeting.presiding},
      conducting = ${meeting.conducting},
      announcements = ${meeting.announcements ?? []},
      opening_hymn = ${JSON.stringify(meeting.openingHymn)}::jsonb,
      opening_prayer = ${meeting.openingPrayer},
      ward_business = ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      stake_business = ${meeting.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(meeting.speakers)}::jsonb,
      closing_hymn = ${JSON.stringify(meeting.closingHymn)}::jsonb,
      closing_prayer = ${meeting.closingPrayer}
    WHERE id = ${id}
  `;
}

export async function deleteMeeting(id: number) {
  await sql`
    DELETE FROM meetings
    WHERE id = ${id}
  `;
}