"use client";

import { BlogComponentProps, RenderBlock } from "./comp";
import { GridBackGround } from "@/components/ui/grid-background";

export function BlogBoard() {
    const components = [
        {
            label: "title",
            content: "",
            id: "",
            blogId: "",
            position: 0,
            isEditable: true
        }
    ] satisfies BlogComponentProps[];

    return (
        <div className="md:container px-6 md:px-28">
            <GridBackGround>
                <div className="w-full py-4 px-1">
                    {
                        components.map(block => (
                            RenderBlock(block)
                        ))
                    }
                </div>
            </GridBackGround>
        </div>
    )
}