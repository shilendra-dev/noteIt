// src/db/schema.ts
import { pgTable, uuid, varchar, timestamp, boolean, serial, pgEnum } from "drizzle-orm/pg-core";

// OTP type enum
export const otpTypeEnum = pgEnum("otp_type", ["signup", "signin"]);

// Users table
export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 50 }),
  dob: timestamp("dob", { mode: "date" }),
  profilePicture: varchar("profile_picture", { length: 255 }),
  isRegistered: boolean("is_registered").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// OTP Codes table
export const otpCodes = pgTable("otp_codes", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull(),
  otpHash: varchar("otp_hash", { length: 255 }).notNull(),
  type: otpTypeEnum("type").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  consumed: boolean("consumed").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Refresh Tokens table
export const refreshTokens = pgTable("refresh_tokens", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: varchar("token_hash", { length: 255 }).notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
