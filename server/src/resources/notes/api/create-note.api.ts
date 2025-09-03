import { FastifyInstance } from "fastify";
import { authMiddleware, AuthRequest } from "@/util/authMiddleware.js";
import { Response } from "@/lib/response/response.js";
import addNote from "../queries/addNote";

export async function createNoteAPI(fastify: FastifyInstance) {
    fastify.post("/notes", { preHandler: authMiddleware }, async (req, reply) => {
        try {
            const { user } = req as AuthRequest;
            const { title } = req.body as { title: string };
            
            const result = await addNote(user.id, title);
            return reply.send(Response.success({
                message: "Note created successfully",
                data: result,
            }, 200, "Note created successfully"));
        }catch(error){
            console.error(error);
            return reply.send(Response.error(500, "Failed to create note"));
        }
    });
}
