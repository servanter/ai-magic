import MainHeader from "@/components/MainHeader";
import UserAccountHeader from "@/components/UserAccountHeader";
import { UserInfo } from "@/types/user";

export default function Header({ user }: { user?: UserInfo }) {
  return (
    <div
      className="fixed z-50 h-14 w-full border-b bg-white bg-opacity-60 first-letter:shadow-sm"
      style={{
        backdropFilter: "saturate(50%) contrast(2) blur(5px)",
      }}
    >
      <header className="flex justify-between items-center w-full mt-1 border-b-1 pb-0 sm:px-4 px-2">
        <div className="flex items-center gap-6">
          <MainHeader />
          <nav className="hidden sm:flex items-center pl-8 gap-8 text-lg text-zinc-700">
            <a href="/" className="hover:text-blue-500">Home</a>
            <a href="/#try-it-now" className="hover:text-blue-500">Try it now</a>
            <a href="/#features" className="hover:text-blue-500">Features</a>
            {/* <a href="/" className="hover:text-blue-500">Use Cases</a> */}
            <a href="/#upgrade" className="hover:text-blue-500">Pricing</a>
          </nav>
        </div>
        <UserAccountHeader
          user={{
            username: user?.username || "",
            avatar: user?.avatar || "",
            email: user?.email || "",
            role: user?.role || 0,
            membershipExpire: user?.membershipExpire,
          }}
        />
      </header>
    </div>
  );
}
