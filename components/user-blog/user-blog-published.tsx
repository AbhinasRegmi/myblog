import {notFound} from "next/navigation";

import {auth} from "@/auth";
import { getAllDraftBlogs } from "@/db/query/blog";
import { BlogPublishedItem } from "@/components/user-blog/published-item";

export async function UserBlogPublished(){

    //TODO: FIX the title will not updated since this page will not reload and older drafts
    // will be seen.
    const session = await auth();
    if(!session?.user) return notFound();

    const res = await getAllDraftBlogs({userID: session.user.id ?? '', isPublished: true});

    if(!res.length){
        return (
            <div className="pt-4">You have no blogs published.</div>
        )
    }

    return (
        <div
            className="
                space-y-2 py-4 md:pr-28
            "
        >
            {
                res.map(i => (
                    <BlogPublishedItem key={i.id} title={i.title} blogID={i.id} userID={i.userID} />
                ))
            }
        </div>
    )
}