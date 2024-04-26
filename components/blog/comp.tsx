"use client";

import {useState, useEffect, useTransition, useRef, useContext} from "react";

import {blogContext} from "@/context/blog-context";
import { updateBlogComponentAction, deleteBlogComponentAction } from "@/action/blog";
import { cn } from "@/lib/utils";

export type BlogLabels = "title" | "image" | "pararaph" | "link" | "code" | "line-gap";
export interface BlogComponentProps {
    label: BlogLabels;
    content: string;
    id: string;
    blogId: string;
    position: number;
    isEditable?: boolean;
}

export function TitleBlock(props: BlogComponentProps) {
    const {blockRef, handleInput} = useBlockRef(props);

    return (
        <div className="pt-8 pb-4">
            <h1
            ref={blockRef} 
            onInput={(e) => handleInput(e.currentTarget.textContent ?? '')}
            contentEditable={props.isEditable ?? false}

            className={
                cn(
                    "-ml-1 scroll-m-20 text-4xl font-extrabold ",
                    "tracking-tight lg:text-5xl py-2 focus:outline-none after:opacity-30 whitespace-break-spaces", 
                    !!!props.content && "empty:after:content-['Title...']"
                )
            }>
            </h1>
        </div>
    )
}

export function ParagraphBlock(props: BlogComponentProps){
    const {blockRef, handleInput} = useBlockRef(props);

    return (
        <div className="inline-block">
            <p
            ref={blockRef}
            onInput={e => handleInput(e.currentTarget.textContent ?? '')}
            contentEditable={props.isEditable ?? false}
            className={
                cn(
                    "focus:outline-none after:opacity-30 inline-block text-lg whitespace-break-spaces",
                    !!!props.content && "empty:after:content-['Paragraph...']"
                )
            }>
            </p>
        </div>
    )
}

export function RenderBlock(block: BlogComponentProps) {
    switch (block.label) {
        case "title":
            return (
                <TitleBlock key={block.id} {...block} />
            )
        case "pararaph":
            return (
                <ParagraphBlock key={block.id} {...block} />
            )

        default: {
            throw new Error("Unhandled compoent type...")
        }
    }
}

function useBlockRef(block: BlogComponentProps) {
    const [isPending, startTransition] = useTransition();

    //TODO: Show pending status to show updating and other side effects.

    const blockRef = useRef<HTMLDivElement>(null);
    
    const { dispatch } = useContext(blogContext);    

    let timer: any = null;



    function handleInput(content: string) {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(
            () => {
                startTransition(async () => {
                    await updateBlogComponentAction({
                        ...block,
                        content
                    });
                })   
            },
            400
        )
    }

    useEffect(() => {

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Backspace' && blockRef.current?.textContent === '') {
                if (dispatch) {
                    dispatch({ type: 'delete', id: block.id, label: block.label, blogID: block.blogId });
                    
                    startTransition(async () => {
                        await deleteBlogComponentAction({
                            blogID: block.blogId,
                            componentID: block.id
                        });
                    })
                }
            }
        }

        const current = blockRef.current;

        current?.addEventListener('keydown', handleKeyDown);

        if(current?.textContent === ''){
            current.textContent = block.content;
        }

        if(!block.content){
            current?.focus();
        }
        
        return () => {
            current?.removeEventListener("keydown", handleKeyDown);
        }
    }, [block, dispatch])

    return { blockRef, handleInput }
}