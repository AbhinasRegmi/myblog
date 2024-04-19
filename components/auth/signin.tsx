"use client";

import {useEffect, useTransition} from "react";
import { useSearchParams } from "next/navigation";

import { SiginAction } from "@/action/signin";
import {Spinner} from "@/components/auth/spinner";

export function SignIn(){

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