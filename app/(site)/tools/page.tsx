import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import { db } from "@/db";
import { tools } from "@/db/schema";
import ToolsCatalog from "@/components/ToolsCatalog";

export const metadata: Metadata = {
  title: "Tool Catalog | Salt & Light Tool Rental",
  description:
    "Browse tools available for rent from Salt & Light Tool Rental in Orange County, CA.",
};

export const dynamic = "force-dynamic";

interface Props {
  searchParams: Promise<{ category?: string }>;
}

export default async function ToolsPage({ searchParams }: Props) {
  const { category } = await searchParams;

  const allTools = await db.query.tools.findMany({
    where: eq(tools.active, true),
    orderBy: (t, { asc }) => [asc(t.category), asc(t.name)],
  });

  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">Tool Catalog</div>
          <h1>Tools &amp; Equipment for Rent</h1>
          <p>Clean, well-maintained tools ready for your next project. Pick your dates right on each tool&apos;s page.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <ToolsCatalog tools={allTools} initialCategory={category ?? "all"} />
        </div>
      </section>
    </>
  );
}
