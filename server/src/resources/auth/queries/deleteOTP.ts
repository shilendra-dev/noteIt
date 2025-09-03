import { db } from "@/db";
import { otpCodes } from "@/db/schema.js";
import { eq } from "drizzle-orm";

export async function deleteOTP(email: string) {
    try {
        await db.delete(otpCodes).where(eq(otpCodes.email, email));
    } catch (error) {
        console.error(error);
        throw error;
    }
}