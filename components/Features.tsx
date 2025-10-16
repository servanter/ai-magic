"use client";

import Image from "next/image";
import { ReactCompareSlider } from "react-compare-slider";

const Features = () => {
  return (
    <div id="features" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-12">
        {/* 左侧内容 */}
        <div className="flex flex-col space-y-6 pl-8">
          <h2 className="text-4xl font-bold text-gray-900 text-left">Cartoon Avatar</h2>
          <p className="text-base leading-[2] text-gray-600 text-left">
            Provide a function for generating Japanese hand-drawn anime-style images, which precisely controls outline thickness, flat coloring and character details, fully retains the original subject's shape and core identification features, and meets the need for efficient and professional anime-style transformation.
          </p>
          <button
            className="w-fit rounded-md bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            onClick={() => {
              const element = document.getElementById('try-it-now');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Try it now
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="overflow-hidden rounded-lg shadow-lg w-full max-w-2xl h-[350px]">
            <ReactCompareSlider
              itemOne={
                <Image
                  src="/cases/1_old.jpeg"
                  alt=""
                  width={600}
                  height={350}
                  className="object-cover h-full w-full"
                />
              }
              itemTwo={
                <Image
                  src="/cases/1_new.jpeg"
                  alt=""
                  width={600}
                  height={350}
                  className="object-cover h-full w-full"
                />
              }
              className="rounded-lg"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-12">
        <div className="flex items-center justify-center">
          <div className="overflow-hidden rounded-lg shadow-lg w-full max-w-2xl h-[350px]">
            <ReactCompareSlider
              itemOne={
                <Image
                  src="/cases/2_old.jpeg"
                  alt=""
                  width={600}
                  height={350}
                  className="object-cover h-full w-full"
                />
              }
              itemTwo={
                <Image
                  src="/cases/2_new.jpeg"
                  alt=""
                  width={600}
                  height={350}
                  className="object-cover h-full w-full"
                />
              }
              className="rounded-lg"
            />
          </div>
        </div>

        <div className="flex flex-col space-y-6 pl-8">
          <h2 className="text-4xl font-bold text-gray-900 text-left">Old Photo Retouching</h2>
          <p className="text-base leading-[2] text-gray-600 text-left">
            Provide professional old photo restoration, handling B&W/color photos. For color ones, fix yellowing/fading/cast by original tone & keep natural skin tone, remove scratches/molds/noise, boost resolution to 300dpi+ while preserving aspect ratio, fill missing parts seamlessly, and retain original texture & era features.
          </p>
          <button
            className="w-fit rounded-md bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            onClick={() => {
              const element = document.getElementById('try-it-now');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Try it now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-12">
        {/* 左侧内容 */}
        <div className="flex flex-col space-y-6 pl-8">
          <h2 className="text-4xl font-bold text-gray-900 text-left">Pixel</h2>
          <p className="text-base leading-[2] text-gray-600 text-left">
            Provide pixel-style image generation function, compose with clear pixel blocks (matching 8/16-bit retro aesthetics), use retro colors without gradients, simplify subject outlines to show details via pixels, add pixel elements and retain the original subject's core shape and function.
          </p>
          <button
            className="w-fit rounded-md bg-purple-600 px-6 py-3 text-base font-medium text-white shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            onClick={() => {
              const element = document.getElementById('try-it-now');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Try it now
          </button>
        </div>

        <div className="flex items-center justify-center">
          <div className="overflow-hidden rounded-lg shadow-lg w-full max-w-2xl h-[320px]">
            <ReactCompareSlider
              itemOne={
                <Image
                  src="/cases/3_old.jpeg"
                  alt=""
                  width={600}
                  height={350}
                  className="object-contain h-full w-full"
                />
              }
              itemTwo={
                <Image
                  src="/cases/3_new.jpeg"
                  alt=""
                  width={600}
                  height={350}
                  className="object-contain h-full w-full"
                />
              }
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;