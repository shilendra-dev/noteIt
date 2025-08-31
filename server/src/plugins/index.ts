import type { TypedFastifyInstance } from "@/types/fastify.js";
import fastifyHelmet from "@fastify/helmet"
import fastifyCors from "@fastify/cors"
import fastifyRateLimit from "@fastify/rate-limit"
import { config } from "@/config/config.js"
import {errorHandler} from '@/plugins/error-handler.js';

export async function registerPlugins(fastify: TypedFastifyInstance) {
    await fastify.register(fastifyHelmet, config.security.helmet);
    await fastify.register(fastifyCors, config.security.cors);
    await fastify.register(fastifyRateLimit, config.security.rateLimit);
    
    fastify.setErrorHandler(errorHandler);
}