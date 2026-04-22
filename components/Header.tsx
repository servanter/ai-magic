"use client";

import MainHeader from "@/components/MainHeader";
import UserAccountHeader from "@/components/UserAccountHeader";
import { UserInfo } from "@/types/user";
import { useState } from "react";

export default function Header({ user }: { user?: UserInfo }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-white/80 shadow-sm"
      style={{
        backdropFilter: "saturate(50%) contrast(2) blur(5px)",
      }}
    >
      <header className="flex justify-between items-center h-16 w-full px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <MainHeader />
          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-8 text-base text-zinc-700">
            <a href="/" className="hover:text-blue-500 transition-colors">Home</a>
            <a href="/#try-it-now" className="hover:text-blue-500 transition-colors">Try it now🔥</a>
            <a href="/#features" className="hover:text-blue-500 transition-colors">Features</a>
            <a href="/#upgrade" className="hover:text-blue-500 transition-colors">Pricing</a>
            <a href="/blog" className="hover:text-blue-500 transition-colors">Blog</a>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 text-zinc-700 hover:text-blue-500 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
          
          <UserAccountHeader
            user={{
              username: user?.username || "",
              avatar: user?.avatar || "",
              email: user?.email || "",
              role: user?.role || 0,
              membershipExpire: user?.membershipExpire,
            }}
          />
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-white/95 border-b shadow-lg backdrop-blur-sm">
          <nav className="flex flex-col px-4 py-3 gap-3">
            <a 
              href="/" 
              className="py-2 px-3 text-zinc-700 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </a>
            <a 
              href="/#try-it-now" 
              className="py-2 px-3 text-zinc-700 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Try it now🔥
            </a>
            <a 
              href="/#features" 
              className="py-2 px-3 text-zinc-700 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="/#upgrade" 
              className="py-2 px-3 text-zinc-700 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="/blog" 
              className="py-2 px-3 text-zinc-700 hover:text-blue-500 hover:bg-blue-50 rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
