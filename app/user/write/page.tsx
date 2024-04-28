import { notFound } from "next/navigation";

import { auth } from "@/auth";
import { Write } from "@/components/blog/write";
import { SignInWithPathname } from "@/components/auth/signin";
import { BlogComponentProps, BlogLabels } from "@/components/blog/comp";
import { 
    getSingleBlogDraft,
    createSingleBlogDraft, 
    checkBlogExists 
} from "@/db/query/blog";



export default async function WritePage({ searchParams }: { searchParams: { blogID: string } }) {
    const session = await auth();

    if (!session?.user) {
        return (
            <SignInWithPathname />
        )
    }

    let data: BlogComponentProps[] = [];
    let blogID = '';
    const userID = session.user?.id;

    if (!userID) {
        throw new Error();
    }

    if (searchParams.blogID) {

        const res = await Promise.all(
            [
                getSingleBlogDraft({ blogID: searchParams.blogID, userID }),
                checkBlogExists({ blogID: searchParams.blogID, userID })
            ]
        )

        if (!res[1]) {
            return notFound();
        }

        blogID = searchParams.blogID;
        if(res[0]){
            data = res[0].map(i => (
                {
                    id: i.component.id,
                    blogId: i.blogID,
                    label: i.component.type as BlogLabels,
                    content: i.component.content,
                    position: i.component.position,
                    isEditable: true,
    
                } satisfies BlogComponentProps
            ))
        }
    } else {

        const res = await createSingleBlogDraft({ userID });
        blogID = res.blogID;
    }



    return (
        <div>
            <Write data={data} blogID={blogID} />
        </div>
    )
}