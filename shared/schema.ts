import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  type: text("type").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isPrivate: boolean("is_private").default(false).notNull(),
  authorKey: text("author_key"), // 작성자 식별을 위한 키
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const replies = pgTable("replies", {
  id: serial("id").primaryKey(),
  inquiryId: integer("inquiry_id").notNull().references(() => inquiries.id),
  adminName: text("admin_name").notNull().default("관리자"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const visitors = pgTable("visitors", {
  id: serial("id").primaryKey(),
  ip: text("ip").notNull(),
  userAgent: text("user_agent"),
  page: text("page").notNull(),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});

export const inquiriesRelations = relations(inquiries, ({ many }) => ({
  replies: many(replies),
}));

export const repliesRelations = relations(replies, ({ one }) => ({
  inquiry: one(inquiries, {
    fields: [replies.inquiryId],
    references: [inquiries.id],
  }),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

export const insertReplySchema = createInsertSchema(replies).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertReply = z.infer<typeof insertReplySchema>;
export type Reply = typeof replies.$inferSelect;
export type Visitor = typeof visitors.$inferSelect;
