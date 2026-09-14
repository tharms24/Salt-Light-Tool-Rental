import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/lib/icons";
import { categoryLabel, categoryIcon } from "@/lib/categories";
import type { Tool } from "@/db/schema";

export default function ToolCard({ tool }: { tool: Tool }) {
  const image = tool.images?.[0];

  return (
    <article className="tool-card">
      <div className="tool-media">
        {image ? (
          <Image src={image} alt={tool.name} fill sizes="(max-width: 720px) 100vw, 33vw" style={{ objectFit: "cover" }} />
        ) : (
          <div className="icon">
            <Icon name={categoryIcon(tool.category)} />
          </div>
        )}
      </div>
      <div className="tool-body">
        <div className="tool-cat">{categoryLabel(tool.category)}</div>
        <h3>{tool.name}</h3>
        {tool.model && <div className="tool-model">Model: {tool.model}</div>}
        <p>{tool.description}</p>
        <div className="tool-rates">
          <div>
            <strong>${Number(tool.dayRate).toFixed(0)}</strong>
            <span>Per Day</span>
          </div>
          <div>
            <strong>${Number(tool.weekRate).toFixed(0)}</strong>
            <span>Per Week</span>
          </div>
        </div>
        <Link className="btn btn-navy btn-block" href={`/tools/${tool.slug}`}>
          View &amp; Reserve
        </Link>
      </div>
    </article>
  );
}
