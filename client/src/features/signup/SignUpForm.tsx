import Input from "../../components/ui/atoms/Input";
import CustomButton from "../../components/ui/atoms/CustomButton";
import { Loader } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useState } from "react";
import { getOtpSignup, verifyOtpSignup } from "../../api/auth";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";

interface SignUpFormValues {
  email: string;
  name: string;
  dob: any;
  otp: number;
}

export default function SignUpForm() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const { control, handleSubmit, register, formState: { errors }, getValues } = useForm<SignUpFormValues>({
    defaultValues: { name: "", email: "", dob: "" },
  });

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
      const response = await verifyOtpSignup({
        email: data.email,
        name: data.name,
        dob,
        otp: data.otp,
      });
      setUser(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: SignUpFormValues) => {
    if (isOtpRequested) signup(data);
    else getOtp(data);
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
    </form>
  );
}
