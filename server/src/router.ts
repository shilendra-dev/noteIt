import type { TypedFastifyInstance } from "./types/fastify.js";
import healthRoutes from "./resources/health/routes.js";
import authRoutes from "./resources/auth/routes.js";

export default async function registerRoutes(fastify: TypedFastifyInstance) {
    fastify.register(healthRoutes)
    fastify.register(authRoutes)
}