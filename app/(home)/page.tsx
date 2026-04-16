import { getCurrentUser } from "@/lib/session";
import { checkStatus, getUsage } from "@/lib/usage/usage";
import { UserInfo } from "@/types/user";
import HomePage from "./homePage";

export default async function Page() {
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "AImage",
            "url": "https://www.aimage.top",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.aimage.top/tools/{search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is AImage?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AImage is a free AI image and avatar generator that transforms your photos into stunning artistic styles — including cartoon, anime, cyberpunk, pixel art, CG, colored pencil, and more. No sign-up required to get started."
                }
              },
              {
                "@type": "Question",
                "name": "Is AImage really free to use?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! AImage offers free daily credits for all users without requiring an account. You can generate AI images immediately. Premium plans are available for higher usage limits and priority processing."
                }
              },
              {
                "@type": "Question",
                "name": "What image styles does AImage support?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "AImage supports 8 AI image styles: Cartoon (anime), Cyberpunk, CG (film-grade), Pixel Art, Colored Pencil, Old Photo Retouching, 1-Inch ID Photo, and Miniature Figurine. Each style is powered by advanced AI models."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to generate an AI image?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most AI image transformations complete within 10–30 seconds. Processing time may vary depending on image complexity and server load."
                }
              },
              {
                "@type": "Question",
                "name": "Can I use the generated images commercially?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Images generated with AImage can be used for personal projects, social media, and creative purposes. For commercial use, please review our terms of service or upgrade to a premium plan."
                }
              }
            ]
          })
        }}
      />
      <HomePage
        usage={usage}
        user={user}
        remaining={remaining}
        boostPackRemaining={boostPackRemaining}
        membershipExpire={membershipExpire}
        boostPackExpire={boostPackExpire}
      />
    </>
  );
}
