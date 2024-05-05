"use client";

import Link from "next/link";

import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchForm } from "@/components/search";
import { Separator } from "@/components/ui/separator";
import { READ_BLOG_ROUTE } from "@/routes";

interface FindProps {
    data: {
        title: string;
        id: string;
    }[]
}
export function Find(props: FindProps) {
    
    return (
        <div className="container p-6 space-y-4">
            <SearchForm className="w-full md:hidden sticky top-0 right-0 left-0" />
            <ScrollArea className="w-full">
                <div className="p-4 md:max-w-lg md:mx-auto">
                    {
                        !props.data.length &&
                        <div className="text-muted-foreground text-xl text-center">
                            Nothing to show...
                        </div>
                    }
                    {props.data.map((i, num) => (
                        <>
                            <Link href={READ_BLOG_ROUTE + i.id} key={num} className="text-lg text-foreground">
                                <div className="my-5 text-xl px-2 text-center underline max-w-screen-md line-clamp-1">
                                    {i.title}
                                </div>
                            </Link>
                            <Separator className="my-2 last:hidden" />
                        </>
                    ))}
                </div>
            </ScrollArea>
        </div>
    )
}