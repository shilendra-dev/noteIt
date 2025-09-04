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
                    return reply.code(400).send(Response.error(400, "Email is required"));
                }
                if (!otp) {
                    return reply.code(400).send(Response.error(400, "OTP is required"));
                }

                const user = await fetchUserByEmail(email);
                if (!user) {
                    return reply.code(404).send(Response.error(404, "User not found"));
                }

                const otpData = await fetchOTP({ email, type: "signin" });

                if (!otpData) {
                    return reply.code(400).send(Response.error(400, "Email or OTP is invalid"));
                }

                const isOtpValid = await verifyOtp(otp, otpData.otpHash); 
                if (!isOtpValid) {
                    return reply.code(400).send(Response.error(400, "OTP is invalid"));
                }

                await deleteOTP(email); 

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

                return reply.code(200).send(Response.success({ user }, 200, "OTP verified successfully"));
            } catch (error) {
                console.error(error);
                return reply.code(500).send(Response.error(500, "OTP verify failed"));
            }
        }
    )
}