import { eq, asc } from "drizzle-orm";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { tools, toolBlocks } from "@/db/schema";
import { updateTool } from "@/lib/actions/tools";
import ToolForm from "@/components/admin/ToolForm";
import BlockManager from "@/components/admin/BlockManager";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditToolPage({ params }: Props) {
  const { id } = await params;
  const toolId = Number(id);
  if (!Number.isInteger(toolId)) notFound();

  const [tool, blocks] = await Promise.all([
    db.query.tools.findFirst({ where: eq(tools.id, toolId) }),
    db.query.toolBlocks.findMany({
      where: eq(toolBlocks.toolId, toolId),
      orderBy: [asc(toolBlocks.startDate)],
    }),
  ]);

  if (!tool) notFound();

  return (
    <>
      <div className="admin-page-head">
        <h1>Edit Tool</h1>
      </div>
      <div className="admin-card">
        <ToolForm action={updateTool.bind(null, tool.id)} tool={tool} submitLabel="Save Changes" />
      </div>

      <BlockManager toolId={tool.id} blocks={blocks} />
    </>
  );
}
