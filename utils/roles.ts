import { auth } from "@clerk/nextjs/server";

export type UserRoles = "super_admin" | "admin" | "agent" | "client";

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: UserRoles
        }
    }
}

export const checkRole = async (role: UserRoles) => {
    const { sessionClaims } = await auth();

    return sessionClaims?.metadata?.role === role;
}