import Link from "next/link";
import Image from "next/image";
import { asc } from "drizzle-orm";
import { db } from "@/db";
import { categoryLabel } from "@/lib/categories";
import ToolRowActions from "@/components/admin/ToolRowActions";

export const dynamic = "force-dynamic";

export default async function AdminToolsPage() {
  const allTools = await db.query.tools.findMany({
    orderBy: (t) => [asc(t.name)],
  });

  return (
    <>
      <div className="admin-page-head">
        <h1>Tools</h1>
        <Link className="btn btn-gold" href="/admin/tools/new">
          + Add Tool
        </Link>
      </div>

      <div className="admin-card">
        {allTools.length === 0 ? (
          <p className="empty-note">No tools yet. Add your first one.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="admin-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Day / Week</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allTools.map((t) => (
                  <tr key={t.id}>
                    <td>
                      {t.images?.[0] ? (
                        <Image src={t.images[0]} alt={t.name} width={44} height={44} className="thumb" />
                      ) : (
                        <div className="thumb" style={{ background: "var(--cream-alt)" }} />
                      )}
                    </td>
                    <td>
                      <Link href={`/admin/tools/${t.id}`}>{t.name}</Link>
                      {t.model && <div style={{ fontSize: "0.78rem", color: "var(--gray)" }}>{t.model}</div>}
                    </td>
                    <td>{categoryLabel(t.category)}</td>
                    <td>
                      ${Number(t.dayRate).toFixed(0)} / ${Number(t.weekRate).toFixed(0)}
                    </td>
                    <td>
                      <span className={`status-pill ${t.active ? "active" : "inactive"}`}>
                        {t.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <ToolRowActions toolId={t.id} active={t.active} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
