import { TypedFastifyInstance } from "@/types/fastify.js";
import { Response } from "@/lib/response/response.js";
import { userExist } from "../queries/userExist.js";
import { generateOtp } from "../services/genterateOTP.js";
import { hashOtp } from "../services/hashOTP.js";
import { insertOTP } from "../queries/insertOTP.js";
import { sendEmail } from "../services/sendOTP.js";
import { otpEmailTemplate } from "@/lib/email/template.js";

interface RequestOtpSigninBody {
    email: string;
}

export async function getOtpSigninAPI(fastify: TypedFastifyInstance) {
    fastify.post(
        '/auth/request-otp-signin',
        async (request, reply) => {
            try {
                const { email } = request.body as RequestOtpSigninBody;

                const user = await userExist(email);
                if (!user) {
                    return reply.code(404).send(Response.error(404, "User not found"));
                }

                const otp = generateOtp();
                const otpHash = await hashOtp(otp);

                await insertOTP({ email, otpHash, type: "signin", expiresAt: new Date(Date.now() + 5 * 60 * 1000) });
                await sendEmail(email, "OTP for signin", otpEmailTemplate(otp)); 

                return reply.code(200).send(Response.success({ success: true }, 200, "OTP sent successfully"));
            } catch (error) {
                console.error(error);
                return reply.code(500).send(Response.error(500, "OTP send failed"));
            }
        }
    )
}