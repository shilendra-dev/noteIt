import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const userExist = async (email: string) => {
    try{
        const result = await
            db.select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

        if(result.length > 0){
            return true;
        }
        return false;
    }catch(error){
        console.error(error);
        throw error;
    }
}