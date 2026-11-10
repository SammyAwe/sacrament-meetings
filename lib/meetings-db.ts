
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
