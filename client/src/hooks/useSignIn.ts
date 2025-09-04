import { useState } from "react";
import { getOtpSignin, verifyOtpSignin } from "../api/auth";
import { toast } from "react-hot-toast";

interface SignInFormValues {
    email: string;
    otp: number;
}

export function useSignIn() {
    const [loading, setLoading] = useState(false);
    const [isOtpRequested, setIsOtpRequested] = useState(false);

    const getOtp = async (email: string) => {
        setLoading(true);
        const response = await getOtpSignin({ email });
        if (response.success) {
            setIsOtpRequested(true);
            toast.success(response.data.message);
        } else {
            toast.error(response.error);
        }
        setLoading(false);
    };

    const signin = async ({ email, otp }: SignInFormValues) => {
        setLoading(true);
        const response = await verifyOtpSignin({ email, otp });
        if (response.success) {
            window.location.reload();
        } else {
            toast.error(response.error);
        }
        setLoading(false);
    };
    const handleGoogleSignIn = () => {
        try {
            window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
        } catch (error) {
            console.error(error);
        }
    };

    return {
        loading,
        isOtpRequested,
        handleGoogleSignIn,
        getOtp,
        signin,
    };
}
