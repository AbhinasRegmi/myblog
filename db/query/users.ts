import {eq} from "drizzle-orm";

import {db} from "@/db/connection";
import {users} from "@/db/schemas/users";

export async function getUserById({id}: {id: string}){
    const res = await db.select().from(users).where(eq(users.id, id));

    if(res.length){
        return res[0];
    }

    return null;
}