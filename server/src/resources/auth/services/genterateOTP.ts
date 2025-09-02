import crypto from "crypto";

/**
 * Generate a secure 6-digit OTP
 */
export function generateOtp(length = 6) {
  try {// generate random number, pad with leading zeros if needed
    const otp = crypto.randomInt(0, Math.pow(10, length))
      .toString()
      .padStart(length, "0");
    return otp;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
