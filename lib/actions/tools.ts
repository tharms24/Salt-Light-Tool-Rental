"use server";

import { z } from "zod";
import { eq, count } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { db } from "@/db";
import { tools, bookings } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";

const toolSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  slug: z
    .string()
    .trim()
    .min(1, "URL slug is required")
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().trim().max(2000).default(""),
  model: z.string().trim().max(200).optional(),
  category: z.string().trim().min(1, "Category is required"),
  dayRate: z.coerce.number().positive("Day rate must be greater than 0"),
  weekRate: z.coerce.number().positive("Week rate must be greater than 0"),
  active: z.coerce.boolean().default(true),
});

export type ToolFormState = { error?: string } | undefined;

async function uploadImageIfPresent(formData: FormData): Promise<string | null> {
  const file = formData.get("image");
  if (!(file instanceof File) || file.size === 0) return null;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error(
      "Image uploads aren't configured yet. Enable Vercel Blob storage for this project and add BLOB_READ_WRITE_TOKEN."
    );
  }

  const ext = file.name.split(".").pop() || "jpg";
  const key = `tools/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const blob = await put(key, file, { access: "public" });
  return blob.url;
}

export async function createTool(_prevState: ToolFormState, formData: FormData): Promise<ToolFormState> {
  await requireAdmin();

  const parsed = toolSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid tool details." };
  }
  const data = parsed.data;

  const existing = await db.query.tools.findFirst({ where: eq(tools.slug, data.slug) });
  if (existing) {
    return { error: `A tool with the URL slug "${data.slug}" already exists.` };
  }

  let imageUrl: string | null;
  try {
    imageUrl = await uploadImageIfPresent(formData);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Image upload failed." };
  }

  await db.insert(tools).values({
    name: data.name,
    slug: data.slug,
    description: data.description,
    model: data.model || null,
    category: data.category,
    dayRate: String(data.dayRate),
    weekRate: String(data.weekRate),
    images: imageUrl ? [imageUrl] : [],
    active: data.active,
  });

  revalidatePath("/tools");
  revalidatePath("/admin/tools");
  redirect("/admin/tools");
}

export async function updateTool(
  toolId: number,
  _prevState: ToolFormState,
  formData: FormData
): Promise<ToolFormState> {
  await requireAdmin();

  const parsed = toolSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid tool details." };
  }
  const data = parsed.data;

  const existing = await db.query.tools.findFirst({ where: eq(tools.slug, data.slug) });
  if (existing && existing.id !== toolId) {
    return { error: `A tool with the URL slug "${data.slug}" already exists.` };
  }
  if (!existing) {
    return { error: "Tool not found." };
  }

  let imageUrl: string | null;
  try {
    imageUrl = await uploadImageIfPresent(formData);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Image upload failed." };
  }

  await db
    .update(tools)
    .set({
      name: data.name,
      slug: data.slug,
      description: data.description,
      model: data.model || null,
      category: data.category,
      dayRate: String(data.dayRate),
      weekRate: String(data.weekRate),
      images: imageUrl ? [imageUrl] : existing.images,
      active: data.active,
      updatedAt: new Date(),
    })
    .where(eq(tools.id, toolId));

  revalidatePath("/tools");
  revalidatePath(`/tools/${data.slug}`);
  revalidatePath("/admin/tools");
  redirect("/admin/tools");
}

export async function toggleToolActive(toolId: number, active: boolean) {
  await requireAdmin();
  await db.update(tools).set({ active, updatedAt: new Date() }).where(eq(tools.id, toolId));
  revalidatePath("/tools");
  revalidatePath("/admin/tools");
}

export async function deleteTool(toolId: number): Promise<{ error?: string }> {
  await requireAdmin();

  const [{ value: bookingCount }] = await db
    .select({ value: count() })
    .from(bookings)
    .where(eq(bookings.toolId, toolId));

  if (bookingCount > 0) {
    return {
      error:
        "This tool has booking history and can't be deleted. Mark it inactive instead to hide it from the site.",
    };
  }

  await db.delete(tools).where(eq(tools.id, toolId));
  revalidatePath("/tools");
  revalidatePath("/admin/tools");
  return {};
}
