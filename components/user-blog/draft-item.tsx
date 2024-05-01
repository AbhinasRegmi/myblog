"use client";

import {
    Pen,
    Rocket,
    Trash
} from 'lucide-react';
import { useTransition } from 'react';

import { ThreeDots, ThreeDotsPros } from "@/components/ui/three-dots";
import { NEW_BLOG_ROUTE } from "@/routes";
import { cn } from '@/lib/utils';

interface BlogDraftItemProps {
    title: string;
    userID: string;
    blogID: string;
}
export function BlogDraftItem(props: BlogDraftItemProps) {
    const [isPending, startTransition] = useTransition();

    function publishHandler(){
        startTransition(async () => {
            alert('hi')
        })
    }

    const data = {
        label: 'Actions',
        content: [
            {
                href: `${NEW_BLOG_ROUTE}?blogID=${props.blogID}`,
                label: 'Continue editing',
                icon: Pen
            },
            {
                label: 'Publish blog',
                icon: Rocket,
                handler: publishHandler
            },
            {
                label: 'Delete blog',
                destructive: true,
                icon: Trash,
                handler: () => { }
            }

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
                        text-sm text-background bg-orange-500 px-2 rounded-full
                        flex items-center
                    "
                >draft</span>
                <h2
                    className="
                        font-medium tracking-wide line-clamp-1
                    "
                >{props.title ?? 'Untitled blog'}</h2>
            </div>

            <div>
                <ThreeDots {...data} />
            </div>
        </div>
    )
}