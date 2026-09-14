"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toggleToolActive, deleteTool } from "@/lib/actions/tools";

export default function ToolRowActions({ toolId, active }: { toolId: number; active: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function handleToggle() {
    startTransition(async () => {
      await toggleToolActive(toolId, !active);
      router.refresh();
    });
  }

  function handleDelete() {
    if (!confirm("Delete this tool permanently? This can't be undone.")) return;
    startTransition(async () => {
      const result = await deleteTool(toolId);
      if (result.error) {
        setError(result.error);
      } else {
        router.refresh();
      }
    });
  }

  return (
    <div>
      <div className="row-actions">
        <button className="btn btn-ghost btn-sm" onClick={handleToggle} disabled={isPending}>
          {active ? "Deactivate" : "Activate"}
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handleDelete} disabled={isPending}>
          Delete
        </button>
      </div>
      {error && (
        <div className="booking-error" style={{ marginTop: 8, marginBottom: 0 }}>
          {error}
        </div>
      )}
    </div>
  );
}
