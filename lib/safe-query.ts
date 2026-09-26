/**
 * Runs a DB query and falls back to a default value if it fails — e.g.
 * before DATABASE_URL is configured, or a transient connection hiccup.
 * Public pages use this so a database outage degrades gracefully instead
 * of crashing the whole page.
 */
export async function safeQuery<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch (err) {
    console.error("[safeQuery] Database query failed, using fallback:", err);
    return fallback;
  }
}
