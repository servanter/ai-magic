"use client";

import { LanguageType } from "@/components/DropDown";
import Github from "@/components/icons/GitHub";
import Twitter from "@/components/icons/Twitter";
import Subscribe from "@/components/subscribe/Subscribe";
import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";
import { UploadPreviewCard } from "@/components/UploadPreviewCard";
import { siteConfig } from "@/config/site";
import { formatNumber } from "@/lib/data";
import { UserInfo } from "@/types/user";
import { useEffect, useRef, useState } from "react";
import { Toaster } from "react-hot-toast";

interface HomePageProps {
  usage: number;
  user: UserInfo | null;
  remaining: number;
  boostPackRemaining: number;
  membershipExpire: number;
  boostPackExpire: number;
}

export default function HomePage({
  usage,
  user,
  remaining,
  boostPackRemaining,
  membershipExpire,
  boostPackExpire,
}: HomePageProps) {
  const [currentUses, setCurrentUses] = useState(0);
  const [remainingCredits, setRemainingCredits] = useState(0);
  const [boostPackRemainingCredits, setBoostPackRemainingCredits] = useState(0);
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState<LanguageType>("English");
  const answerRef = useRef<null | HTMLDivElement>(null);
  const userBalance = {
    remaining,
    boostPackRemaining,
    membershipExpire,
    boostPackExpire,
  };

  const scrollToAnswer = () => {
    if (answerRef.current !== null) {
      answerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (currentUses <= remaining) {
      setRemainingCredits(remaining - currentUses);
      setBoostPackRemainingCredits(boostPackRemaining);
    } else {
      setBoostPackRemainingCredits(
        boostPackRemaining - (currentUses - remaining)
      );
    }
  }, [remaining, boostPackRemaining, currentUses]);

  return (
    <>

      <div
        className="mx-auto mt-6 flex items-center justify-center space-x-5"
        style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
      >
        <a
          href="https://x.com/hongyanzha38268"
          target="_blank"
          rel="noopener noreferrer"
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-blue-200 mb-5"
        >
          <Twitter className="h-5 w-5" />
          <p className="text-sm font-semibold">Follow Me</p>
        </a>
        <a
          href="https://github.com/servanter"
          target="_blank"
          rel="noopener noreferrer"
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
        >
          <Github className="h-5 w-5" />
          <p className="text-sm font-semibold">Star on GitHub</p>
        </a>
      </div>
      <h1 className="sm:text-6xl text-4xl max-w-[858px] font-bold text-slate-900">
        {siteConfig.description}
      </h1>

      <p className="text-slate-500 mt-5">
        {formatNumber({ value: Number(usage) + currentUses })} Avatars formulas
        generated so far.
      </p>

      {/* 上传预览组件 */}

      <UploadPreviewCard user={user} userBalance={userBalance} />

      {/* 用户评价轮播图 */}
      <TestimonialCarousel />

      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 2000 }}
      />
      <hr className="h-px bg-gray-700 border-1" />

      {/* subscribe */}
      <Subscribe user={user} />
    </>
  );
}