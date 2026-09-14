"use client";

import { useActionState } from "react";
import { CATEGORIES } from "@/lib/categories";
import type { Tool } from "@/db/schema";
import type { ToolFormState } from "@/lib/actions/tools";

interface ToolFormProps {
  action: (state: ToolFormState, formData: FormData) => Promise<ToolFormState>;
  tool?: Tool;
  submitLabel: string;
}

export default function ToolForm({ action, tool, submitLabel }: ToolFormProps) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="admin-form" encType="multipart/form-data">
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" type="text" defaultValue={tool?.name} required />
      </div>

      <div className="field">
        <label htmlFor="slug">URL Slug</label>
        <input id="slug" name="slug" type="text" defaultValue={tool?.slug} required pattern="[a-z0-9-]+" />
        <div className="hint">Lowercase letters, numbers, and hyphens only &mdash; used in the tool&apos;s web address.</div>
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" defaultValue={tool?.category ?? CATEGORIES[0].id} required>
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="model">Model (optional)</label>
          <input id="model" name="model" type="text" defaultValue={tool?.model ?? ""} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" defaultValue={tool?.description} />
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="dayRate">Day Rate ($)</label>
          <input id="dayRate" name="dayRate" type="number" step="0.01" min="0" defaultValue={tool?.dayRate} required />
        </div>
        <div className="field">
          <label htmlFor="weekRate">Week Rate ($)</label>
          <input id="weekRate" name="weekRate" type="number" step="0.01" min="0" defaultValue={tool?.weekRate} required />
        </div>
      </div>

      <div className="field">
        <label htmlFor="image">Photo</label>
        {tool?.images?.[0] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={tool.images[0]} alt={tool.name} className="current-image" />
        )}
        <input id="image" name="image" type="file" accept="image/*" />
        <div className="hint">{tool ? "Leave blank to keep the current photo." : "Optional — you can add one later."}</div>
      </div>

      <div className="checkbox-row">
        <input id="active" name="active" type="checkbox" defaultChecked={tool ? tool.active : true} />
        <label htmlFor="active" style={{ marginBottom: 0 }}>
          Active (visible on the public site)
        </label>
      </div>

      {state?.error && <div className="booking-error">{state.error}</div>}

      <div className="actions">
        <button className="btn btn-navy" type="submit" disabled={pending}>
          {pending ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}
