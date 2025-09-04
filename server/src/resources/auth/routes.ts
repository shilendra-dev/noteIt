import type { TypedFastifyInstance } from '@/types/fastify.js';
import { getOtpSignupAPI } from '@/resources/auth/api/get-otp-signup.api.js';
import { verifyOtpSignupAPI } from '@/resources/auth/api/verify-otp-signup.api.js';
import { getOtpSigninAPI } from '@/resources/auth/api/get-otp-signin.api.js';
import { verifyOtpSigninAPI } from '@/resources/auth/api/verify-otp-signin.api.js';
import { meAPI } from '@/resources/auth/api/me.js';
import { logoutAPI } from '@/resources/auth/api/logout.api.js';
import { googleOauthAPI } from '@/resources/auth/api/google-oauth.api.js';
import { googleRedirectAPI } from '@/resources/auth/api/google-redirect.api.js';

export default async function authRoutes(fastify: TypedFastifyInstance) {
    await fastify.register(getOtpSignupAPI)
    await fastify.register(verifyOtpSignupAPI)
    await fastify.register(getOtpSigninAPI)
    await fastify.register(verifyOtpSigninAPI)
    await fastify.register(meAPI)
    await fastify.register(logoutAPI)
    await fastify.register(googleOauthAPI)
    await fastify.register(googleRedirectAPI)
}