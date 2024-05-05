import { BlogComponentProps, BlogLabels } from "@/components/blog/comp";
import { ReadBoard } from "@/components/blog/read-board";
import { getSinglePublishedBlog } from "@/db/query/blog"
import { notFound } from "next/navigation";

export default async function ReadPage({params}: {
    params: {
        id: string
    }
}){

    const data = await getSinglePublishedBlog({blogID: params.id});

    if(!data){
        return notFound();
    }

    const components = data.map(i => (
        {
            id: i.component.id,
            blogId: i.blogID,
            label: i.component.type as BlogLabels,
            content: i.component.content,
            position: i.component.position,
            isEditable: false,

        } satisfies BlogComponentProps
    ))

    return (
        <div>
            <ReadBoard data={components} />
        </div>
    )
}