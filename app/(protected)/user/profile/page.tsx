import {auth} from "@/auth";
import {SignInWithPathname} from "@/components/auth/signin";

export default async function ProfilePage(){
    const session = await auth();

    if(!session?.user){
        return (
            <SignInWithPathname />
        )
    }

    return (
        <div>
            You are logged in user.
        </div>
    )
}