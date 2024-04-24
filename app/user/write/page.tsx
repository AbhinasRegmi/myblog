import { auth } from "@/auth";
import { SignInWithPathname } from "@/components/auth/signin";
import {Write} from "@/components/blog/write";
import {AddContent} from "@/components/blog/add-content";

export default async function WritePage(){
    const session = await auth();

    // if(!session?.user){
    //     return (
    //         <SignInWithPathname />
    //     )
    // }

    // const userID = session.user?.id;

    // if(!userID){
    //     throw new Error();
    // }

    
    return (
        <div>
            <Write userID={''} />

        </div>
    )
}