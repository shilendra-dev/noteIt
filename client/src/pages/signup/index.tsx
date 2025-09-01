import Input from "../../components/ui/atoms/Input";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
import { Dayjs } from "dayjs";
import CustomButton from "../../components/ui/atoms/CustomButton";

export default function SignUp() {
  const [dob, setDob] = useState<Dayjs | null>(null);

  return (
    <div className="w-screen h-screen">
      <div className="h-full w-full flex">
        <div className="flex flex-1 h-full flex-col p-8">
          <h1 className="text-lg font-bold">HD</h1>
          <div className="flex flex-col px-20 flex-1 justify-center gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold">Sign up</h1>
              <p className="text-sm text-gray-500">Sign up to enjoy the feature of HD</p>
            </div>

            <form className="flex flex-col gap-4">
              <Input id="name" label="Your Name" size="small" />
              <LocalizationProvider dateAdapter={AdapterDayjs}> 
                <DatePicker
                  label="Date of Birth"
                  value={dob}
                  onChange={(newValue) => setDob(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                      variant: "outlined",
                      InputProps: {
                        sx: {
                          borderRadius: "0.5rem", // makes edges more round
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
              <Input id="email" label="Your Email" size="small" />

              <CustomButton type="submit" size="large" variant="contained">
                Get OTP
              </CustomButton>
            </form>
            <p className="text-center text-sm text-gray-500">
              Already have an account? <a href="/signin" className="text-blue-500 underline font-bold">Sign in</a>
            </p>
          </div>
        </div>
        <div className="w-4xl bg-amber-400 rounded-2xl mb-2 mr-2 mt-2 lg:block hidden"></div>
      </div>
    </div>
  );
}
