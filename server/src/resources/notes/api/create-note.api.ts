import { FastifyInstance } from "fastify";
import { authMiddleware, AuthRequest } from "@/util/authMiddleware.js";
import { Response } from "@/lib/response/response.js";
import addNote from "../queries/addNote.js";

export async function createNoteAPI(fastify: FastifyInstance) {
    fastify.post("/notes", { preHandler: authMiddleware }, async (req, reply) => {
        try {
            const { user } = req as AuthRequest;
            const { title } = req.body as { title: string };

            if(!title){
                return reply.code(400).send(Response.error(400, "Title is required"));
            }
            
            const result = await addNote(user.id, title);
            return reply.code(200).send(Response.success({
                message: "Note created successfully",
                data: result,
            }, 200, "Note created successfully"));
        }catch(error){
            console.error(error);
            return reply.code(500).send(Response.error(500, "Failed to create note"));
        }
    });
}
