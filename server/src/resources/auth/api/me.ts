import { FastifyInstance } from "fastify";
import { authMiddleware, AuthRequest } from "@/util/authMiddleware.js";
import { Response } from "@/lib/response/response.js";

export async function meAPI(fastify: FastifyInstance) {
    fastify.get("/auth/me", { preHandler: authMiddleware }, async (req, reply) => {
        try {
            const { user } = req as AuthRequest;
            if (!user) return reply.code(401).send(Response.error(401, "Unauthorized"));

            return reply.code(200).send(Response.success({
                id: user.id,
                name: user.name,
                email: user.email,
            }, 200, "User fetched successfully"));
        } catch (error) {
            console.error(error);
            return reply.code(500).send(Response.error(500, "Failed to fetch user"));
        }
    });
}
