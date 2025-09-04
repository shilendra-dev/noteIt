import type { TypedFastifyInstance } from "@/types/fastify.js";
import { Response } from "@/lib/response/response.js";
import { generateOtp } from "@/resources/auth/services/genterateOTP.js";
import { hashOtp } from "@/resources/auth/services/hashOTP.js";
import { insertOTP } from "../queries/insertOTP.js";
import { sendEmail } from "@/resources/auth/services/sendOTP.js";
import { otpEmailTemplate } from "@/lib/email/template.js";
import { userExist } from "../queries/userExist.js";

interface RequestOtpSignupBody {
    email: string;
}

export async function getOtpSignupAPI(fastify: TypedFastifyInstance) {
    fastify.post(
        '/auth/request-otp-signup',
        async (request, reply) => {
            try {
                const { email } = request.body as RequestOtpSignupBody;

                if(!email){
                    return reply.code(400).send(Response.error(400, "EMAIL_REQUIRED"));
                }

                const user = await userExist(email);
                if(user){
                    return reply.code(409).send(Response.error(409, "USER_ALREADY_EXISTS"));
                }

                const otp = generateOtp();
                const otpHash = await hashOtp(otp);
                await insertOTP({ email, otpHash, type: "signup", expiresAt: new Date(Date.now() + 5 * 60 * 1000) });
                
                await sendEmail(email, "OTP for signup", otpEmailTemplate(otp));

                return reply.code(200).send(Response.success({}, 200, "OTP sent successfully"));
            }catch(error){
                console.error(error);
                return reply.code(500).send(Response.error(500, "OTP_SEND_FAILED"));
            }
        },
    )
}