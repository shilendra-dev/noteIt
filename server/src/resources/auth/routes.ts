import type { TypedFastifyInstance } from '@/types/fastify.js';
import { getOtpSignupAPI } from '@/resources/auth/api/get-otp-signup.api.js';
import { verifyOtpSignupAPI } from '@/resources/auth/api/verify-otp-signup.api.js';
import { getOtpSigninAPI } from '@/resources/auth/api/get-otp-signin.api.js';
import { verifyOtpSigninAPI } from '@/resources/auth/api/verify-otp-signin.api.js';

export default async function authRoutes(fastify: TypedFastifyInstance) {
    await fastify.register(getOtpSignupAPI)
    await fastify.register(verifyOtpSignupAPI)
    await fastify.register(getOtpSigninAPI)
    await fastify.register(verifyOtpSigninAPI)
}