import type { TypedFastifyInstance } from '@/types/fastify.js';
import { getOtpAPI } from '@/resources/auth/api/get-otp.api.js';

export default async function authRoutes(fastify: TypedFastifyInstance) {
    await fastify.register(getOtpAPI)
}