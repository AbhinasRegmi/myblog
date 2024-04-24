"use client";

export type BlogLabels = "title" | "image" | "pararaph" | "link" | "code" | "line-gap";
export interface BlogComponentProps {
    label: BlogLabels;
    content: string;
    id: string;
    blogId: string;
    position: number;
    isEditable?: boolean;
}

export function TitleBlock(props: BlogComponentProps){
    return (
        <div></div>
    )
}

export function RenderBlock(block: BlogComponentProps){
    switch(block.label){
        case "title":
            return (
                <TitleBlock {...block} />
            )
        default: {
            throw new Error("Unhandled compoent type...")
        }
    }
}