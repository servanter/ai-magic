import SubscribeCard from "@/components/subscribe/SubscribeCard";
import {
  BOOST_PACK_CREDITS,
  BOOST_PACK_EXPIRE
} from "@/lib/constants";
import { SubscribeInfo } from "@/types/subscribe";
import { UserInfo } from "@/types/user";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-hot-toast";

// 初始化 Stripe Promise
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export const subscribeInfo: SubscribeInfo = {
  free: {
    title: "Free",
    description: "Begin Your Exploration Journey",
    amount: 0,
    expireType: "day",
    possess: [
      `${process.env.NEXT_PUBLIC_COMMON_USER_DAILY_LIMIT_STR || "10"
      } free credits per day`,
      "Optional credits purchase",
    ],
  },
  membership: {
    isPopular: true,
    title: "Premium",
    description: "50x more credits than Free version",
    amount: 4.99,
    expireType: "month",
    possess: [
      "Up to 500 credits per day",
      "Optional credits purchase",
      "Early access to new features",
    ],
    buttonText: "Upgrade Now",
    mainClassName: "purple-500",
    buttonClassName: "bg-gradient-to-r from-pink-500 to-purple-500",
  },
  boostPack: {
    title: "Boost Pack",
    description: "Enough for a worry-free week",
    amount: Number(process.env.NEXT_PUBLIC_BOOST_PACK_PRICE || "0"),
    // expireType: "",
    possess: [
      "One-off buy",
      `${BOOST_PACK_CREDITS || "100"} credits ${BOOST_PACK_EXPIRE / 3600 / 24
      }-day validity`,
      "No auto-renewal after expiry",
    ],
    buttonText: `Get ${BOOST_PACK_CREDITS || "100"} credits`,
  },
};

export default function Subscribe({ user }: { user: UserInfo | null }) {
  const getStartFreeVersion = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 处理购买逻辑的函数
  async function handleBuy(productId: number) {
    if (!user || !user.userId) {
      toast.error("Please login first");
      return;
    }
    console.log("productId", productId);
    try {
      // 1. 调用后端API创建订阅会话
      const response = await fetch('/api/stripe/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "productId": productId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('订阅请求响应数据:', data);

      // 2. 获取Stripe实例
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe加载失败');
      }

      if (data.sessionId) {
        // 使用 Stripe 的 redirectToCheckout 方法重定向到结账页面
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId
        });
      } else {
        // 5. 显示API返回的数据
        console.log('没有sessionId，返回数据:', data);
        toast.error('Subscription initiation failed. Please try again.');
      }

    } catch (error) {
      console.error('订阅请求失败:', error);
    }
  }

  // 创建专门的处理函数，用于不同产品
  const buyMembership = () => handleBuy(2);
  const buyBoostPack = () => handleBuy(1);

  return (
    <div>
      <div>
        <h2 id="upgrade" className="text-4xl font-bold mb-8 text-zinc-800">UPGRADE</h2>
      </div>
      <section className="w-full py-0 flex items-center justify-center">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <SubscribeCard
              info={subscribeInfo.free}
              clickButton={getStartFreeVersion}
            />
            <SubscribeCard
              id="subscription-card"
              info={subscribeInfo.membership}
              clickButton={buyMembership}
            />
            <SubscribeCard
              id="bootsPack-card"
              info={subscribeInfo.boostPack}
              clickButton={buyBoostPack}
            />
          </div>
        </div>
      </section>

    </div>
  );
}
