import { db } from "@/db";
import { users } from "@/db/schema";

export async function createUser({ email, name }: { email: string; name: string }) {
    try {
        const result = await db.insert(users).values({
            email,
            name,
        }).returning({
            id: users.id,
            email: users.email,
            name: users.name,
        });

        return result[0];
    } catch (error) {
        console.error(error);
        throw error;
    }
}