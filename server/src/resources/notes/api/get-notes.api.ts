import { FastifyInstance } from "fastify";
import { authMiddleware, AuthRequest } from "@/util/authMiddleware.js";
import { Response } from "@/lib/response/response.js";
import getNotes from "../queries/getNotes.js";

export async function getNotesAPI(fastify: FastifyInstance) {
    fastify.get("/notes", { preHandler: authMiddleware }, async (req, reply) => {
        try {
            const { user } = req as AuthRequest;
            
            const result = await getNotes(user.id);
            return reply.send(Response.success({
                message: "Notes fetched successfully",
                notes: result,
            }, 200, "Notes fetched successfully"));
        }catch(error){
            console.error(error);
            return reply.send(Response.error(500, "Failed to fetch notes"));
        }
    });
}
