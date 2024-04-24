"use client";

import {useState, useEffect, useTransition, useRef, useContext} from "react";

import {blogContext} from "@/context/blog-context";

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
    
    return (
        <div className="pt-8">
            <h1 defaultValue={props.content} contentEditable={props.isEditable ?? false}
            className="-ml-1 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl py-2 focus:outline-none empty:after:content-['Title...'] after:opacity-30">
            </h1>
        </div>
    )
}

export function RenderBlock(block: BlogComponentProps) {
    switch (block.label) {
        case "title":
            return (
                <TitleBlock {...block} />
            )
        default: {
            throw new Error("Unhandled compoent type...")
        }
    }
}


function useBlockRef(block: BlogComponentProps) {
    const blockRef = useRef<HTMLDivElement>(null);
    const { dispatch } = useContext(blogContext);
    let timer: any = null;

    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Backspace' && blockRef.current?.textContent === '') {
            if (dispatch) {
                //TODO: Function to delete a block.
                // dispatch({ type: 'delete', key: block.key })
            }
        }
    }

    function handleInput(content: string) {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(
            () => {
                //TODO: Server side update.
            },
            800
        )
    }

    useEffect(() => {
        blockRef.current?.addEventListener('keydown', handleKeyDown);

        blockRef.current?.focus();
        if(blockRef.current?.textContent === ''){
            blockRef.current.textContent = block.content;
        }
        
        return () => {
            blockRef.current?.removeEventListener("keydown", handleKeyDown);
        }
    }, [])

    return { blockRef, handleInput }
}