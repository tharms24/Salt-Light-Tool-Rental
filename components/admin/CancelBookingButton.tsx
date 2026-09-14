"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { cancelBooking } from "@/lib/actions/bookings";

export default function CancelBookingButton({ bookingId }: { bookingId: number }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleCancel() {
    if (!confirm("Cancel this booking? The dates will become available again.")) return;
    startTransition(async () => {
      await cancelBooking(bookingId);
      router.refresh();
    });
  }

  return (
    <button className="btn btn-ghost btn-sm" onClick={handleCancel} disabled={isPending}>
      Cancel
    </button>
  );
}
