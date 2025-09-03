import Input from "../../components/ui/atoms/Input";
import CustomButton from "../../components/ui/atoms/CustomButton";
import topLogo from "../../assets/top-logo.png";
import { FormControlLabel, Checkbox } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { getOtpSignin } from "../../api/auth";
import { Loader } from "lucide-react";
import { verifyOtpSignin } from "../../api/auth";

interface SignInFormValues {
  email: string;
  otp: number;
}

export default function SignIn() {
  //hook form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: {
      email: "",
    },
  });

  //states
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
      await verifyOtpSignin({ email: data.email, otp: data.otp });
      setIsOtpRequested(true);
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
    <div className="w-screen h-screen">
      <img src={topLogo} alt="logo" className="fixed top-6 left-6 w-16" />
      <div className="h-full w-full flex">
        <div className="flex flex-1 h-full flex-col p-14">
          <div className="flex flex-col px-20 flex-1 justify-center gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">Sign in</h1>
              <p className="text-sm text-gray-500">
                Please login to continue to your account
              </p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
              <Input
                id="email"
                label="Email"
                size="medium"
                error={!!errors.email}
                helperText={
                  errors.email?.message
                }
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
                    helperText={
                      errors.otp?.message
                    }
                    {...register("otp", {
                      required: "OTP is required",
                    })}
                  />

                  <p className="flex text-center text-sm text-blue-500 underline font-medium">
                    Resend OTP
                  </p>
                </>
              )}
              <FormControlLabel
                control={<Checkbox />}
                label="Keep me logged in"
              />

              <CustomButton
                type="submit"
                size="large"
                variant="contained"
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : isOtpRequested ? (
                  "Sign In"
                ) : (
                  "Get OTP"
                )}
              </CustomButton>
            </form>
            <p className="text-center text-sm text-gray-500">
              Need an account?{" "}
              <a href="/signup" className="text-blue-500 underline font-bold">
                Sign up
              </a>
            </p>
          </div>
        </div>
        <div className="w-3xl bg-amber-400 rounded-2xl mb-2 mr-2 mt-2 lg:block hidden overflow-hidden">
          <img
            src="/src/assets/image_wallpaper.jpg"
            alt="Background"
            className="w-full h-full object-cover "
          />
        </div>
      </div>
    </div>
  );
}
