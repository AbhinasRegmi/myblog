"use client";

import {useEffect, useTransition} from "react";
import { useSearchParams, usePathname } from "next/navigation";

import { SiginAction } from "@/action/signin";
import {Spinner} from "@/components/auth/spinner";
import {SIGNIN_ROUTE} from "@/routes";

export function SignInWithNext(){

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

export function SignInWithPathname(){
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