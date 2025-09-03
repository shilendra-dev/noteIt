import { FastifyInstance } from "fastify";
import { authMiddleware, AuthRequest } from "@/util/authMiddleware.js";
import { Response } from "@/lib/response/response.js";
import deleteNote from "../queries/deleteNote.js";

export async function deleteNoteAPI(fastify: FastifyInstance) {
    fastify.delete("/notes/:id", { preHandler: authMiddleware }, async (req, reply) => {
        try {
            const { user } = req as AuthRequest;
            const { id } = req.params as { id: string };
            
            const result = await deleteNote(user.id, id);

            return reply.send(Response.success({
                message: "Note deleted successfully",
                data: result,
            }, 200, "Note deleted successfully"));
        } catch(error){
            console.error(error);
            return reply.send(Response.error(500, "Failed to delete note"));
        }
    });
}