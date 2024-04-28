"use client";

import {
    createContext,
    PropsWithChildren,
    useContext,
    useState
} from "react";


interface indicatorContextProps {
    isPending: boolean;
    setIsPending: ((i: boolean) => void) | null;
}

export const indicatorContext = createContext<indicatorContextProps>({
    isPending: false,
    setIsPending: null
});

export function useIndicatorContext(){
    const {isPending, setIsPending} = useContext(indicatorContext);

    if(!setIsPending){
        throw new Error("setIsPending must be set in the context provider.")
    }

    return {
        isPending,
        setIsPending
    }
}

export function IndicatorContextProvider(props: PropsWithChildren){

    const [isPending, setIsPending] = useState<boolean>(false);

    return (
        <indicatorContext.Provider value={{
            isPending,
            setIsPending
        }}>
            {props.children}
        </indicatorContext.Provider>
    )
}