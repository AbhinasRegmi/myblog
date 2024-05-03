import { eq, and, isNull, not, exists } from "drizzle-orm";

import { db } from "@/db/connection";
import { blog, component } from "@/db/schemas/blog";
import { BlogComponentProps } from "@/components/blog/comp";

export async function searchBlogs({ search, page }: { search?: string, page?: number }) {
    //TODO: fetch actual data

    const fakeData = [
        {
            title: "This is amazing title", id: "first"
        },
        {
            title: "This is good", id: "second"
        },
        {
            title: "This is thinking good.", id: "third"
        },
        {
            title: "This is amazing title", id: "first"
        },
        {
            title: "This is good", id: "second"
        },
        {
            title: "This is thinking good.", id: "third"
        }, {
            title: "This is amazing title", id: "first"
        },
        {
            title: "This is good", id: "second"
        },
        {
            title: "This is thinking good.", id: "third"
        }, {
            title: "This is amazing title", id: "first"
        },
        {
            title: "This is good", id: "second"
        },
        {
            title: "This is thinking good.", id: "third"
        }, {
            title: "This is amazing title", id: "first"
        },
        {
            title: "This is good", id: "second"
        },
        {
            title: "This is thinking good.", id: "third"
        }, {
            title: "This is amazing title", id: "first"
        },
        {
            title: "This is good", id: "second"
        },
        {
            title: "This is thinking good.", id: "third"
        },
    ]

    return fakeData.splice(0, 6)
}

export async function getSingleBlogDraft({ blogID, userID }: { blogID: string, userID: string }) {
    try {

        const res = await db.select({
            blogID: blog.id,
            component
        }).from(blog).where(
            and(
                eq(blog.user_id, userID),
                eq(blog.id, blogID),
                eq(blog.status, "DRAFT")
            )
        ).innerJoin(component, eq(component.blog_id, blog.id))
            .orderBy(component.position);

        if (res.length) {
            return res
        }

        return null;
    } catch {
        return null;
    }
}

export async function checkBlogExists({ blogID, userID }: { blogID: string, userID: string }) {
    try {
        const res = await db.select({
            blogID: blog.id,
        }).from(blog).where(
            and(
                eq(blog.user_id, userID),
                eq(blog.id, blogID),
                eq(blog.status, "DRAFT")
            )
        );

        return true;

    } catch {
        return false;
    }
}

export async function createNewBlog({ userID }: { userID: string }) {
    await db.insert(blog).values({
        user_id: userID,
        status: 'DRAFT'
    })
}

export async function createSingleBlogDraft({ userID }: { userID: string }) {
    const res = await db.select({
        blogID: blog.id
    }).from(blog).leftJoin(component, eq(blog.id, component.blog_id)).where(and(isNull(component.blog_id), eq(blog.user_id, userID)));

    if (!res.length) {
        const res_ = await db.insert(blog).values({ user_id: userID }).returning({ id: blog.id });

        if (res_.length) {
            return (
                { blogID: res_[0].id }
            )
        }
    }

    return { blogID: res[0].blogID }
}

export async function updateBlogComponent({ block }: { block: BlogComponentProps }) {

    const res = await db.update(component).set({
        content: block.content,
        position: block.position
    }).where(
        and(eq(component.id, block.id), eq(component.blog_id, block.blogId))
    ).returning({ id: component.id });

    if (!res.length) {
        await db.insert(component).values({
            id: block.id,
            blog_id: block.blogId,
            content: block.content,
            type: block.label,
            position: block.position,
        });
    }

}

export async function deleteBlogComponent({ blogID, componentID }: { blogID: string, componentID: string }) {
    await db.delete(component)
        .where(
            and(
                eq(component.id, componentID),
                eq(component.blog_id, blogID)
            )
        );
}

export async function getAllDraftBlogs({ userID, page = 0, limit = 10, isPublished = false }: { userID: string, limit?: number, page?: number, isPublished?: boolean }) {
    const res = await db.select({
        id: blog.id,
        userID: blog.user_id,
        cover: blog.cover,
        title: component.content
    })
        .from(blog)
        .innerJoin(component, and(
            eq(blog.id, component.blog_id),
            eq(component.position, 1),
            eq(component.type, 'title')
        ))
        .where(and(
            eq(blog.user_id, userID),
            eq(blog.status, isPublished ? 'PUBLISHED' : 'DRAFT')
        ))
        .limit(limit)
        .offset(page);

    return res;
}

export async function publishDraftBlog({userID, blogID, publish = true}: {userID: string, blogID: string, publish?: boolean}){
    
    const sq = db.select()
    .from(component)
    .where(and(
        eq(component.blog_id, blogID),
        eq(component.position, 1),
        eq(component.type, 'title'),
        not(eq(component.content, '')),
    )).limit(1)

   
    const res = await db.update(blog)
    .set({
        status: publish ? 'PUBLISHED' : 'DRAFT'
    }).where(and(
        exists(sq),
        eq(blog.id, blogID),
        eq(blog.user_id, userID),
    )).returning({
        id: blog.id
    })

    if(!res.length){
        throw new Error('No response.')
    }
}

export async function deleteDraftBlog({userID, blogID}: {userID: string, blogID: string}){
    await db.delete(blog)
    .where(and(
        eq(blog.id, blogID),
        eq(blog.user_id, userID),
        eq(blog.status, 'DRAFT')
    ))
}