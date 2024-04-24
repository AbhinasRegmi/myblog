"use server";

import {auth} from "@/auth";
import { createNewBlog } from "@/db/query/blog";

export async function createNewBlogAction({blogID}: {blogID: string}){
    const session = await auth();

    if(!session?.user?.id){
        return {error: "User should be logged in."}
    }

    try{
        await createNewBlog({
            userID: session.user.id
        })

        return {success: "New Blog created."}
    }catch{
        return {error: "Something went wrong."}
    }
}