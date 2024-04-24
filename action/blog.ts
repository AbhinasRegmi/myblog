"use server";

import { updateBlogComponent, deleteBlogComponent } from "@/db/query/blog";
import { BlogComponentProps } from "@/components/blog/comp";

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