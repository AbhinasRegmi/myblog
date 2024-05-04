"use client";

import { BlogComponentProps, RenderBlock } from "@/components/blog/comp";
import { GridBackGround } from "@/components/ui/grid-background";

interface BlogBoardProps {
    data: BlogComponentProps[]
}
export function ReadBoard(props: BlogBoardProps) {
    return (
        <div className="md:container md:px-28">
            <GridBackGround>
                <div className="w-full py-4 px-4 min-h-[550px] pb-20">
                    {
                        props.data.map(block => (
                            RenderBlock({
                                ...block,
                            })
                        ))
                    }
                </div>
            </GridBackGround>
        </div>
    )
}