import { getCurrentUser } from "@/lib/session";
import { UserInfo } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// 初始化 Stripe 客户端
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

/**
 * 订阅接口
 * 处理用户的订阅请求，创建 Stripe 支付意向
 */
export async function POST(request: NextRequest) {
  try {
    const { productId } = await request.json();

    let productName = 'Boost Payment';
    if (productId === 2) {
      productName = 'Pro Payment';
    }

    const user = (await getCurrentUser()) as UserInfo;
    if (!user || !user.userId) {
      throw new Error("User not authenticated");
    }

    const session = await stripe.checkout.sessions.create({
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
          userId: user.userId, // 和上面保持一致
          productId: productId, // 使用请求中的productId，如果没有则使用默认值
        },
      },
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/stripe/success`,
    });

    // 返回客户端密钥和支付意向ID
    return NextResponse.json({
      session_url: session.url,
    });
  } catch (error: any) {
    console.error("订阅错误:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error.message },
      { status: 500 }
    );
  }
}