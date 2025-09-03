import { db } from "@/db/index.js";
import { users } from "@/db/schema.js";
import { eq } from "drizzle-orm";

export const fetchUserByEmail = async (email: string) => {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    // If user exists, return the first one; otherwise, return null
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
