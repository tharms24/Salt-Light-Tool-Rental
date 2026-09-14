import { and, eq, gte, lte } from "drizzle-orm";
import * as schema from "@/db/schema";

export interface DateRange {
  startDate: string; // ISO date, e.g. "2026-09-20"
  endDate: string;
}

/** Inclusive-range overlap check: do [aStart,aEnd] and [bStart,bEnd] share any day? */
export function rangesOverlap(a: DateRange, b: DateRange): boolean {
  return a.startDate <= b.endDate && b.startDate <= a.endDate;
}

/**
 * All unavailable date ranges for a tool: confirmed bookings + manual admin
 * blocks. Takes a `tx` (transaction or plain db) so it can be reused both for
 * read-only availability lookups and inside the locked transaction at
 * booking-confirmation time.
 */
export async function getUnavailableRanges(
  tx: typeof import("@/db").db,
  toolId: number
): Promise<DateRange[]> {
  const [bookings, blocks] = await Promise.all([
    tx.query.bookings.findMany({
      where: and(
        eq(schema.bookings.toolId, toolId),
        eq(schema.bookings.status, "confirmed")
      ),
      columns: { startDate: true, endDate: true },
    }),
    tx.query.toolBlocks.findMany({
      where: eq(schema.toolBlocks.toolId, toolId),
      columns: { startDate: true, endDate: true },
    }),
  ]);

  return [...bookings, ...blocks];
}

/** Fetch unavailable ranges that could possibly intersect a given window (for calendar rendering). */
export async function getUnavailableRangesInWindow(
  tx: typeof import("@/db").db,
  toolId: number,
  windowStart: string,
  windowEnd: string
): Promise<DateRange[]> {
  const [bookings, blocks] = await Promise.all([
    tx.query.bookings.findMany({
      where: and(
        eq(schema.bookings.toolId, toolId),
        eq(schema.bookings.status, "confirmed"),
        lte(schema.bookings.startDate, windowEnd),
        gte(schema.bookings.endDate, windowStart)
      ),
      columns: { startDate: true, endDate: true },
    }),
    tx.query.toolBlocks.findMany({
      where: and(
        eq(schema.toolBlocks.toolId, toolId),
        lte(schema.toolBlocks.startDate, windowEnd),
        gte(schema.toolBlocks.endDate, windowStart)
      ),
      columns: { startDate: true, endDate: true },
    }),
  ]);

  return [...bookings, ...blocks];
}

/** Expand a list of ranges into a Set of individual ISO date strings, clamped to a window. */
export function expandRangesToDates(
  ranges: DateRange[],
  windowStart: string,
  windowEnd: string
): Set<string> {
  const dates = new Set<string>();
  for (const range of ranges) {
    const start = range.startDate < windowStart ? windowStart : range.startDate;
    const end = range.endDate > windowEnd ? windowEnd : range.endDate;
    for (const d = new Date(start + "T00:00:00Z"); isoDate(d) <= end; d.setUTCDate(d.getUTCDate() + 1)) {
      dates.add(isoDate(d));
    }
  }
  return dates;
}

export function isoDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

export function isRangeAvailable(candidate: DateRange, unavailable: DateRange[]): boolean {
  return !unavailable.some((r) => rangesOverlap(candidate, r));
}
