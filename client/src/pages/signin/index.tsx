import { useAuth } from "../../lib/auth/useAuth";
import { Navigate } from "../../router";
import SignInForm from "../../features/signin/SignInForm";
import SignInImage from "../../features/signin/SignInImage";
import topLogo from "../../assets/top-logo.png";

export default function SignIn() {
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
            <h1 className="text-2xl sm:text-3xl font-bold">Sign in</h1>
            <p className="text-sm text-gray-500">
              Please login to continue to your account
            </p>
          </div>
          <SignInForm />
          <p className="text-center lg:text-left text-sm text-gray-500">
            Need an account?{" "}
            <a href="/signup" className="text-blue-500 underline font-bold">
              Sign up
            </a>
          </p>
        </div>
      </div>

      {/* Right Side Image */}
      <SignInImage />
    </div>
  );
}
