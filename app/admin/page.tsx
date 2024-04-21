import {auth} from "@/auth";
import {notFound} from "next/navigation";

export default async function AdminPage(){
    const session = await auth();

    if(!session?.user || session?.user?.role !== "ADMIN"){
        return notFound();
    }

    return (
        <div>You are admin user.</div>
    )

}