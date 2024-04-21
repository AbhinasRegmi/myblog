import * as z from "zod";

export const SearchSchema = z.object({
    search: z.string()
})