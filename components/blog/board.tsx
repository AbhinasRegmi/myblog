"use client";

import { BlogComponentProps, RenderBlock } from "./comp";
import { GridBackGround } from "@/components/ui/grid-background";

interface BlogBoardProps {
    data: BlogComponentProps[]
}
export function BlogBoard(props: BlogBoardProps) {
    return (
        <div className="md:container px-6 md:px-28">
            <GridBackGround>
                <div className="w-full py-4 px-6 min-h-[550px]">
                    {
                        props.data.map(block => (
                            RenderBlock(block)
                        ))
                    }
                </div>
            </GridBackGround>
        </div>
    )
}