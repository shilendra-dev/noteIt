import { FastifyRequest, FastifyReply } from "fastify";
import jwt, { JwtPayload } from "jsonwebtoken";
import { config } from "@/config/config.js";

interface AuthUserPayload extends JwtPayload {
  id: string;
  email: string;
}

export interface AuthRequest extends FastifyRequest {
  user: AuthUserPayload;
}

export async function authMiddleware(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const accessToken = req.cookies?.accessToken;
    const refreshToken = req.cookies?.refreshToken;
    if (!accessToken) {
      return reply.status(401).send({ message: "No access token provided" });
    }
    try {
      // Verify Access Token
      const decoded = jwt.verify(
        accessToken,
        config.security.jwtSecret
      ) as AuthUserPayload;

      req.user = decoded; // attach user
      return; // continue to route handler
    } catch (err: any) {
      if (err.name !== "TokenExpiredError") {
        // Invalid token, not just expired
        return reply.status(401).send({ message: "Invalid access token" });
      }
    }

    // Access token expired → try refresh token
    if (!refreshToken) {
      return reply.status(401).send({ message: "Refresh token missing" });
    }

    try {
      const decodedRefresh = jwt.verify(
        refreshToken,
        config.security.jwtRefreshSecret
      ) as AuthUserPayload;

      // Issue new tokens
      const newAccessToken = jwt.sign(
        { id: decodedRefresh.id, email: decodedRefresh.email },
        config.security.jwtSecret,
        { expiresIn: "15m" }
      );

      const newRefreshToken = jwt.sign(
        { id: decodedRefresh.id, email: decodedRefresh.email },
        config.security.jwtRefreshSecret,
        { expiresIn: "7d" }
      );

      // Set new tokens in cookies
      reply.setCookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 15 * 60, // 15 minutes
      });
      reply.setCookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      req.user = decodedRefresh;
      return; // continue
    } catch {
      return reply.status(401).send({ message: "Invalid refresh token" });
    }
  } catch (error) {
    return reply.status(500).send({ message: "Auth middleware error" });
  }
}
