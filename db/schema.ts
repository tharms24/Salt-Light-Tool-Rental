import {
  pgTable,
  serial,
  integer,
  text,
  numeric,
  boolean,
  date,
  timestamp,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const fulfillmentEnum = pgEnum("fulfillment", ["pickup", "delivery"]);
export const bookingStatusEnum = pgEnum("booking_status", [
  "confirmed",
  "cancelled",
]);

export const tools = pgTable("tools", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  model: text("model"),
  category: text("category").notNull().default("uncategorized"),
  dayRate: numeric("day_rate", { precision: 10, scale: 2 }).notNull(),
  weekRate: numeric("week_rate", { precision: 10, scale: 2 }).notNull(),
  // Array of image URLs (first one is the primary/card image).
  images: jsonb("images").$type<string[]>().notNull().default([]),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  toolId: integer("tool_id")
    .notNull()
    .references(() => tools.id, { onDelete: "cascade" }),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  fulfillment: fulfillmentEnum("fulfillment").notNull(),
  deliveryAddress: text("delivery_address"),
  totalPrice: numeric("total_price", { precision: 10, scale: 2 }),
  status: bookingStatusEnum("status").notNull().default("confirmed"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Manually blocked date ranges (maintenance, repairs, etc.) set from the admin page.
export const toolBlocks = pgTable("tool_blocks", {
  id: serial("id").primaryKey(),
  toolId: integer("tool_id")
    .notNull()
    .references(() => tools.id, { onDelete: "cascade" }),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  reason: text("reason"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Tool = typeof tools.$inferSelect;
export type NewTool = typeof tools.$inferInsert;
export type Booking = typeof bookings.$inferSelect;
export type NewBooking = typeof bookings.$inferInsert;
export type ToolBlock = typeof toolBlocks.$inferSelect;
export type NewToolBlock = typeof toolBlocks.$inferInsert;
