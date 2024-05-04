import Link from "next/link";
import Image from "next/image";

import LOGO from "@/public/images/logo.svg"
import { READ_BLOG_ROUTE } from "@/routes";
import { Button } from "@/components/ui/button";
import { BlogThumbnailImage } from "@/components/blog/image";
import { Separator } from "@/components/ui/separator";

interface ShowBlogItemProps {
    title: string;
    blogID: string;
    published_at: Date;
    author: string;
    profile: string | null;
    cover: string | null;
}
export function ShowBlogItem(props: ShowBlogItemProps) {
    return (
        <div className="w-full md:max-w-screen-sm my-1 shadow-sm bg-card">
            <Button
                variant={'ghost'}
                className="w-full py-8 h-auto"
                asChild
            >
                <Link href={READ_BLOG_ROUTE + props.blogID} className="flex-col space-y-2">
                    <ShowBlogItemHeader {...props} />
                    <div className="px-2 w-full">
                        <Separator />
                    </div>
                    <div className="px-4 w-full py-1">
                        <ShowBlogItemBody {...props} />
                    </div>
                </Link>
            </Button>
        </div>

    )
}

function ShowBlogItemHeader(props: ShowBlogItemProps) {
    return (
        <div className="flex items-center justify-end gap-3 w-full px-2">
            <div className="flex items-center justify-center gap-2">
                <h2 className="tracking-wide">{props.author}</h2>
                <span className="text-muted-foreground">.</span>
                <span className="text-muted-foreground">{props.published_at.toDateString()}</span>
            </div>
        </div>
    )
}

function ShowBlogItemBody(props: ShowBlogItemProps) {
    return (
        <div className="flex w-full gap-4 max-w-screen-sm overflow-hidden">
            <div className="w-[80px] md:w-[120px] aspect-square overflow-hidden object-cover bg-black/55 rounded-md shrink-0">
                {
                    !!props.cover && <BlogThumbnailImage publicUrl={props.cover} />
                }
                {
                    !!!props.cover && (
                        <Image
                            width={100}
                            height={100}
                            src={LOGO}
                            alt="Blog Image"
                            className="w-full h-full object-fill bg-white shadow-sm"
                        />
                    )
                }
            </div>
            <div className="flex-col items-start justify-start">
                <h2 className="text-2xl text-wrap line-clamp-3">{props.title}</h2>
                <span className="text-muted-foreground">Read more...</span>
            </div>
        </div>
    )
}
