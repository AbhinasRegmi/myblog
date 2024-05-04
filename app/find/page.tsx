import {Find} from "@/components/find";
import {searchBlogs} from "@/db/query/blog";

export default async function FindPage(props: {
    searchParams? : {
        search?: string
    }
}){

    //TODO: limit and page from url extract garnw xa
    const data = [
        {
            title: 'Search functionality is not ready yet.',
            id: ''
        }
    ]

    return (
        <Find data={data} />
    )
}