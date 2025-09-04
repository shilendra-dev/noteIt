import Input from "../../components/ui/atoms/Input";
import CustomButton from "../../components/ui/atoms/CustomButton";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";
import GoogleAuthButton from "../../components/ui/atoms/GoogleAuthButton";
import { OrSeparator } from "../../components/ui/atoms/OrSeperator";
import { useSignIn } from "../../hooks/useSignIn";

interface SignInFormValues {
  email: string;
  otp: number;
}

export default function SignInForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormValues>({ defaultValues: { email: "" } });

  const { getOtp, signin, loading, isOtpRequested, handleGoogleSignIn } = useSignIn();

  const onSubmit = (data: SignInFormValues) => {
    if (isOtpRequested) signin(data);
    else getOtp(data.email);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
      <OrSeparator/>
      <GoogleAuthButton type="button" size="large" variant="outlined" onClick={handleGoogleSignIn}>
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google logo"
          className="w-5 h-5 mr-2"
        />
        Google Sign In
      </GoogleAuthButton>
    </form>
  );
}
