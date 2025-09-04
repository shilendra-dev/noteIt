import { db } from "@/db/index.js";
import { users } from "@/db/schema.js";

export async function createUser({ email, name, dob }: { email: string; name: string; dob?: Date }) {
    try {
        const result = await db.insert(users).values({
            email,
            name,
            dob: dob || null,
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