import { db } from "@/db/index.js";
import { notes } from "@/db/schema.js";
import { and, eq } from "drizzle-orm";

export default async function deleteNote(userId: string, noteId: string) {
    try {
        const result = await db.delete(notes).where(and(eq(notes.userId, userId), eq(notes.id, noteId)));
        return result;
    }catch(error){
        console.error(error);
        throw error;
    }
}