"use server";

import * as z from "zod";

import { SearchSchema } from "@/schemas/search";

export async function SearchAction(value: z.infer<typeof SearchSchema>){
    const validatedValue = SearchSchema.safeParse(value);

    if(!validatedValue.success) return;

    //TODO: Run actual search and return links...

    return {
        msg: `Search is ${validatedValue.data.search}`
    }
}