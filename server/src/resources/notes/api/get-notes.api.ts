import { FastifyInstance } from "fastify";
import { authMiddleware, AuthRequest } from "@/util/authMiddleware.js";
import { Response } from "@/lib/response/response.js";
import getNotes from "../queries/getNotes.js";

export async function getNotesAPI(fastify: FastifyInstance) {
    fastify.get("/notes", { preHandler: authMiddleware }, async (req, reply) => {
        try {
            const { user } = req as AuthRequest;
            
            const result = await getNotes(user.id);
            return reply.code(200).send(Response.success({
                message: "Notes fetched successfully",
                notes: result,
            }, 200, "Notes fetched successfully"));
        }catch(error){
            console.error(error);
            return reply.code(500).send(Response.error(500, "FAILED_TO_FETCH_NOTES"));
        }
    });
}
