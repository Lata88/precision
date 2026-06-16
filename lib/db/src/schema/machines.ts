import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const machinesTable = pgTable("machines", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  specifications: text("specifications").notNull(),
  imageUrl: text("image_url"),
  category: text("category").notNull(),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertMachineSchema = createInsertSchema(machinesTable).omit({ id: true, createdAt: true });
export type InsertMachine = z.infer<typeof insertMachineSchema>;
export type Machine = typeof machinesTable.$inferSelect;
