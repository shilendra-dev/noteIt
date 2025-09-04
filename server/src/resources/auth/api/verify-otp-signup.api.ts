import { TypedFastifyInstance } from "@/types/fastify.js";
import { Response } from "@/lib/response/response.js";
import { fetchOTP } from "../queries/fetchOTP.js";
import { verifyOtp } from "../services/hashOTP.js";
import { deleteOTP } from "../queries/deleteOTP.js";
import { createUser } from "../queries/createUser.js";
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

                const dobDate = new Date(dob); 

                if (!email) {
                    return reply.code(400).send(Response.error(400, "EMAIL_REQUIRED"));
                }
                if (!dob) {
                    return reply.code(400).send(Response.error(400, "DOB_REQUIRED"));  
                }
                if (!name) {
                    return reply.code(400).send(Response.error(400, "NAME_REQUIRED"));
                }
                if (!otp) {
                    return reply.code(400).send(Response.error(400, "OTP_REQUIRED"));
                }

                const otpData = await fetchOTP({ email, type: "signup" });

                if (!otpData) {
                    return reply.code(409).send(Response.error(409, "EMAIL_OR_OTP_INVALID"));
                }

                const isOtpValid = await verifyOtp(otp, otpData.otpHash);

                if (!isOtpValid) {
                    return reply.code(409).send(Response.error(409, "OTP_INVALID"));
                }

                console.log(dobDate);

                // creating user
                const user = await createUser({ email, name, dob: dobDate });

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
                    maxAge: 60 * 60, // 60 minutes
                });

                reply.setCookie("refreshToken", refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60, // 7 days
                });

                return reply.code(200).send(Response.success({ user }, 200, "OTP verified successfully"));
            } catch (error) {
                console.error(error);
                return reply.code(500).send(Response.error(500, "OTP_VERIFY_FAILED"));
            }
        }
    )
}