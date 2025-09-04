import { apiCall } from "../utils/apiCall";

interface RequestOtpSignupBody {
    email: string;
}

interface RequestOtpSigninBody {
    email: string;
}

interface SignupBody {
    email: string;
    name: string;
    dob: Date;
    otp: number;
}

interface SigninBody {
    email: string;
    otp: number;
}

export const getOtpSignup = async (body: RequestOtpSignupBody) => {
    const data = await apiCall<{ message: string }>("post", "/auth/request-otp-signup", body);
    return data;
}

export const verifyOtpSignup = async (body: SignupBody) => {
    const data = await apiCall<{ message: string }>("post", "/auth/verify-otp-signup", body);
    return data;
}

export const getOtpSignin = async (body: RequestOtpSigninBody) => {
    const data = await apiCall<{ message: string }>("post", "/auth/request-otp-signin", body);
    return data;
}

export const verifyOtpSignin = async (body: SigninBody) => {
    const data = await apiCall<{ user: any, message: string }>("post", "/auth/verify-otp-signin", body);
    return data;
}

export const signOut = async () => {
    const data = await apiCall<{ message: string }>("post", "/auth/logout");
    return data;
}

export const googleOauth = async () => {
    const data = await apiCall<{ message: string }>("get", "/auth/google");
    return data;
}
