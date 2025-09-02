import { TypedFastifyInstance } from "@/types/fastify";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";
import { config } from "@/config/config.js";

export async function registerAuthPlugins(fastify: TypedFastifyInstance) {
  // Register cookies first (JWT can use cookies)
  await fastify.register(fastifyCookie);

  // Register JWT
  await fastify.register(fastifyJwt, {
    secret: config.security.jwtSecret || "supersecretkey",
    cookie: {
      cookieName: "accessToken", // default access token cookie
      signed: false,
    },
    sign: {
      expiresIn: "15m", // default access token expiry
    },
  });

  // You can add refresh token signing separately if needed
}
