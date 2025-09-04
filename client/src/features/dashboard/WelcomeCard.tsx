interface WelcomeCardProps {
  name?: string;
  email?: string;
}

export default function WelcomeCard({ name, email }: WelcomeCardProps) {
  return (
    <div className="flex flex-col gap-4 shadow-xl border border-gray-200 rounded-lg mt-6 sm:mt-10 p-6 sm:p-10 w-full">
      <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
        Welcome, {name}!
      </h1>
      <p className="text-sm sm:text-lg text-center sm:text-left">
        Email: {email}
      </p>
    </div>
  );
}
