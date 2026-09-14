"use client";

import { useActionState } from "react";
import { createBlock, deleteBlock } from "@/lib/actions/blocks";
import type { ToolBlock } from "@/db/schema";

export default function BlockManager({ toolId, blocks }: { toolId: number; blocks: ToolBlock[] }) {
  const [state, formAction, pending] = useActionState(createBlock, undefined);

  return (
    <div className="admin-card">
      <h3>Blocked Dates</h3>
      <p style={{ fontSize: "0.85rem", color: "var(--gray)", marginTop: -8 }}>
        Block dates off for maintenance or repairs &mdash; customers won&apos;t be able to select
        these on the booking calendar.
      </p>

      {blocks.length > 0 && (
        <table className="admin-table" style={{ marginBottom: 20 }}>
          <thead>
            <tr>
              <th>Dates</th>
              <th>Reason</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((b) => (
              <tr key={b.id}>
                <td>
                  {b.startDate} &rarr; {b.endDate}
                </td>
                <td>{b.reason || "—"}</td>
                <td>
                  <form action={deleteBlock.bind(null, b.id, toolId)}>
                    <button className="btn btn-ghost btn-sm" type="submit">
                      Remove
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <form action={formAction} className="admin-form" style={{ maxWidth: "none" }}>
        <input type="hidden" name="toolId" value={toolId} />
        <div className="row">
          <div className="field">
            <label htmlFor="block-start">Start Date</label>
            <input id="block-start" name="startDate" type="date" required />
          </div>
          <div className="field">
            <label htmlFor="block-end">End Date</label>
            <input id="block-end" name="endDate" type="date" required />
          </div>
        </div>
        <div className="field">
          <label htmlFor="block-reason">Reason (optional)</label>
          <input id="block-reason" name="reason" type="text" placeholder="e.g. Maintenance" />
        </div>
        {state?.error && <div className="booking-error">{state.error}</div>}
        <div className="actions">
          <button className="btn btn-ghost" type="submit" disabled={pending}>
            {pending ? "Adding..." : "Block These Dates"}
          </button>
        </div>
      </form>
    </div>
  );
}
