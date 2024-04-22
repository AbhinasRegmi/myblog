"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as z from "zod";
import { RotateCw } from "lucide-react";
import Link from "next/link";

import { FormItem, FormField, FormControl, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchSchema } from "@/schemas/search";
import { cn } from "@/lib/utils";


export function SearchForm({
    className,
}: {
    className?: string;
}) {
    const [isPending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const form_ = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            search: searchParams.get("search") ?? "",
        },
    });

    function handler(values: z.infer<typeof SearchSchema>) {
        let params = new URLSearchParams(window.location.search);

        if (values.search) {
            params.set("search", values.search);
        } else {
            params.delete("search");
        }

        startTransition(() => {
            replace(`${pathname}?${params.toString()}`);
        });
    }

    //TODO: Embed a search page in desktop mode and route to page in mobile mode.

    return (
        <Form {...form_}>
            <form onSubmit={form_.handleSubmit(handler)}>
                <div>
                    <FormField
                        name="search"
                        control={form_.control}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <InputCore
                                        field={field}
                                        className={className}
                                        isPending={isPending}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
}


function InputCore({
    field,
    className,
    isPending,
}: {
    field?: any;
    className?: string;
    isPending?: boolean;
}) {
    return (
        <div className="relative">
            <Input
                {...field}
                placeholder="Search blogs..."
                className={cn(
                    "w-58 text-lg font-medium text-foreground tracking-wider pr-8",
                    className
                )}
            />
            {isPending && (
                <div
                    className="
                    absolute right-1 top-0 bottom-0 
                    flex items-center justify-center"
                >
                    <RotateCw
                        className="animate-spin text-muted-foreground"
                    />
                </div>
            )}
        </div>
    );
}
