import Input from "../../components/ui/atoms/Input";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import CustomButton from "../../components/ui/atoms/CustomButton";
import topLogo from "../../assets/top-logo.png";
import { Loader } from "lucide-react";

import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { getOtpSignup, verifyOtpSignup } from "../../api/auth";

interface SignUpFormValues {
  email: string;
  name: string;
  dob: any;
  otp: number;
}

export default function SignUp() {
  //hook form
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: "",
      email: "",
      dob: "",
    },
  });

  //states
  const [loading, setLoading] = useState(false);
  const [isOtpRequested, setIsOtpRequested] = useState(false);

  const getOtp = async (data: SignUpFormValues) => {
    setLoading(true);
    try {
      await getOtpSignup({ email: data.email });
      setIsOtpRequested(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setLoading(true);
    try {
      await getOtpSignup({ email: getValues("email") });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (data: SignUpFormValues) => {
    setLoading(true);
    try {
      const dob = data.dob.toDate();
      await verifyOtpSignup({
        email: data.email,
        name: data.name,
        dob: dob,
        otp: data.otp,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: SignUpFormValues) => {
    if (isOtpRequested) {
      signup(data);
    } else {
      getOtp(data);
    }
  };

  return (
    <div className="w-screen h-screen">
      <img src={topLogo} alt="logo" className="fixed top-6 left-6 w-16" />
      <div className="h-full w-full flex">
        <div className="flex flex-1 h-full flex-col p-14">
          <div className="flex flex-col px-20 flex-1 justify-center gap-6">
            <div className="flex flex-col gap-2">
              <h1 className="text-3xl font-bold">Sign up</h1>
              <p className="text-sm text-gray-500">
                Sign up to enjoy the feature of HD
              </p>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Input
                id="name"
                label="Your Name"
                size="medium"
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name", { required: "Name is required" })}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Controller
                  name="dob"
                  control={control}
                  rules={{ required: "Date of birth is required" }}
                  render={({ field }) => (
                    <DatePicker
                      label="Date of Birth"
                      value={dayjs(field.value)}
                      onChange={field.onChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          size: "medium",
                          variant: "outlined",
                          error: !!errors.dob,
                          InputProps: {
                            sx: { borderRadius: "0.5rem" },
                          },
                        },
                      }}
                    />
                  )}
                />
              </LocalizationProvider>
              <Input
                id="email"
                label="Your Email"
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
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "OTP should be 6 digits & only numbers",
                      },
                    })}
                  />
                  <button
                    className="text-sm text-blue-500 underline font-medium flex"
                    onClick={() => resendOtp()}
                  >
                    Resend OTP
                  </button>
                  
                </>
              )}
              
              <CustomButton
                type="submit"
                onClick={handleSubmit(onSubmit)}
                size="large"
                variant="contained"
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : isOtpRequested ? (
                  "Sign Up"
                ) : (
                  "Get OTP"
                )}
              </CustomButton>
            </form>
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/signin" className="text-blue-500 underline font-bold">
                Sign in
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
