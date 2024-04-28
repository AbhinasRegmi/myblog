"use client";

import {usePathname} from "next/navigation";
import { Loader, Check, CloudUpload } from "lucide-react";

import { NEW_BLOG_ROUTE } from "@/routes";
import { useIndicatorContext } from "@/context/indicator-context";
import { cn } from "@/lib/utils";

export function Indicator({className}: {className?: string}){
    const pathname = usePathname();
    const {isPending} = useIndicatorContext();
    const showIndicator = pathname.startsWith(NEW_BLOG_ROUTE);

    if(!showIndicator) return null;

    return (
        <div className={
            cn(
                "w-fit p-2 rounded-full opacity-90",
                isPending && "animate-pulse",
                className
            )
        }>

            {
                isPending ? 
                <CloudUpload key={'loading'} color="orange" className="animate-pulse" /> : 
                <Check key={'complete'} color="green" />
            }
        </div>
    )
}