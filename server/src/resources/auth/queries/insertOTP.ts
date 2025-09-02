import { db } from "@/db";
import { otpCodes, otpTypeEnum } from "@/db/schema";

export interface InsertOtpInput {
  email: string;
  otpHash: string;
  type: "signup" | "signin";
  expiresAt: Date;
}

export async function insertOTP({ email, otpHash, type, expiresAt }: InsertOtpInput) {
  try {
    const result = await db.insert(otpCodes).values({
      email,
      otpHash,
      type: type as typeof otpTypeEnum.enumValues[number],
      expiresAt,
    }).returning({
      id: otpCodes.id,
      email: otpCodes.email,
      expiresAt: otpCodes.expiresAt,
    });

    return result[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
}
