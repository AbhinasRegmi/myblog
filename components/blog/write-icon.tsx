import Link from "next/link";
import { PenTool } from "lucide-react";
import { NEW_BLOG_ROUTE } from "@/routes";
import { Button } from "@/components/ui/button";


export function WriteIcon() {
    return (
        <Button variant={"ghost"} size={"lg"} asChild>
            <Link href={NEW_BLOG_ROUTE} className="text-muted-foreground flex gap-2 items-center" >
                <PenTool />
                <span className="text-foreground text-lg">Write</span>
            </Link>
        </Button>

    )
}