import {eq, and, isNull} from "drizzle-orm";

import {db} from "@/db/connection";
import {blog, component} from "@/db/schemas/blog";

export async function searchBlogs({search, page}: {search?: string, page?: number}){
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

export async function getSingleBlogDraft({blogID, userID}: {blogID: string, userID: string}){
    const res = await db.select().from(blog).where(
        and(
            eq(blog.user_id, userID), 
            eq(blog.id, blogID), 
            eq(blog.status, "DRAFT")
        )
    );

    if(res.length){
        return res[0];
    }

    return null;
}

export async function createNewBlog({userID}: {userID: string}){
    await db.insert(blog).values({
        user_id: userID,
        status: 'DRAFT'
    })
}

export async function createSingleBlogDraft({userID}: {userID: string}){
    const res = await db.select({
        blogID: blog.id
    }).from(blog).leftJoin(component, eq(blog.id, component.blog_id)).where(and(isNull(component.blog_id), eq(blog.user_id, userID)));

    if(!res.length){
        const res_ = await db.insert(blog).values({user_id: userID}).returning({id: blog.id});

        if(res_.length){
            return (
                {blogID: res_[0].id}
            )
        }
    }

    return {blogID: res[0].blogID}
}