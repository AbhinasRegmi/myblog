"use client";

import Link from "next/link";
import {useState} from "react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";

import { MoreHorizontal, LucideIcon } from "lucide-react";

type item = {
    label: string;
    icon?: LucideIcon;
    href?: string;
}
export interface ThreeDotsPros {
    label?: string;
    content: Array<item>
}

export function ThreeDots(props: ThreeDotsPros){
    const [open, setOpen] = useState<boolean>(false);

    return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size={"sm"}>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    {props.label}
                </DropdownMenuLabel>
                <DropdownMenuGroup>
                    {
                        props.content.map(i => (
                            <DropdownMenuItem key={i.label} className="gap-2">
                                {!!i.icon && <i.icon size={"16px"} />}

                                <Link href={i.href ?? ''} className="w-full">
                                    {i.label}
                                </Link>
                            </DropdownMenuItem>
                        ))
                    }
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
