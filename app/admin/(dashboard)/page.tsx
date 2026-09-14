import Link from "next/link";
import { and, asc, eq, gte, count } from "drizzle-orm";
import { db } from "@/db";
import { bookings, tools } from "@/db/schema";
import { isoDate } from "@/lib/availability";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const today = isoDate(new Date());

  const [upcoming, toolCounts, bookingCounts] = await Promise.all([
    db
      .select({
        id: bookings.id,
        toolName: tools.name,
        startDate: bookings.startDate,
        endDate: bookings.endDate,
        customerName: bookings.customerName,
        customerPhone: bookings.customerPhone,
        fulfillment: bookings.fulfillment,
      })
      .from(bookings)
      .innerJoin(tools, eq(bookings.toolId, tools.id))
      .where(and(eq(bookings.status, "confirmed"), gte(bookings.endDate, today)))
      .orderBy(asc(bookings.startDate))
      .limit(10),
    db.select({ value: count() }).from(tools).where(eq(tools.active, true)),
    db.select({ value: count() }).from(bookings).where(eq(bookings.status, "confirmed")),
  ]);

  return (
    <>
      <div className="admin-page-head">
        <h1>Dashboard</h1>
      </div>

      <div className="row" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 8 }}>
        <div className="admin-card">
          <div className="eyebrow">Active Tools</div>
          <h2 style={{ marginBottom: 0 }}>{toolCounts[0]?.value ?? 0}</h2>
        </div>
        <div className="admin-card">
          <div className="eyebrow">Confirmed Bookings (all time)</div>
          <h2 style={{ marginBottom: 0 }}>{bookingCounts[0]?.value ?? 0}</h2>
        </div>
      </div>

      <div className="admin-card">
        <h3>Upcoming &amp; Active Bookings</h3>
        {upcoming.length === 0 ? (
          <p className="empty-note">No upcoming bookings.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Dates</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Fulfillment</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((b) => (
                  <tr key={b.id}>
                    <td>{b.toolName}</td>
                    <td>
                      {b.startDate} &rarr; {b.endDate}
                    </td>
                    <td>{b.customerName}</td>
                    <td>{b.customerPhone}</td>
                    <td style={{ textTransform: "capitalize" }}>{b.fulfillment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div style={{ marginTop: 16 }}>
          <Link className="btn btn-ghost btn-sm" href="/admin/bookings">
            View All Bookings
          </Link>
        </div>
      </div>
    </>
  );
}
