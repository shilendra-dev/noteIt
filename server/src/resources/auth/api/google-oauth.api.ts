import type { TypedFastifyInstance } from "@/types/fastify.js";
import { Response } from "@/lib/response/response.js";
import { config } from "@/config/config.js";
import { OAuth2Client } from 'google-auth-library';

export async function googleOauthAPI(fastify: TypedFastifyInstance) {
    fastify.get(
        '/auth/google',
        async (_request, reply) => {
            try {
                const client = new OAuth2Client(config.googleAuth.clientId, config.googleAuth.clientSecret, config.googleAuth.redirectUri);
                const url = client.generateAuthUrl({
                    access_type: 'offline',
                    scope: ['openid', 'email', 'profile'],
                });

                return reply.redirect(url);
            } catch (error) {
                console.error(error);   
                return reply.code(500).send(Response.error(500, "Google OAuth failed"));
            }
        }
    );
}