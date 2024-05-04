"use server";

import { revalidatePath } from "next/cache";

import { updateBlogComponent, deleteBlogComponent, publishDraftBlog, deleteDraftBlog } from "@/db/query/blog";
import { BlogComponentProps } from "@/components/blog/comp";
import { PROFILE_ROUTE } from "@/routes";
import { auth } from "@/auth";

export async function updateBlogComponentAction(blog: BlogComponentProps){

    try{
        const userID = await getUserID();
        await updateBlogComponent({block: blog, userID})

        return {success: "Component created successfully."}
    }catch(e){
        return {error: 'Something went wrong.'}
    }
}

export async function deleteBlogComponentAction({blogID, componentID}: {blogID: string, componentID: string}){
    try{
        const userID = await getUserID();
        await deleteBlogComponent({blogID, componentID, userID});

        return {success: "Component deleted successfully."}
    }catch(e){
        return {error: "Something went wrong."}
    }
}

export async function publishBlogAction(props: {blogID: string, publish?: boolean}){
    try{
        const userID = await getUserID();
        await publishDraftBlog({...props, userID});
        revalidatePath(PROFILE_ROUTE);

    }catch(e){

        if(e instanceof Error){
            return {error: e.message}
        }

        throw e
    }
}

export async function deleteSingleBlogAction(props: {blogID: string}){
    try{

        const userID = await getUserID();
        await deleteDraftBlog({userID, ...props})
        revalidatePath(PROFILE_ROUTE)
    }catch{
        return {
            error: "Something went wrong."
        }
    }


}

async function getUserID(){
    const session = await auth();

    const userID = session?.user?.id;

    if(!userID){
        throw new Error();
    }

    return userID
}