import Link from "next/link";
import { logout } from "@/lib/actions/admin-auth";

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <div className="admin-bar">
        <div className="container">
          <strong>Salt &amp; Light Admin</strong>
          <nav className="admin-nav">
            <Link href="/admin">Dashboard</Link>
            <Link href="/admin/tools">Tools</Link>
            <Link href="/admin/bookings">Bookings</Link>
            <Link href="/tools" target="_blank">
              View Site &#8599;
            </Link>
          </nav>
          <form action={logout}>
            <button type="submit" className="btn btn-outline btn-sm" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
              Log Out
            </button>
          </form>
        </div>
      </div>
      <div className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
        {children}
      </div>
    </div>
  );
}
