"use client";

export default function ErrorPage() {
    return (
        <div className="flex items-center justify-center gap-1 h-[550px]">
            <div className="text-2xl">500</div>
            <div className="h-12 w-2 border-r-2 mx-2 border-foreground"></div>
            <div>Something went wrong</div>
        </div>
    )
}