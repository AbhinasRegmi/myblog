"use client";

import {
    useEffect,
} from "react";
import { useIndicatorContext } from "@/context/indicator-context";

export function useSetIndicator(isPending: boolean){
    const {setIsPending} = useIndicatorContext();

    useEffect(() => {
        setIsPending(isPending);
    }, [isPending])
}