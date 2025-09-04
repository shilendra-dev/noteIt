import logoIcon from "../../assets/logo-ico.png";

interface HeaderProps {
  onSignOut: () => void;
}

export default function Header({ onSignOut }: HeaderProps) {
  return (
    <div className="flex justify-between sm:flex-row w-full px-6 sm:px-10 lg:px-40 py-4 gap-3 sm:gap-0">
      <div className="flex items-center gap-2">
        <img src={logoIcon} alt="logo" className="w-5 h-5 sm:w-8 sm:h-8" />
        <h1 className="text-md sm:text-2xl font-semibold">Dashboard</h1>
      </div>
      <button
        className="underline text-blue-500 font-medium text-sm sm:text-lg hover:cursor-pointer"
        onClick={onSignOut}
      >
        Sign out
      </button>
    </div>
  );
}
