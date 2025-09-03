import { FastifyInstance } from "fastify";
import { authMiddleware, AuthRequest } from "@/util/authMiddleware.js";

export async function meAPI(fastify: FastifyInstance) {
    fastify.get("/auth/me", { preHandler: authMiddleware }, async (req, reply) => {
        const { user } = req as AuthRequest;
        if (!user) return reply.status(401).send({ message: "Unauthorized" });

        return reply.send({
            id: user.id,
            email: user.email,
        });
    });
}
