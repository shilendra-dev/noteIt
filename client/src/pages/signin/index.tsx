import Input from "../../components/ui/atoms/Input";
import CustomButton from "../../components/ui/atoms/CustomButton";

export default function SignIn() {

  return (
    <div className="w-screen h-screen">
      <div className="h-full w-full flex">
        <div className="flex flex-1 h-full flex-col p-8">
          <h1 className="text-lg font-bold">HD</h1>
          <div className="flex flex-col px-20 flex-1 justify-center gap-6">
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl font-bold">Sign in</h1>
              <p className="text-sm text-gray-500">Please login to continue to your account</p>
            </div>

            <form className="flex flex-col gap-4">
              <Input id="email" label="Email" size="small" />
              <Input id="otp" label="OTP" size="small" />
              <p className="flex text-center text-sm text-blue-500 underline font-medium">Resend OTP</p>

              <CustomButton type="submit" size="large" variant="contained">
                Get OTP
              </CustomButton>
            </form>
            <p className="text-center text-sm text-gray-500">
              Need an account? <a href="/signup" className="text-blue-500 underline font-bold">Sign up</a>
            </p>
          </div>
        </div>
        <div className="w-4xl bg-amber-400 rounded-2xl mb-2 mr-2 mt-2 lg:block hidden"></div>
      </div>
    </div>
  );
}
