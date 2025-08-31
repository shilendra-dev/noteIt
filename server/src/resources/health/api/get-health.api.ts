import type { TypedFastifyInstance } from "@/types/fastify.js";
import { Response } from "@/lib/response/response.js";

export async function getHealthAPI(fastify: TypedFastifyInstance) {
    fastify.get(
        '/health',
        {
            config: {
                public: true,
                ratelimit: false,
            },
        },
        async () => {
            const health = {
                status: 'healthy',
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
                environment: process.env.NODE_ENV || 'development',
            }
            return Response.success(health, "Service is healthy", 200)
        },
    )
}