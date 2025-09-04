import Input from "../../components/ui/atoms/Input";
import CustomButton from "../../components/ui/atoms/CustomButton";
import { Loader } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import GoogleAuthButton from "../../components/ui/atoms/GoogleAuthButton";
import { OrSeparator } from "../../components/ui/atoms/OrSeperator";
import { useSignUp } from "../../hooks/useSignUp";

interface SignUpFormValues {
  email: string;
  name: string;
  dob: any;
  otp: number;
}

export default function SignUpForm() {
  const { control, handleSubmit, register, formState: { errors }, getValues } = useForm<SignUpFormValues>({
    defaultValues: { name: "", email: "", dob: "" },
  });

  const { getOtp, signup, handleGoogleSignUp, loading, isOtpRequested } = useSignUp();

  const resendOtp = () => {
    getOtp(getValues("email"));
  };

  const onSubmit = (data: SignUpFormValues) => {
    if (isOtpRequested) signup(data);
    else getOtp(data.email);
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
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
                  InputProps: { sx: { borderRadius: "0.5rem" } },
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
            type="button"
            className="text-sm text-blue-500 underline font-medium flex justify-center lg:justify-start"
            onClick={resendOtp}
          >
            Resend OTP
          </button>
        </>
      )}

      <CustomButton type="submit" size="large" variant="contained">
        {loading ? <Loader className="animate-spin" /> : isOtpRequested ? "Sign Up" : "Get OTP"}
      </CustomButton>
      <OrSeparator/>
      <GoogleAuthButton type="button" size="large" variant="outlined" onClick={handleGoogleSignUp}>
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google logo"
          className="w-5 h-5 mr-2"
        />
        Google Sign Up
      </GoogleAuthButton>
    </form>
  );
}
