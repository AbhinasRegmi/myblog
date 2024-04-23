import {auth} from "@/auth";
import {SignInWithPathname} from "@/components/auth/signin";
import {Profile} from "@/components/user/profile";


export default async function ProfilePage(){
    const session = await auth();

    if(!session?.user){
        return (
            <SignInWithPathname />
        )
    }


    return (
        <div className="md:container">
            <Profile name={session.user?.name ?? 'User'} imageUrl={session.user?.image ?? undefined} />
        </div>
    )
}