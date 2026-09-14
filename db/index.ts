import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "./schema";

// Enables real interactive transactions (BEGIN / SELECT ... FOR UPDATE / COMMIT)
// over a pooled WebSocket connection, which the lighter neon-http driver can't
// do. That matters here: booking creation locks a tool's row for the duration
// of the availability check + insert so two customers can't double-book the
// same dates at once.
if (typeof WebSocket === "undefined") {
  neonConfig.webSocketConstructor = ws;
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is not set. Add it in your Vercel project's Environment Variables (or .env.local for local dev)."
  );
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(pool, { schema });
