import { getCurrentUser } from "@/lib/session";
import { UserInfo } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// 初始化 Stripe 客户端
const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string);
console.log('NEXT_PUBLIC_STRIPE_SECRET_KEY==========', process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

/**
 * 创建 Stripe 结账会话
 * @param userId 用户ID
 * @param productId 产品ID
 * @param productName 产品名称
 * @returns Stripe 结账会话
 */
async function createSingleCheckoutSession(userId: string, productId: string, productName: string) {
  console.log('NEXT_PUBLIC_STRIPE_SECRET_KEY==========', process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'hkd',
        product_data: { name: productName },
        unit_amount: 400,
      },
      quantity: 1
    }],
    payment_intent_data: {
      metadata: {
        userId: userId,
        productId: productId,
      },
    },
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  });
}



/**
 * 创建 Stripe 结账会话
 * @param userId 用户ID
 * @param productId 产品ID
 * @param productName 产品名称
 * @returns Stripe 结账会话
 */
async function createMonthlyCheckoutSession(userId: string, productId: number, productName: string) {
  return await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'hkd',
        product_data: { name: productName },
        unit_amount: 800,
        recurring: {
          interval: 'month', // 订阅周期：每月
          // 可选：设置订阅持续时间，不设置则无限期
          interval_count: 12, // 12个月后自动结束
        },
      },
      quantity: 1
    }],
    subscription_data: {
      metadata: {
        userId: userId,
        productId: productId,
      },
    },
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  });
}

/**
 * 订阅接口
 * 处理用户的订阅请求，创建 Stripe 支付意向
 */
export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();
    console.log('NEXT_PUBLIC_STRIPE_SECRET_KEYaaaaa==========', process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
    let productName = 'Boost Payment';
    if (productId === 2) {
      productName = 'Member Payment';
    }

    const user = (await getCurrentUser()) as UserInfo;
    if (!user || !user.userId) {
      throw new Error("User not authenticated");
    }

    // 使用提取的方法创建结账会话
    const session = productId === 1 ? await createSingleCheckoutSession(user.userId, "prod_T8SB2KQsiFVbHs", productName) :
      await createMonthlyCheckoutSession(user.userId, productId, productName);

    console.log("创建的Stripe会话结果:", session);
    // 返回客户端密钥和支付意向ID
    return NextResponse.json({
      session_url: session.url,
      sessionId: session.id,
    });
  } catch (error: any) {
    console.error("订阅错误:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}
