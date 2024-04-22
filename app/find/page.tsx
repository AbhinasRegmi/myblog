import {Find} from "@/components/find";
import {searchBlogs} from "@/db/query/blog";

export default async function FindPage(props: {
    searchParams? : {
        search?: string
    }
}){

    //TODO: limit and page from url extract garnw xa
    const data = await searchBlogs({
        search: props?.searchParams?.search ?? "",
        page: 1
    })

    return (
        <Find data={data} />
    )
}