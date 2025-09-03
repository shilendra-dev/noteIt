import { db } from "@/db";
import { notes } from "@/db/schema.js";

export default async function addNote(userId: string, title: string) {
 try{
    const result = await db.insert(notes).values({
        userId,
        title,
    }).returning({
        id: notes.id,
        title: notes.title,
    });
    return result[0];
 }catch(error){
    console.error(error);
    throw error;
 }   
}