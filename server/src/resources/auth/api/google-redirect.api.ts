import type { TypedFastifyInstance } from "@/types/fastify.js";
import { Response } from "@/lib/response/response.js";
import { OAuth2Client } from 'google-auth-library';
import { config } from '@/config/config.js'
import { createUser } from '@/resources/auth/queries/createUser.js'
import jwt from "jsonwebtoken";
import { fetchUserByEmail } from "../queries/fetchUserByEmail";

export async function googleRedirectAPI(fastify: TypedFastifyInstance) {
    fastify.get(
        '/auth/callback/google',
        async (request, reply) => {
            try {
                const { code } = request.query as { code: string };
                const client = new OAuth2Client(config.googleAuth.clientId, config.googleAuth.clientSecret, config.googleAuth.redirectUri);

                const { tokens } = await client.getToken(code);

                const ticket = await client.verifyIdToken({
                    idToken: tokens.id_token as string,
                    audience: config.googleAuth.clientId
                });

                const payload = ticket.getPayload();

                if (!payload) {
                    return reply.code(401).send(Response.error(401, "GOOGLE_AUTH_FAILED"));
                }

                const { email, name } = payload;
                //checked for type safety
                if (!email || !name) {
                    return reply.code(401).send(Response.error(401, "GOOGLE_AUTH_FAILED"));
                }

                const fetchedUser = await fetchUserByEmail(email);

                if (fetchedUser) {
                    //implement token login system
                    const accessToken = jwt.sign(
                        { id: fetchedUser.id, email: fetchedUser.email, name: fetchedUser.name },
                        config.security.jwtSecret,
                        { expiresIn: "60m" }
                    );

                    const refreshToken = jwt.sign(
                        { id: fetchedUser.id, email: fetchedUser.email, name: fetchedUser.name },
                        config.security.jwtRefreshSecret,
                        { expiresIn: "7d" }
                    );

                    reply.setCookie("accessToken", accessToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        path: "/",
                        maxAge: 60 * 60,
                    });

                    reply.setCookie("refreshToken", refreshToken, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none",
                        path: "/",
                        maxAge: 7 * 24 * 60 * 60,
                    });
                    return reply.redirect(`${config.client.url}`);
                }
                //if user not found
                //create user
                const user = await createUser({ email, name });

                const accessToken = jwt.sign(
                    { id: user.id, email: user.email, name: user.name },
                    config.security.jwtSecret,
                    { expiresIn: "60m" }
                );

                const refreshToken = jwt.sign(
                    { id: user.id, email: user.email, name: user.name },
                    config.security.jwtRefreshSecret,
                    { expiresIn: "7d" }
                );

                reply.setCookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                    maxAge: 60 * 60,
                });

                reply.setCookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60,
                });

                return reply.redirect(`${config.client.url}`);

            } catch (error) {
                console.error(error);
                return reply.code(500).send(Response.error(500, "GOOGLE_AUTH_FAILED"));
            }
        }
    );
}