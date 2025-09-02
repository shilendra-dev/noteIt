import type { TypedFastifyInstance } from "@/types/fastify.js";
import { Response } from "@/lib/response/response.js";
import { generateOtp } from "@/resources/auth/services/genterateOTP.js";
import { hashOtp } from "@/resources/auth/services/hashOTP.js";
import { insertOTP } from "../queries/insertOTP";
import { sendEmail } from "@/resources/auth/services/sendOTP";
import { otpEmailTemplate } from "@/lib/email/template";
import { userExist } from "../queries/userExist";

interface RequestOtpSignupBody {
    email: string;
}

export async function getOtpSignupAPI(fastify: TypedFastifyInstance) {
    fastify.post(
        '/auth/request-otp-signup',
        {
            config: {
                public: true,
                ratelimit: false,
            },
        },
        async (request, reply) => {
            try {
                const { email } = request.body as RequestOtpSignupBody;

                if(!email){
                    return reply.send(Response.error(400, "Email is required"));
                }

                const user = await userExist(email);
                if(user){
                    return reply.send(Response.error(400, "User already exists"));
                }

                const otp = generateOtp();
                const otpHash = await hashOtp(otp);
                await insertOTP({ email, otpHash, type: "signup", expiresAt: new Date(Date.now() + 5 * 60 * 1000) });
                
                await sendEmail(email, "OTP for signup", otpEmailTemplate(otp));

                return reply.send(Response.success({}, 200, "OTP sent successfully"));
            }catch(error){
                console.error(error);
                return reply.send(Response.error(500, "Failed to send OTP"));
            }
        },
    )
}