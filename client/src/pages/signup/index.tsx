import { Navigate } from "../../router";
import { useAuth } from "../../lib/auth/useAuth";
import SignUpForm from "../../features/signup/SignUpForm";
import SignUpImage from "../../features/signup/SignUpImage";
import topLogo from "../../assets/top-logo.png";

export default function SignUp() {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" />;

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row">
      {/* Left Side: Logo + Form */}
      <div className="flex flex-1 mt-16 sm:mt-0 lg:h-full flex-col p-4 sm:p-10 lg:p-14 lg:justify-center items-center lg:items-center">
        <img
          src={topLogo}
          alt="logo"
          className="w-16 mb-6 lg:mb-0 lg:absolute lg:top-6 lg:left-6"
        />
        <div className="flex flex-col w-full max-w-md px-4 sm:px-10 lg:px-20 gap-6">
          <div className="flex flex-col gap-2 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl font-bold">Sign up</h1>
            <p className="text-sm text-gray-500">
              Sign up to enjoy the feature of HD
            </p>
          </div>
          <SignUpForm />
          <p className="text-center lg:text-left text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/signin" className="text-blue-500 underline font-bold">
              Sign in
            </a>
          </p>
        </div>
      </div>

      {/* Right Side Image */}
      <SignUpImage />
    </div>
  );
}
