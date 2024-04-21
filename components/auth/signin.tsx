"use client";

import {useEffect, useTransition, Suspense} from "react";
import { useSearchParams, usePathname } from "next/navigation";

import { SiginAction } from "@/action/signin";
import {Spinner} from "@/components/auth/spinner";
import {SIGNIN_ROUTE} from "@/routes";

function SignInWithNext_(){

    const searchParams = useSearchParams();
    const [, startTransition] = useTransition();

    useEffect(() => {
        const next = searchParams.get("next");

        startTransition(async () => {
            await SiginAction({next})
        })
        
    }, [searchParams])

    return (
        <Spinner />
    )
}

export function SignInWithNext(){
    return (
        <Suspense>
            <SignInWithNext_ />
        </Suspense>
    )
}

function SignInWithPathname_(){
    const pathname = usePathname();
    const [, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            if(pathname === SIGNIN_ROUTE){
                await SiginAction({next: "/"});
            }else{
                await SiginAction({next: pathname});
            }
        })
    })

    return (
        <Spinner />
    )
}

export function SignInWithPathname(){
    return (
        <Suspense>
            <SignInWithPathname_ />
        </Suspense>
    )
}