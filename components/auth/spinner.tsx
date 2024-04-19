"use client";

import { RefreshCw } from "lucide-react";

export function Spinner(){
    return (
        <div className="w-full h-dvh flex items-center justify-center">
            <RefreshCw className="animate-spin size-8" />
        </div>
    )
}