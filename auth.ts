import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "@/db/connection";
import { RoleType } from "@/db/schemas/users";
import { getUserById } from "@/db/query/users";
import authConfig from "@/auth.config";


declare module "next-auth" {
    interface User {
        role?: RoleType;
    }
}

export const {
    handlers: { GET, POST },
    signIn,
    signOut,
    auth
} = NextAuth({
    adapter: DrizzleAdapter(db),
    session: {
        strategy: "jwt",
    },
    ...authConfig,
    callbacks: {
        async jwt({ token }) {
            if (token.sub) {
                const user = await getUserById({ id: token.sub });

                if (user) {
                    token.role = user.role;
                }
            }

            return token;
        },

        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;

                if (token.role) {
                    session.user.role = token.role as RoleType;
                }
            }

            return session;
        },

    }
})