import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";


interface useSetParamsProps {
    key: string;
    value: string;
}
export function useSetParams(props: useSetParamsProps){
    const pathname = usePathname();
    const {replace} = useRouter();

    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        params.set(props.key, props.value);
        replace(`${pathname}?${params.toString()}`);
    }, [
        pathname
    ])
}