import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const responses = pgTable("responses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  response: text().notNull(),
  timestamp: timestamp().notNull(),
  triggerWord: varchar().notNull(),
});
