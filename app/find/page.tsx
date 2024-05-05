import {Find} from "@/components/find";
import {searchBlogs} from "@/db/query/blog";
import { Suspense } from "react";

export default async function FindPage(props: {
    searchParams? : {
        search?: string
    }
}){

    const data = await searchBlogs({search: props.searchParams?.search});

    return (
        <Suspense fallback={'searching...'}>
            <Find data={data} />
        </Suspense>
    )
}