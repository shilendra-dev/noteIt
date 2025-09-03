import type { TypedFastifyInstance } from "./types/fastify.js";
import healthRoutes from "./resources/health/routes.js";
import authRoutes from "./resources/auth/routes.js";
import notesRoutes from "./resources/notes/routes.js";

export default async function registerRoutes(fastify: TypedFastifyInstance) {
    console.log('registering routes')
    fastify.register(healthRoutes)
    fastify.register(authRoutes)
    fastify.register(notesRoutes)
}