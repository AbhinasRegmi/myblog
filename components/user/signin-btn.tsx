import Link from "next/link";

import {
    Button
} from "@/components/ui/button";
import {
    SIGNIN_ROUTE
} from "@/routes";

export function SignInButton(){
    return (
        <Button asChild variant={"outline"} size={"lg"}>
            <Link href={SIGNIN_ROUTE}>
                Sign In
            </Link>
        </Button>
    )
}