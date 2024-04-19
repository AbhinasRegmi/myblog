"use client";

import { useTransition, useEffect } from "react";

import { Spinner } from "@/components/auth/spinner";
import { SignOutAction } from "@/action/signout";

export function SignOut() {
    const [, startTransition] = useTransition();

    useEffect(() => {
        startTransition(async () => {
            await SignOutAction();
        })
    }, [])

    return (
        <Spinner />
    )
}