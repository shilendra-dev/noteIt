import Input from "../../components/ui/atoms/Input";
import CustomButton from "../../components/ui/atoms/CustomButton";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Loader } from "lucide-react";
import { getOtpSignin, verifyOtpSignin } from "../../api/auth";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";

interface SignInFormValues {
  email: string;
  otp: number;
}

export default function SignInForm() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormValues>({ defaultValues: { email: "" } });

  const [loading, setLoading] = useState(false);
  const [isOtpRequested, setIsOtpRequested] = useState(false);

  const onSubmit = (data: SignInFormValues) => {
    if (isOtpRequested) signin(data);
    else getOtp(data);
  };

  const signin = async (data: SignInFormValues) => {
    setLoading(true);
    try {
      const response = await verifyOtpSignin({
        email: data.email,
        otp: data.otp,
      });
      setIsOtpRequested(true);
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getOtp = async (data: SignInFormValues) => {
    setLoading(true);
    try {
      await getOtpSignin({ email: data.email });
      setIsOtpRequested(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        label="Email"
        size="medium"
        error={!!errors.email}
        helperText={errors.email?.message}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email format",
          },
        })}
      />

      {isOtpRequested && (
        <>
          <Input
            id="otp"
            label="OTP"
            size="medium"
            error={!!errors.otp}
            helperText={errors.otp?.message}
            {...register("otp", { required: "OTP is required" })}
          />
          <p className="flex justify-center lg:justify-start text-sm text-blue-500 underline font-medium cursor-pointer">
            Resend OTP
          </p>
        </>
      )}

      <FormControlLabel control={<Checkbox />} label="Keep me logged in" />

      <CustomButton type="submit" size="large" variant="contained">
        {loading ? (
          <Loader className="animate-spin" />
        ) : isOtpRequested ? (
          "Sign In"
        ) : (
          "Get OTP"
        )}
      </CustomButton>
    </form>
  );
}
