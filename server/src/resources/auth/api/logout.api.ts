import type { TypedFastifyInstance } from "@/types/fastify.js";
import { Response } from "@/lib/response/response.js";
import { config } from "@/config/config.js";

export async function logoutAPI(fastify: TypedFastifyInstance) {
    fastify.post(
        '/auth/logout',
        {
            config: {
                public: true,
                ratelimit: false,
            },
        },
        async (request, reply) => {
            try {
                // Clear access token
                reply.setCookie("accessToken", "", {
                    httpOnly: true,
                    secure: config.server.environment === "production", // match your previous config
                    sameSite: "strict",
                    path: "/",
                    maxAge: 0, // expire immediately
                });

                // Clear refresh token
                reply.setCookie("refreshToken", "", {
                    httpOnly: true,
                    secure: config.server.environment === "production",
                    sameSite: "strict",
                    path: "/",
                    maxAge: 0,
                });

                return reply.send(Response.success({}, 200, "Logged out successfully"));
            } catch (error) {
                console.error(error);
                return reply.send(Response.error(500, "Failed to logout"));
            }
        }
    );
}
