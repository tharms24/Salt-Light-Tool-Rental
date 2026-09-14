import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { db } from "@/db";
import { tools } from "@/db/schema";
import { categoryLabel, categoryIcon } from "@/lib/categories";
import { Icon } from "@/lib/icons";
import BookingWidget from "@/components/BookingWidget";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getTool(slug: string) {
  const tool = await db.query.tools.findFirst({ where: eq(tools.slug, slug) });
  if (!tool || !tool.active) return null;
  return tool;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getTool(slug);
  if (!tool) return {};
  return {
    title: `${tool.name} | Salt & Light Tool Rental`,
    description: tool.description,
  };
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;
  const tool = await getTool(slug);
  if (!tool) notFound();

  const image = tool.images?.[0];

  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/tools" style={{ color: "inherit" }}>
              Tool Catalog
            </Link>{" "}
            / {categoryLabel(tool.category)}
          </div>
          <h1>{tool.name}</h1>
          {tool.model && <p>Model: {tool.model}</p>}
        </div>
      </section>

      <section className="section">
        <div className="container featured">
          <div className="featured-img">
            {image ? (
              <Image src={image} alt={tool.name} width={640} height={480} style={{ width: "100%", height: "auto" }} />
            ) : (
              <div
                style={{
                  aspectRatio: "4/3",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "var(--cream-alt)",
                  borderRadius: "var(--radius)",
                }}
              >
                <div className="icon" style={{ width: 96, height: 96, color: "var(--navy)" }}>
                  <Icon name={categoryIcon(tool.category)} />
                </div>
              </div>
            )}
          </div>
          <div className="featured-copy">
            <div className="eyebrow">{categoryLabel(tool.category)}</div>
            <p>{tool.description}</p>
            <div className="price-pill">
              ${Number(tool.dayRate).toFixed(0)} / Day &nbsp;&bull;&nbsp; <b>${Number(tool.weekRate).toFixed(0)} / Week</b>
            </div>
            <BookingWidget tool={{ id: tool.id, name: tool.name, slug: tool.slug, dayRate: tool.dayRate }} />
          </div>
        </div>
      </section>
    </>
  );
}
