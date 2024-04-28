"use client";

import Link from "next/link";
import { PenTool } from "lucide-react";
import { NEW_BLOG_ROUTE } from "@/routes";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export function WriteIcon() {
    const pathname = usePathname();

    const isWritePage = !!pathname.startsWith(NEW_BLOG_ROUTE);
    return (
        <Button
            variant={"ghost"}
            size={"lg"}
            className={cn(
                isWritePage && "ring-offset-background ring-2 ring-ring ring-offset-2",
                
            )}
            asChild >
            <Link href={NEW_BLOG_ROUTE} className="text-muted-foreground flex gap-2 items-center" >
                <PenTool />
                <span className="text-foreground text-lg">Write</span>
            </Link>
        </Button>

    )
}