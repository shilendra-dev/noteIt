import type { TypedFastifyInstance } from '@/types/fastify.js';
import { getOtpSignupAPI } from '@/resources/auth/api/get-otp-signup.api.js';
import { verifyOtpSignupAPI } from '@/resources/auth/api/verify-otp-signup.api.js';

export default async function authRoutes(fastify: TypedFastifyInstance) {
    await fastify.register(getOtpSignupAPI)
    await fastify.register(verifyOtpSignupAPI)
}