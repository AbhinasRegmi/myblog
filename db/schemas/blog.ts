import {
    pgTable,
    pgEnum,
    text,
    integer,
    uuid,
    timestamp,
    
} from "drizzle-orm/pg-core";

import {users} from "@/db/schemas/users";

export const STATUS = pgEnum("status", ["PUBLISHED", "DRAFT", "SUSPENDED"])

export const blog = pgTable("blog_myblog", {
    id: uuid("id").defaultRandom().primaryKey(),
    published_at: timestamp("published_at").defaultNow().$onUpdate(() => new Date()),
    status: STATUS("status").default("DRAFT"),
    user_id: text("user_id").notNull().references(
        () => users.id,
        {
            onDelete: "cascade"
        }
    )
});

export const component = pgTable("component_myblog", {
    id: text("id").primaryKey(),
    blog_id: uuid("blog_id").notNull().references(
        () => blog.id,
        {
            onDelete: "cascade"
        }
    ),
    type: text("type").notNull(),
    content: text("content").notNull(),
    position: integer("number").notNull()
});