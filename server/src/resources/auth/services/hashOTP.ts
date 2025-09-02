import bcrypt from "bcryptjs";

export async function hashOtp(otp: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(otp, salt);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function verifyOtp(otp: string, otpHash: string) {
  try {
    return await bcrypt.compare(otp, otpHash);
  } catch (error) {
    console.error(error);
    throw error;
  }
}