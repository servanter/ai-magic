"use client";

import { ImageConfig } from "@/config/imageConfig";
import Image from "next/image";
import { ReactCompareSlider } from "react-compare-slider";

interface ImageComparisonSliderProps {
  config: ImageConfig;
}

export default function ImageComparisonSlider({
  config,
}: ImageComparisonSliderProps) {
  return (
    <>
      <div id="features" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-12">
          <div className="flex items-center justify-center">
            <div className="overflow-hidden rounded-lg shadow-lg w-full max-w-2xl ">
              <ReactCompareSlider
                itemOne={
                  <Image
                    src={config.old_image}
                    alt=""
                    width={600}
                    height={330}
                    className="object-cover h-full w-full"
                  />
                }
                itemTwo={
                  <Image
                    src={config.new_image}
                    alt=""
                    width={600}
                    height={330}
                    className="object-cover h-full w-full"
                  />
                }
                className="rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col space-y-6 pl-8">
            <h2 className="text-4xl font-bold text-gray-900 text-left">{config.name}</h2>
            <p className="text-base leading-[2] text-gray-600 text-left">
              {config.description}
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
      </div>
    </>
  );
}