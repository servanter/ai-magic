
import ImageComparisonSlider from "@/components/ImageComparisonSlider";
import UploadPreviewSection from "@/components/UploadPreviewSection";
import { imageConfigs } from "@/config/imageConfig";
import { getCurrentUser } from "@/lib/session";
import { checkStatus, getUsage } from "@/lib/usage/usage";
import { UserInfo } from "@/types/user";
import { notFound } from "next/navigation";

interface ToolPageProps {
  params: {
    toolName: string;
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  // 根据 toolName 匹配配置
  const config = imageConfigs.find(
    (item) => item.link === params.toolName
  );

  if (!config) {
    return notFound(); // 未匹配到配置时返回 404
  }

  const usage: number = (await getUsage()) as number;
  const user = (await getCurrentUser()) as UserInfo;

  // 获取用户当日剩余次数
  // Get the user's remaining count for the day
  let userUsageInfo = {
    role: 0,
    todayRemaining: 0,
    boostPackRemaining: 0,
    membershipExpire: 0,
    boostPackExpire: 0,
  };
  if (user && user.userId) {
    /**
     * 根据角色判断可使用的次数
     * 1、普通用户返回当日剩余次数，月会员返回当日剩余次数和过期时间
     * 2、加油包用户返回剩余次数和过期时间
     * 3、以上两条可同时展示
     *
     * Determine the number of times that can be used based on the role
     * 1. Ordinary users return the remaining number of times for the day, monthly members return the remaining number of times for the day and the expiration time
     * 2. Boost pack users return the remaining number of times and the expiration time
     * 3. The above two points can be displayed at the same time
     */
    userUsageInfo = await checkStatus({ userId: user.userId });
  }
  const remaining = userUsageInfo.todayRemaining;
  const membershipExpire = userUsageInfo.membershipExpire;
  const boostPackRemaining = userUsageInfo.boostPackRemaining;
  const boostPackExpire = userUsageInfo.boostPackExpire
    ? Math.floor(new Date().getTime() / 1000) + userUsageInfo.boostPackExpire
    : 0;

  const userBalance = {
    remaining,
    boostPackRemaining,
    membershipExpire,
    boostPackExpire,
  };

  return (
    <>
      <div className="flex max-full mx-auto flex-col justify-center py-0 px-4">
        <div className="flex flex-1 w-full flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-bold mt-20">
            <span className="custom-underline relative">AImage</span>
          </h1>

          <div className="mx-auto mb-[1.275rem] w-full max-w-[580px] text-lg tracking-[-0.2px] dark:text-gray-500 mt-8">
            <div className="relative mx-auto flex max-w-fit items-center justify-center rounded-[1.25rem] font-medium bg-transparent !important transition-shadow duration-500 overflow-hidden cursor-pointer">
              <div className="relative z-2 text-transparent bg-gradient-to-r from-[#40ffa2] via-[#4079ff] to-[#40ffa2] bg-[size:300%_100%] bg-clip-text animate-gradient">
                Generate image in seconds with AI — free, no sign-up required!
              </div>
            </div>
          </div>


          <ImageComparisonSlider config={config} />

          <UploadPreviewSection user={user} userBalance={userBalance} selectedImageIndex={config.type - 1} />


        </div>
      </div>

    </>
  );
}