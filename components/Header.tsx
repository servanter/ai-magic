import MainHeader from "@/components/MainHeader";
import UserAccountHeader from "@/components/UserAccountHeader";
import { UserInfo } from "@/types/user";

export default function Header({ user }: { user?: UserInfo }) {
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-16 w-full border-b bg-white/80 shadow-sm"
      style={{
        backdropFilter: "saturate(50%) contrast(2) blur(5px)",
      }}
    >
      <header className="flex justify-between items-center h-full w-full px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <MainHeader />
          <nav className="hidden sm:flex items-center gap-8 text-base text-zinc-700">
            <a href="/" className="hover:text-blue-500 transition-colors">Home</a>
            <a href="/#try-it-now" className="hover:text-blue-500 transition-colors">Try it now🔥</a>
            <a href="/#features" className="hover:text-blue-500 transition-colors">Features</a>
            <a href="/#upgrade" className="hover:text-blue-500 transition-colors">Pricing</a>
            <a href="/blog" className="hover:text-blue-500 transition-colors">Blog</a>
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
