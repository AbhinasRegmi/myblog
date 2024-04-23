"use client";

import { Plus } from "lucide-react";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";

export function AddContent() {
    const [open, setOpen] = useState<boolean>(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const components = [
        {
            label: "Title",
            dispatch: {}
        },
        {
            label: "Image",
            dispatch: {}
        },
        {
            label: "Paragraph",
            dispatch: {}
        },
        {
            label: "Link",
            dispatch: {}
        },
        {
            label: "Code",
            dispatch: {}
        }
    ]

    const utilities = [
        {
            label: "Line Gap",
            dispatch: {}
        }
    ];

    return (
        <>
            <Button onClick={() => setOpen(p => !p)} variant={"outline"} size={"icon"} className="fixed bottom-10 right-6 bg-accent opacity-80">
                <Plus />
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen} className="-translate-y-[92%] md:-translate-y-1/2 min-h-[350px]">
                <CommandInput placeholder="Type a component name  or search..." />
                <CommandList>
                    <CommandEmpty>No such component found.</CommandEmpty>
                    <CommandGroup heading="Components">
                        {
                            components.map(i => (
                                <CommandItem key={i.label}>
                                    <span className="text-base">{i.label}</span>
                                </CommandItem>
                            ))
                        }
                    </CommandGroup>
                    <CommandGroup heading="Utility">
                        {
                            utilities.map(i => (
                                <CommandItem key={i.label}>
                                    <span className="text-base">{i.label}</span>
                                </CommandItem>
                            ))
                        }
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}   