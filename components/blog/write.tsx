"use client";

import { useEffect } from "react";

import { toast } from "@/lib/toast";
import {BlogBoard} from "@/components/blog/board";
import { AddContent } from "@/components/blog/add-content";

export function Write({ userID }: { userID: string }) {

    useEffect(() => {
        toast("",{
            description: "Enter `Ctrl + k` to open menu"
        })
    }, [])

    return (
        <div>
            <BlogBoard />
            <AddContent />
        </div>
    )
}