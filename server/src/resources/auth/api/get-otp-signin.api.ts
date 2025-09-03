import { TypedFastifyInstance } from "@/types/fastify";
import { Response } from "@/lib/response/response.js";
import { userExist } from "../queries/userExist";
import { generateOtp } from "../services/genterateOTP";
import { hashOtp } from "../services/hashOTP";
import { insertOTP } from "../queries/insertOTP";
import { sendEmail } from "../services/sendOTP";
import { otpEmailTemplate } from "@/lib/email/template";

interface RequestOtpSigninBody {
    email: string;
}

export async function getOtpSigninAPI(fastify: TypedFastifyInstance) {
    fastify.post(
        '/auth/request-otp-signin',
        {
            config: {
                public: true,
                rateLimit: {
                    max: 2, // max 2 requests
                    timeWindow: '1 minute',
                },
            },
        },
        async (request, reply) => {
            try {
                const { email } = request.body as RequestOtpSigninBody;

                const user = await userExist(email);
                if (!user) {
                    return reply.send(Response.error(400, "USER_NOT_FOUND"));
                }

                const otp = generateOtp();
                const otpHash = await hashOtp(otp);

                await insertOTP({ email, otpHash, type: "signin", expiresAt: new Date(Date.now() + 5 * 60 * 1000) });
                await sendEmail(email, "OTP for signin", otpEmailTemplate(otp)); //sends email

                return reply.send(Response.success({ success: true }, 200, "OTP sent successfully"));
            } catch (error) {
                console.error(error);
                return reply.send(Response.error(500, "Failed to send OTP"));
            }
        }
    )
}