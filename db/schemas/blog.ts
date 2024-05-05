import {
    pgTable,
    pgEnum,
    text,
    integer,
    uuid,
    timestamp,
    pgView,

} from "drizzle-orm/pg-core";

import { users } from "@/db/schemas/users";
import { sql } from "drizzle-orm";

export const STATUS = pgEnum("status", ["PUBLISHED", "DRAFT", "SUSPENDED"])

export const blog = pgTable("blog_myblog", {
    id: uuid("id").defaultRandom().primaryKey(),
    published_at: timestamp("published_at").defaultNow().notNull().$onUpdate(() => new Date()),
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

export const title = pgView("title_myblog", {
    title: text('title').notNull(),
    blogId: uuid("blog_id").notNull()
}).as(
    sql.raw(`
    create or replace
    view
    title_myblog
    as
    select c.content as title, blog_id
    from
    blog_myblog as b
    inner join
    component_myblog as c
    on b.id = c.blog_id
    where
    c.type = 'title' and
    c.number = 1 and
    b.status = 'PUBLISHED';
    `)
);

export const body = pgView("body_myblog", {
    body: text("body").notNull(),
    blogID: uuid("blog_id").notNull()
}).as(
    sql.raw(`
    create or replace
    view
    body_myblog
    as
    select c.content as body, blog_id
    from
    blog_myblog as b
    inner join
    component_myblog as c
    on b.id = c.blog_id
    where
    b.status = 'PUBLISHED' and
    c.id in (
      select cc.id 
      from component_myblog as cc 
      where cc.type = 'paragraph' and 
      cc.blog_id = b.id order by cc.number limit 1
    )
    `)
);

export const search = pgView("search_myblog", {
    title: text("title").notNull(),
    body: text("body").notNull(),
    blogID: uuid("blog_id").notNull()
}).as(
    sql.raw(`
    create or replace
    view
    search_myblog as
    select title, body, b.blog_id as id
    from
    title_myblog as t  
    inner join  
    body_myblog as b  
    on t.blog_id = b.blog_id
    `
    )
)
