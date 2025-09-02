import type { TypedFastifyInstance } from "@/types/fastify.js";
import { Response } from "@/lib/response/response.js";
import { generateOtp } from "@/resources/auth/services/genterateOTP.js";
import { hashOtp } from "@/resources/auth/services/hashOTP.js";
import { insertOTP } from "../queries/insertOTP";

interface RequestOtpSignupBody {
    email: string;
}

export async function getOtpAPI(fastify: TypedFastifyInstance) {
    fastify.post(
        '/auth/request-otp-signup',
        {
            config: {
                public: true,
                ratelimit: false,
            },
        },
        async (request, reply) => {
            const { email } = request.body as RequestOtpSignupBody;
            const otp = generateOtp();

            const otpHash = await hashOtp(otp);

            await insertOTP({email, otpHash, type: "signup", expiresAt: new Date(Date.now() + 5 * 60 * 1000)});

            return reply.send(Response.success({ otp }, "OTP sent successfully", 200));
        },
    )
}