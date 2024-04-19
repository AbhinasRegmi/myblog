import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from "@/db/schemas";

declare module global {
    let dbClient: ReturnType<typeof postgres> | undefined
}

let dbClient;
let dbURL = process.env.POSTGRESQL_DB_URL!;

if(process.env.NODE_ENV !== 'production'){
    if(!global.dbClient){
        global.dbClient = postgres(dbURL);
    }

    dbClient = global.dbClient;
}else{
    dbClient = postgres(dbURL);
}


export const db = drizzle(dbClient, {schema});