import { createTool } from "@/lib/actions/tools";
import ToolForm from "@/components/admin/ToolForm";

export default function NewToolPage() {
  return (
    <>
      <div className="admin-page-head">
        <h1>Add Tool</h1>
      </div>
      <div className="admin-card">
        <ToolForm action={createTool} submitLabel="Create Tool" />
      </div>
    </>
  );
}
