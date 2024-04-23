import Link from "next/link";

import {
    ProfileAvatar
} from "@/components/user/profile-avatar";
import {
    SignInButton
} from "@/components/user/signin-btn";

import {
    auth
} from "@/auth";
import {
    PROFILE_ROUTE
} from "@/routes";

export async function SigninOrProfile(){
    const session = await auth();
    const isLoggedIn = !!session?.user;

    const imageUrl = session?.user?.image

    return (
        <div>
            {
                isLoggedIn ? <ProfileLink imageUrl={imageUrl ?? ''} /> : <SignInButton />
            }
        </div>
    )
}

function ProfileLink(props: {imageUrl: string}){
    return (
        <Link href={PROFILE_ROUTE}>
            <ProfileAvatar imageUrl={props.imageUrl} />
        </Link>
    )
}
