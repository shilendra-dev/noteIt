import { db } from "@/db/index.js";
import { otpCodes } from "@/db/schema.js";
import { eq, and, gt, desc } from "drizzle-orm";

interface FetchOTPParams {
  email: string;
  type: "signup" | "signin";
  includeExpired?: boolean;
}

export const fetchOTP = async ({ email, type, includeExpired = false }: FetchOTPParams) => {
  try {
    const conditions = [
      eq(otpCodes.email, email),
      eq(otpCodes.type, type),
    ];
    // do not include expired otp
    if (!includeExpired) {
      conditions.push(gt(otpCodes.expiresAt, new Date()));
    }

    const result = await db
      .select()
      .from(otpCodes)
      .where(and(...conditions))
      .orderBy(desc(otpCodes.createdAt))
      .limit(1);

    return result[0] || null; // returns null if no OTP matches
  } catch (error) {
    console.error(error);
    throw error;
  }
};