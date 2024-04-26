"use client";

import { useEffect, useReducer } from "react";

import { toast } from "@/lib/toast";
import { BlogBoard } from "@/components/blog/board";
import { AddContent } from "@/components/blog/add-content";
import { blogContext, blogReducer } from "@/context/blog-context";
import { BlogComponentProps } from "@/components/blog/comp";
import { useSetParams } from "@/hooks/useSetParams";


interface WriteProps {
    data?: BlogComponentProps[],
    blogID: string
}
export function Write(props: WriteProps) {
    const [blogState, dispatchFn] = useReducer(
        blogReducer,
        props.data ?? []
    )

    useSetParams({ key: 'blogID', value: props.blogID });

    useEffect(
        () => {
            setTimeout(() => {
                toast("", {
                    description: "Enter `Ctrl + k` to open menu",
                })
            })
        }
    )

    return (
        <blogContext.Provider value={{ dispatch: dispatchFn }}>
            <BlogBoard data={blogState} />
            <AddContent />
        </blogContext.Provider>
    )
}