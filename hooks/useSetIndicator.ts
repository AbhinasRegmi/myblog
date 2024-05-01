"use client";

import {
    useEffect,
} from "react";
import { useIndicatorContext } from "@/context/indicator-context";

export function useSetIndicator(isPending: boolean){
    const {setIsPending} = useIndicatorContext();

    //TODO: i think when different comps passes isPending problem occurs look into it later.
    useEffect(() => {
        setIsPending(isPending);
    }, [isPending])
}