"use client";

import { useMemo, useState } from "react";
import { CATEGORIES } from "@/lib/categories";
import ToolCard from "@/components/ToolCard";
import type { Tool } from "@/db/schema";

export default function ToolsCatalog({ tools, initialCategory }: { tools: Tool[]; initialCategory: string }) {
  const [active, setActive] = useState<string>(
    CATEGORIES.some((c) => c.id === initialCategory) ? initialCategory : "all"
  );

  const filtered = useMemo(
    () => (active === "all" ? tools : tools.filter((t) => t.category === active)),
    [tools, active]
  );

  return (
    <>
      <div className="filters">
        <button
          className={`filter-btn${active === "all" ? " is-active" : ""}`}
          onClick={() => setActive("all")}
        >
          All Tools
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className={`filter-btn${active === c.id ? " is-active" : ""}`}
            onClick={() => setActive(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="tool-grid">
          {filtered.map((t) => (
            <ToolCard key={t.id} tool={t} />
          ))}
        </div>
      ) : (
        <div className="empty-state is-visible">
          <h3>No tools in this category yet</h3>
          <p>Message us &mdash; we may still be able to help, or can let you know when it&apos;s back in stock.</p>
          <a className="btn btn-navy" href="/contact">
            Contact Us
          </a>
        </div>
      )}
    </>
  );
}
