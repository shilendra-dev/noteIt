export function otpEmailTemplate(otp: string, minutes = 5) {
    return `
      <div style="font-family: sans-serif; line-height: 1.5;">
        <h2>Verify your email</h2>
        <p>Your OTP code is:</p>
        <h1 style="letter-spacing: 3px;">${otp}</h1>
        <p>This code will expire in ${minutes} minutes.</p>
        <p>If you didn't request this, you can ignore this email.</p>
      </div>
    `;
}