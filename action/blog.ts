"use server";

import { revalidatePath } from "next/cache";

import { updateBlogComponent, deleteBlogComponent, publishDraftBlog, deleteDraftBlog } from "@/db/query/blog";
import { BlogComponentProps } from "@/components/blog/comp";
import { PROFILE_ROUTE } from "@/routes";
import { auth } from "@/auth";

/** This function is not secure. Use only if user identity is verified. */
export async function updateBlogComponentAction(blog: BlogComponentProps){

    try{
        await updateBlogComponent({block: blog})

        return {success: "Component created successfully."}
    }catch(e){
        return {error: 'Something went wrong.'}
    }
}

/** This function is not secure. Use only if user identity is verified. */
export async function deleteBlogComponentAction({blogID, componentID}: {blogID: string, componentID: string}){
    try{

        await deleteBlogComponent({blogID, componentID});

        return {success: "Component deleted successfully."}
    }catch(e){
        return {error: "Something went wrong."}
    }
}

/** This function is not secure. Use only if user identity is verified. */
export async function publishBlogAction(props: {blogID: string, userID: string, publish?: boolean}){
    try{
        await publishDraftBlog({...props});
        revalidatePath(PROFILE_ROUTE);

    }catch(e){

        if(e instanceof Error){
            return {error: e.message}
        }

        throw e
    }
}

export async function deleteSingleBlogAction(props: {blogID: string}){
    const session = await auth();

    const userID = session?.user?.id;

    if(!userID){
        return {
            error: "Something went wrong."
        }
    }

    try{
        await deleteDraftBlog({userID, ...props})
        revalidatePath(PROFILE_ROUTE)
    }catch{
        return {
            error: "Something went wrong."
        }
    }


}