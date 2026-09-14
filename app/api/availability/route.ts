import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { getUnavailableRangesInWindow, expandRangesToDates } from "@/lib/availability";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const toolId = Number(searchParams.get("toolId"));
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!Number.isInteger(toolId) || toolId <= 0 || !start || !end) {
    return NextResponse.json(
      { error: "toolId, start, and end are required." },
      { status: 400 }
    );
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end)) {
    return NextResponse.json({ error: "start/end must be YYYY-MM-DD." }, { status: 400 });
  }

  const ranges = await getUnavailableRangesInWindow(db, toolId, start, end);
  const unavailableDates = Array.from(expandRangesToDates(ranges, start, end)).sort();

  return NextResponse.json({ unavailableDates });
}
