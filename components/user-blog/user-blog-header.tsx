import Link from "next/link";

import {Button} from "@/components/ui/button";
import { NEW_BLOG_ROUTE } from "@/routes";

export function UserBlogHeader(){
    return (
        <div className="flex items-center justify-between py-4">
            <h1
                className="
                    text-3xl font-bold md:tracking-wider
                "
            >Your Blogs</h1>
            <Button
                variant={"outline"}
                className="rounded-full hover:bg-green-300 hover:text-accent-foreground/85"
                asChild
            >
                <Link href={NEW_BLOG_ROUTE}>Write a blog</Link>
            </Button>
        </div>
    )
}