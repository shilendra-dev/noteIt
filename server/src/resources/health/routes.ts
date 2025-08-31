import type { TypedFastifyInstance } from '@/types/fastify.js';
import { getHealthAPI } from '@/resources/health/api/get-health.api.js';

export default async function healthRoutes(fastify: TypedFastifyInstance) {
    await fastify.register(getHealthAPI)
}