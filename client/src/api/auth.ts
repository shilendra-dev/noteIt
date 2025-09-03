import axiosInstance from "../lib/axiosInstance";

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
    try {
        const response = await axiosInstance.post(`/auth/request-otp-signup`, body);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        console.error(message);
        throw new Error(message);
    }
}

export const verifyOtpSignup = async (body: SignupBody) => {
    try {
        const response = await axiosInstance.post(`/auth/verify-otp-signup`, body);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        console.error(message);
        throw new Error(message);
    }
}

export const getOtpSignin = async (body: RequestOtpSigninBody) => {
    try {
        const response = await axiosInstance.post(`/auth/request-otp-signin`, body);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        console.error(message);
        throw new Error(message);
    }
}

export const verifyOtpSignin = async (body: SigninBody) => {
    try {
        const response = await axiosInstance.post(`/auth/verify-otp-signin`, body);
        return response.data;
    } catch (error: any) {
        const message = error.response?.data?.message || error.message;
        console.error(message);
        throw new Error(message);
    }
}

