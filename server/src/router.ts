import type { TypedFastifyInstance } from "./types/fastify.js";
import healthRoutes from "./resources/health/routes.js";

export default async function registerRoutes(fastify: TypedFastifyInstance) {
    fastify.register(healthRoutes)
}