import {notFound} from "next/navigation";
import { PropsWithChildren } from "react";

import {auth} from "@/auth";

export async function AdminRequiredPage(props: PropsWithChildren) {
    const session = await auth();

    if(session?.user?.role === "ADMIN"){
        notFound();
    }

    return (
        <>
            {props.children}
        </>
    )
}