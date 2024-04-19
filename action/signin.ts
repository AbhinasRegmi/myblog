"use server";

import {signIn} from "@/auth";

export async function SiginAction({next}: {next?: string | null}){
    await signIn("google", {redirectTo: next ?? "/user/profile"})
}