import { db } from "@/db";
import { notes } from "@/db/schema.js";
import { eq } from "drizzle-orm";

export default async function getNotes(userId: string) {
 try{
    const result = await db.select().from(notes).where(eq(notes.userId, userId));
    return result;
 }catch(error){
    console.error(error);
    throw error;
 }   
}