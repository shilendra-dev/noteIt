import Input from "../../components/ui/atoms/Input";
import CustomButton from "../../components/ui/atoms/CustomButton";
import topLogo from "../../assets/top-logo.png";
import backgroundImage from "../../assets/image_wallpaper.jpg";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getOtpSignin } from "../../api/auth";
import { Loader } from "lucide-react";
import { verifyOtpSignin } from "../../api/auth";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { useAuth } from "../../lib/auth/useAuth";
import { Navigate } from "../../router";

interface SignInFormValues {
  email: string;
  otp: number;
}

export default function SignIn() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
    },
  });

  const { setUser } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isOtpRequested, setIsOtpRequested] = useState(false);

  const onSubmit = (data: SignInFormValues) => {
    if (isOtpRequested) {
      signin(data);
    } else {
      getOtp(data);
    }
  };

  const signin = async (data: SignInFormValues) => {
    setLoading(true);
    try {
      const response = await verifyOtpSignin({
        email: data.email,
        otp: data.otp,
      });
      console.log("Signin res: ", response);
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
    <div className="w-screen h-screen flex flex-col lg:flex-row">
      {/* Left Side (Form + Logo) */}
      <div className="flex flex-1 mt-16 sm:mt-0 lg:h-full flex-col p-4 sm:p-10 lg:p-14 lg:justify-center items-center lg:items-center">
        {/* Logo */}
        <img
          src={topLogo}
          alt="logo"
          className="w-16 mb-6 lg:mb-0 lg:absolute lg:top-6 lg:left-6"
        />

        <div className="flex flex-col w-full max-w-md px-4 sm:px-10 lg:px-20 gap-6">
          <div className="flex flex-col gap-2 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">Sign in</h1>
            <p className="text-sm text-gray-500">
              Please login to continue to your account
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  {...register("otp", {
                    required: "OTP is required",
                  })}
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

          <p className="text-center lg:text-left text-sm text-gray-500">
            Need an account?{" "}
            <a href="/signup" className="text-blue-500 underline font-bold">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right Side (Image for large screens only) */}
      <div className="hidden lg:block w-3xl bg-amber-400 rounded-2xl m-2 overflow-hidden">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
