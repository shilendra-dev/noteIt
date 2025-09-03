import { TypedFastifyInstance } from "@/types/fastify.js";
import { Response } from "@/lib/response/response.js";
import { fetchOTP } from "../queries/fetchOTP.js";
import { verifyOtp } from "../services/hashOTP.js";
import { deleteOTP } from "../queries/deleteOTP.js";
import { fetchUserByEmail } from "../queries/fetchUserByEmail.js";
import { config } from "@/config/config.js";
import jwt from "jsonwebtoken";

interface VerifyOtpBody {
    email: string;
    otp: string;
}

export async function verifyOtpSigninAPI(fastify: TypedFastifyInstance) {
    fastify.post(
        '/auth/verify-otp-signin',
        {
            config: {
                public: true,
                ratelimit: false,
            },
        },
        async (request, reply) => {
            try {
                const { email, otp } = request.body as VerifyOtpBody;

                if (!email) {
                    return reply.send(Response.error(400, "Email is required"));
                }
                if (!otp) {
                    return reply.send(Response.error(400, "OTP is required"));
                }

                const user = await fetchUserByEmail(email);
                if (!user) {
                    return reply.send(Response.error(400, "User does not exist"));
                }

                const otpData = await fetchOTP({ email, type: "signin" });

                if (!otpData) {
                    return reply.send(Response.error(400, "email or otp is invalid"));
                }

                const isOtpValid = await verifyOtp(otp, otpData.otpHash); //verify otp
                if (!isOtpValid) {
                    return reply.send(Response.error(400, "OTP_INVALID"));
                }

                await deleteOTP(email); //delete otp

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
                    secure: true, //only true in production (https only)
                    sameSite: "none",
                    path: "/",
                    maxAge: 60 * 60, // 60 minutes
                });

                reply.setCookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true, //only true in production (https only)
                    sameSite: "none",
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60, // 7 days
                });

                return reply.send(Response.success({ user }, 200, "OTP verified successfully"));
            } catch (error) {
                console.error(error);
                return reply.send(Response.error(500, "Failed to verify OTP"));
            }
        }
    )
}