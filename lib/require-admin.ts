import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE_NAME } from "@/lib/session";

/**
 * Defense-in-depth check inside every admin Server Action, in addition to
 * middleware.ts guarding the /admin pages themselves. Server Actions are
 * callable directly (not just via page navigation), so each one re-checks.
 */
export async function requireAdmin(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const valid = await verifySessionToken(token);
  if (!valid) {
    redirect("/admin/login");
  }
}
