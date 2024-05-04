import { ShowBlogItem } from "@/components/blog/show-blog";
import { getAllPublishedBlog } from "@/db/query/blog";

export default async function RootPage() {
  const res = await getAllPublishedBlog({});

  return (
    <div className="bg-slate-50/10">
      <div className="space-y-4 max-w-screen-md mx-auto w-full">
        {
          res.map(i => (
            <ShowBlogItem key={i.blogID} {...i} />
          ))
        }
      </div>
    </div>
  )
}