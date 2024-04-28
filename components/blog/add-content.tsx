"use client";

import { Plus } from "lucide-react";
import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";

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
import { blogContext } from "@/context/blog-context";
import { BlogLabels } from "@/components/blog/comp";

export function AddContent() {
    const {dispatch} = useContext(blogContext);
    const [open, setOpen] = useState<boolean>(false);
    const searchParams = useSearchParams();

    if(!dispatch){
        throw new Error("Use Context should be wrapped with provider.")
    }
    
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

    const components: Array<{label: BlogLabels, name: string}> = [
        {
            label: "title",
            name: "Title"
        },
        {
            label: "image",
            name: "Image"
        },
        {
            label: "pararaph",
            name: "Paragraph"
        },
        {
            label: "link",
            name: "Link"
        },
        {
            label: "code",
            name: "Code"
        }
    ];

    const utilities: Array<{label: BlogLabels, name: string}> = [
        {
            label: "line-gap",
            name: "Line gap"
        }
    ];

    return (
        <div>
            <Button onClick={() => setOpen(p => !p)} variant={"outline"} size={"icon"} className="fixed bottom-12 md:bottom-10 right-6 bg-accent opacity-80">
                <Plus />
            </Button>


            <CommandDialog open={open} onOpenChange={setOpen} styles="-translate-y-[92%] md:-translate-y-1/2 min-h-[350px]">
                <CommandInput placeholder="Type a component name  or search..." />
                <CommandList>
                    <CommandEmpty>No such component found.</CommandEmpty>
                    <CommandGroup heading="Components">
                        {
                            components.map(i => (
                                <CommandItem key={i.label} onSelect={
                                    () => {
                                        dispatch({
                                            type: "create",
                                            label: i.label,
                                            blogID: searchParams.get("blogID") ?? ''
                                        })

                                        setOpen(false);
                                    }}
                                >
                                    <span className="text-base">{i.name}</span>
                                </CommandItem>
                            ))
                        }
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Utility">
                        {
                            utilities.map(i => (
                                <CommandItem key={i.label} onSelect={
                                    () => {
                                        dispatch({
                                            type: "create",
                                            label: i.label,
                                            blogID: searchParams.get("blogID") ?? ''
                                        })
                                        setOpen(false);
                                    }}
                                >
                                    <span className="text-base">{i.name}</span>
                                </CommandItem>
                            ))
                        }
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </div>
    )
}   