// One-time migration of the old static data/tools.json catalog into the
// database. Safe to re-run: it upserts by slug, so editing this file and
// running `npm run db:seed` again won't create duplicates.
import { config } from "dotenv";
config({ path: ".env.local" });
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { eq } from "drizzle-orm";
import ws from "ws";
import * as schema from "./schema";
import legacy from "./legacy-tools.json";

neonConfig.webSocketConstructor = ws;

async function main() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Copy .env.example to .env.local and fill it in.");
  }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const db = drizzle(pool, { schema });

  for (const t of legacy.tools) {
    const images = t.image ? [`/${t.image}`] : [];

    const existing = await db.query.tools.findFirst({
      where: eq(schema.tools.slug, t.id),
    });

    if (existing) {
      await db
        .update(schema.tools)
        .set({
          name: t.name,
          description: t.blurb,
          model: t.includes ?? null,
          category: t.category,
          dayRate: String(t.dayRate),
          weekRate: String(t.weekRate),
          images,
          updatedAt: new Date(),
        })
        .where(eq(schema.tools.id, existing.id));
      console.log(`Updated: ${t.name}`);
    } else {
      await db.insert(schema.tools).values({
        slug: t.id,
        name: t.name,
        description: t.blurb,
        model: t.includes ?? null,
        category: t.category,
        dayRate: String(t.dayRate),
        weekRate: String(t.weekRate),
        images,
        active: true,
      });
      console.log(`Inserted: ${t.name}`);
    }
  }

  console.log(`\nDone. Seeded ${legacy.tools.length} tools.`);
  await pool.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
