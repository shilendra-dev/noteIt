import type { TypedFastifyInstance } from "@/types/fastify.js";
import { Response } from "@/lib/response/response.js";

export async function logoutAPI(fastify: TypedFastifyInstance) {
    fastify.post(
        '/auth/logout',
        async(_request, reply) => {
        try {
            reply.clearCookie("accessToken", {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            reply.clearCookie("refreshToken", {
                path: "/",
                httpOnly: true,
                secure: true,
                sameSite: "none",
            });

            return reply.code(200).send(Response.success({}, 200, "Logged out successfully"));
        } catch(error) {
            console.error(error);
            return reply.code(500).send(Response.error(500, "Failed to logout"));
        }
    }
    );
}
