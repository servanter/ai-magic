"use client";

import { LanguageType } from "@/components/DropDown";
import Features from "@/components/Features";
import HowToUse from "@/components/HowToUse";
import Subscribe from "@/components/subscribe/Subscribe";
import TestimonialCarousel from "@/components/testimonials/TestimonialCarousel";
import { UploadPreviewCard } from "@/components/UploadPreviewCard";
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
      <h1 className="text-6xl font-bold mt-20">
        <span className="custom-underline relative">Transform Photos into Stunning AI Art Instantly</span>
      </h1>

      <div className="mx-auto mb-[1.275rem] w-full max-w-[580px] text-lg tracking-[-0.2px] dark:text-gray-500 mt-8">
        <div className="relative mx-auto flex max-w-fit items-center justify-center rounded-[1.25rem] font-medium bg-transparent !important transition-shadow duration-500 overflow-hidden cursor-pointer">
          <div className="relative z-2 text-transparent bg-gradient-to-r from-[#40ffa2] via-[#4079ff] to-[#40ffa2] bg-[size:300%_100%] bg-clip-text animate-gradient">
            Generate image in seconds with AI — free, no sign-up required!
          </div>
        </div>
      </div>

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

      <Features />

      <HowToUse />

      {/* FAQ Section */}
      <section className="w-full max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <div className="border rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-2">What is AImage?</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              AImage is a free AI image and avatar generator that transforms your photos into stunning artistic styles — including cartoon, anime, cyberpunk, pixel art, CG, colored pencil, and more. No sign-up required to get started.
            </p>
          </div>
          <div className="border rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-2">Is AImage really free to use?</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Yes! AImage offers free daily credits for all users without requiring an account. You can generate AI images immediately. Premium plans are available for higher usage limits and priority processing.
            </p>
          </div>
          <div className="border rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-2">What image styles does AImage support?</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              AImage supports 8 AI image styles: Cartoon (anime), Cyberpunk, CG (film-grade), Pixel Art, Colored Pencil, Old Photo Retouching, 1-Inch ID Photo, and Miniature Figurine. Each style is powered by advanced AI models.
            </p>
          </div>
          <div className="border rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-2">How long does it take to generate an AI image?</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Most AI image transformations complete within 10–30 seconds. Processing time may vary depending on image complexity and server load.
            </p>
          </div>
          <div className="border rounded-xl p-6">
            <h3 className="font-semibold text-lg mb-2">Can I use the generated images commercially?</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Images generated with AImage can be used for personal projects, social media, and creative purposes. For commercial use, please review our terms of service or upgrade to a premium plan.
            </p>
          </div>
        </div>
      </section>

      <Subscribe user={user} />
    </>
  );
}