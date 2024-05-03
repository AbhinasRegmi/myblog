import { Suspense } from "react";

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import { UserBlogDraft } from "@/components/user-blog/user-blog-draft";
import { UserBlogPublished } from "@/components/user-blog/user-blog-published";
import { cn } from "@/lib/utils";

export function UserBlogTabs() {
    //TODO: Add a better suspense boundary for tabs content.
    //TODO: Drafts update bhayo bhane show blinking icon.

    const tabs = ["drafts", "published"] as const;

    return (
        <Tabs defaultValue={tabs[0]}>
            <TabsList className="bg-background">
                {
                    tabs.map(t => (
                        <TabsTrigger
                            key={t}
                            value={t}
                            className={
                                cn(
                                    "data-[state=active]:shadow-none focus-visible:ring-0 text-lg",
                                    "data-[state=active]:border-b border-foreground rounded-none"
                                )
                            }
                        >
                            <span className="capitalize">{t}</span>
                        </TabsTrigger>
                    ))
                }
            </TabsList>
            <TabsContent value={tabs[0]}>
                <Suspense fallback={"Draft loading"}>
                    <UserBlogDraft />
                </Suspense>
            </TabsContent>
            <TabsContent value={tabs[1]}>
                <Suspense fallback={"Published loading"}>
                    <UserBlogPublished />
                </Suspense>
            </TabsContent>
        </Tabs>
    )
}