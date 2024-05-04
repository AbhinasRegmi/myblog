"use client";

import {
    Ban,
    Eye,
} from 'lucide-react';
import { toast } from 'sonner';
import { useTransition } from 'react';

import { ThreeDots, ThreeDotsPros } from "@/components/ui/three-dots";
import { publishBlogAction } from '@/action/blog';
import { BlogDraftItemProps } from '@/components/user-blog/draft-item';
import { cn } from '@/lib/utils';
import { READ_BLOG_ROUTE } from '@/routes';


export function BlogPublishedItem(props: BlogDraftItemProps) {
    const [isPending, startTransition] = useTransition();

    function unpublishHandler(){
        startTransition(async () => {
            const res = await publishBlogAction({
                blogID: props.blogID,
                publish: false,
            })

            if(res?.error){
                toast("Blog cannot be unpublished.", {
                    description: 'Something went wrong.',
                    cancel: true,
                    dismissible: true,
                })
            }
        })
    }

    const data = {
        label: 'Actions',
        content: [
            {
                label: 'View live page',
                icon: Eye,
                href: READ_BLOG_ROUTE + props.blogID
            },
            {
                label: 'Unpublish blog',
                icon: Ban,
                destructive: true,
                handler: unpublishHandler
            },
        ]

    } satisfies ThreeDotsPros;
    return (
        <div className={
            cn(
                "w-full rounded-md border py-4 px-2",
                "hover:bg-border/10 cursor-pointer",
                "flex items-center justify-between",
                isPending && "cursor-not-allowed opacity-30"
            )}
        >
            <div className="flex gap-3">
                <span
                    className="
                        text-sm text-background bg-emerald-500 px-2 rounded-full
                        flex items-center tracking-wide
                    "
                >live</span>
                <h2
                    className="
                        font-medium tracking-wide line-clamp-1
                    "
                >{props.title}</h2>
            </div>

            <div>
                <ThreeDots {...data} />
            </div>
        </div>
    )
}