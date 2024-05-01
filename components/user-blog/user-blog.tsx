import { UserBlogHeader } from "./user-blog-header";
import { UserBlogTabs } from "./user-blog-tabs";

export function UserBlog() {
    return (
        <div className="px-4">
            <div className="py-2">
                <UserBlogHeader />
            </div>
            <div>
                <UserBlogTabs />
            </div>
        </div>
    )
}