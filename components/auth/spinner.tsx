"use client";

import { RefreshCw } from "lucide-react";

export function Spinner(){
    return (
        <div className="w-full mt-[190px] flex items-center justify-center">
            <RefreshCw className="animate-spin size-8" />
        </div>
    )
}