import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { bookings, tools } from "@/db/schema";
import CancelBookingButton from "@/components/admin/CancelBookingButton";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const allBookings = await db
    .select({
      id: bookings.id,
      toolName: tools.name,
      startDate: bookings.startDate,
      endDate: bookings.endDate,
      customerName: bookings.customerName,
      customerEmail: bookings.customerEmail,
      customerPhone: bookings.customerPhone,
      fulfillment: bookings.fulfillment,
      deliveryAddress: bookings.deliveryAddress,
      totalPrice: bookings.totalPrice,
      status: bookings.status,
      createdAt: bookings.createdAt,
    })
    .from(bookings)
    .innerJoin(tools, eq(bookings.toolId, tools.id))
    .orderBy(desc(bookings.startDate));

  return (
    <>
      <div className="admin-page-head">
        <h1>Bookings</h1>
      </div>

      <div className="admin-card">
        {allBookings.length === 0 ? (
          <p className="empty-note">No bookings yet.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Tool</th>
                  <th>Dates</th>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Fulfillment</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {allBookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.toolName}</td>
                    <td>
                      {b.startDate} &rarr; {b.endDate}
                    </td>
                    <td>{b.customerName}</td>
                    <td>
                      <div>{b.customerPhone}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--gray)" }}>{b.customerEmail}</div>
                    </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {b.fulfillment}
                      {b.fulfillment === "delivery" && b.deliveryAddress && (
                        <div style={{ fontSize: "0.78rem", color: "var(--gray)" }}>{b.deliveryAddress}</div>
                      )}
                    </td>
                    <td>{b.totalPrice ? `$${b.totalPrice}` : "—"}</td>
                    <td>
                      <span className={`status-pill ${b.status}`}>{b.status}</span>
                    </td>
                    <td>{b.status === "confirmed" && <CancelBookingButton bookingId={b.id} />}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
