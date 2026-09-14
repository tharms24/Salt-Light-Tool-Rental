"use server";

import { z } from "zod";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { toolBlocks } from "@/db/schema";
import { requireAdmin } from "@/lib/require-admin";

const blockSchema = z
  .object({
    toolId: z.coerce.number().int().positive(),
    startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    reason: z.string().trim().max(300).optional(),
  })
  .refine((v) => v.startDate <= v.endDate, {
    message: "End date must be on or after the start date",
    path: ["endDate"],
  });

export type BlockFormState = { error?: string } | undefined;

export async function createBlock(_prevState: BlockFormState, formData: FormData): Promise<BlockFormState> {
  await requireAdmin();

  const parsed = blockSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid dates." };
  }
  const data = parsed.data;

  await db.insert(toolBlocks).values({
    toolId: data.toolId,
    startDate: data.startDate,
    endDate: data.endDate,
    reason: data.reason || null,
  });

  revalidatePath(`/admin/tools/${data.toolId}`);
  revalidatePath("/tools");
}

export async function deleteBlock(blockId: number, toolId: number) {
  await requireAdmin();
  await db.delete(toolBlocks).where(eq(toolBlocks.id, blockId));
  revalidatePath(`/admin/tools/${toolId}`);
  revalidatePath("/tools");
}
