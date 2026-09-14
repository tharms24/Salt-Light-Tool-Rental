"use client";

import { useActionState } from "react";
import Image from "next/image";
import { login } from "@/lib/actions/admin-auth";

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, undefined);

  return (
    <div className="admin-login-shell">
      <div className="admin-login-card">
        <Image src="/assets/img/logo-nav.png" alt="Salt & Light" width={56} height={56} />
        <h1>Admin Sign In</h1>
        <p className="sub">Salt &amp; Light Tool Rental</p>
        <form action={formAction} className="admin-form">
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required autoFocus />
          </div>
          {state?.error && <div className="booking-error">{state.error}</div>}
          <button className="btn btn-navy btn-block" type="submit" disabled={pending}>
            {pending ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
