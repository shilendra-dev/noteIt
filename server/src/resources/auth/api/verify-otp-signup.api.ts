import { TypedFastifyInstance } from "@/types/fastify";
import { Response } from "@/lib/response/response.js";
import { fetchOTP } from "../queries/fetchOTP";
import { verifyOtp } from "../services/hashOTP";
import { deleteOTP } from "../queries/deleteOTP";
import { createUser } from "../queries/createUser";
import { config } from "@/config/config.js";
import jwt from "jsonwebtoken";

interface VerifyOtpBody {
    email: string;
    otp: string;
    name: string;
    dob: Date;
}

export async function verifyOtpSignupAPI(fastify: TypedFastifyInstance) {
    fastify.post(
        '/auth/verify-otp-signup',
        {
            config: {
                public: true,
                ratelimit: false,
            },
        },
        async (request, reply) => {
            try {
                const { email, dob, name, otp } = request.body as VerifyOtpBody;

                const dobDate = new Date(dob); //standardizing dob

                if (!email) {
                    return reply.send(Response.error(400, "Email is required"));
                }
                if (!dob) {
                    return reply.send(Response.error(400, "DOB is required"));  
                }
                if (!name) {
                    return reply.send(Response.error(400, "Name is required"));
                }
                if (!otp) {
                    return reply.send(Response.error(400, "OTP is required"));
                }

                const otpData = await fetchOTP({ email, type: "signup" });

                if (!otpData) {
                    return reply.send(Response.error(400, "email or otp is invalid"));
                }

                const isOtpValid = await verifyOtp(otp, otpData.otpHash);

                if (!isOtpValid) {
                    return reply.send(Response.error(400, "OTP_Invalid"));
                }

                console.log(dobDate);

                // creating user
                const user = await createUser({ email, name, dob: dobDate });

                await deleteOTP(email);

                const accessToken = jwt.sign(
                    { id: user.id, email: user.email },
                    config.security.jwtSecret,
                    { expiresIn: "15m" }
                );

                const refreshToken = jwt.sign(
                    { id: user.id, email: user.email },
                    config.security.jwtRefreshSecret,
                    { expiresIn: "7d" }
                );

                reply.setCookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: config.server.environment === "production", //only true in production (https only)
                    sameSite: "strict",
                    path: "/",
                    maxAge: 15 * 60, // 15 minutes
                });

                reply.setCookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: config.server.environment === "production", //only true in production (https only)
                    sameSite: "strict",
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