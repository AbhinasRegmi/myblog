"use client";

import { useEffect, useReducer } from "react";

import { toast } from "@/lib/toast";
import {BlogBoard} from "@/components/blog/board";
import { AddContent } from "@/components/blog/add-content";
import {blogContext, blogReducer} from "@/context/blog-context";
import { BlogComponentProps } from "@/components/blog/comp";


interface WriteProps {
    data?: BlogComponentProps[],
    blogID: string
}
export function Write(props: WriteProps) {
    const [blogState, dispatchFn] = useReducer(
        blogReducer,
        props.data ?? []
    )
    useEffect(() => {
        toast("",{
            description: "Enter `Ctrl + k` to open menu"
        })
    }, [])

    
    return (
        <blogContext.Provider value={{dispatch: dispatchFn}}>
            {props.blogID}
            <BlogBoard data={blogState} />
            <AddContent />
        </blogContext.Provider>
    )
}