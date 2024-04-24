import { auth } from "@/auth";
import { SignInWithPathname } from "@/components/auth/signin";
import {Write} from "@/components/blog/write";
import { getSingleBlogDraft, createSingleBlogDraft } from "@/db/query/blog";
import { notFound } from "next/navigation";



export default async function WritePage({searchParams}: {searchParams: {blogID: string}}){
    const session = await auth();

    if(!session?.user){
        return (
            <SignInWithPathname />
        )
    }

    let data = [];
    let blogID = '';
    const userID = session.user?.id;

    if(!userID){
        throw new Error();
    }

    if(searchParams.blogID){

        const res = await getSingleBlogDraft({blogID: searchParams.blogID, userID});

        if(!res){
            return notFound();
        }

        blogID = searchParams.blogID;
    }else{

        const res = await createSingleBlogDraft({userID});
        blogID = res.blogID;
    }


    
    return (
        <div>
            <Write data={[]} blogID={blogID} />
        </div>
    )
}