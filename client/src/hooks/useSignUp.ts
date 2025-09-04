import { useState } from "react";
import { getOtpSignup } from "../api/auth";
import { toast } from "react-hot-toast";
import { verifyOtpSignup } from "../api/auth";

interface SignUpFormValues {
  email: string;
  name: string;
  dob: any;
  otp: number;
}

export function useSignUp() {
  const [loading, setLoading] = useState(false);
  const [isOtpRequested, setIsOtpRequested] = useState(false);

  const getOtp = async (email: string) => {
    setLoading(true);
    const response = await getOtpSignup({ email });

    if (response.success) {
      toast.success(response.data.message);
      setIsOtpRequested(true);
    } else {
      toast.error(response.error);
    }

    setLoading(false);
  };

  const signup = async (data: SignUpFormValues) => {
    setLoading(true);
    try {
      const dob = data.dob.toDate(); // assuming dayjs/moment
      const response = await verifyOtpSignup({
        email: data.email,
        name: data.name,
        dob,
        otp: data.otp,
      });
      if (response.success) {
        window.location.reload();
      } else {
        throw new Error(response.error);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = () => {
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`;
    } catch (error) {
      console.error(error);
    }
  };

  return { getOtp, signup, loading, isOtpRequested, handleGoogleSignUp };
}
