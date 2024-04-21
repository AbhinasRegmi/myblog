import postgres from 'postgres';
import * as schema from "@/db/schemas";
import { drizzle } from 'drizzle-orm/postgres-js';

declare module global {
    let dbClient: ReturnType<typeof postgres> | undefined;
    let dbEdgeClient: any | undefined;
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