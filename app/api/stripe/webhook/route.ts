import { ONE_DAY } from '@/lib/constants';
import redis from '@/lib/redis';
import { boostPack } from '@/lib/upgrade/upgrade';
import { clearTodayUsage } from '@/lib/usage/usage';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    // 验证 Stripe 签名
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Stripe Webhook 签名验证失败:', err);
    return NextResponse.json(
      { error: 'Webhook 签名验证失败' },
      { status: 400 }
    );
  }

  // 根据事件类型处理业务逻辑
  console.log('收到 Stripe 事件:', event.type);
  console.log('收到 Stripe 数据:', event.data.object);
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log('支付成功:', paymentIntent.id);
      const { userId, productId } = paymentIntent.metadata;
      console.log(`用户ID: ${userId}, 产品ID: ${productId}`);
      const user = await prisma.user.findUnique({
        where: { userId: userId.toString() },
        select: { userId: true, email: true, username: true },
      });
      if (productId && productId === 'prod_T8SB2KQsiFVbHs' && userId && userId.length > 0) {
        singlePayDeal(userId, paymentIntent.id)
      }
      if (!user) return NextResponse.json({ message: "Your account was not found" }, { status: 401 });
      break;
    case 'customer.subscription.created':
      const subscription = event.data.object as Stripe.Subscription;
      console.log('订阅创建成功:', subscription.id);
      console.log(`订阅用户ID: ${subscription.metadata.userId}, 订阅产品ID: ${subscription.metadata.productId}`);

      if (subscription.metadata.userId && subscription.metadata.productId) {
        await memberPayDeal(subscription.metadata.userId, subscription);
      }
      if (!subscription.metadata.userId) return NextResponse.json({ message: "Your account was not found" }, { status: 401 });
      break;
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('会话完成:', session.id);
      // 在这里执行会话完成后的业务逻辑
      break;
    default:
      console.log(`未处理的事件类型: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

const singlePayDeal = async (userId: string, paymentIntentId: string) => {
  try {

    const key = 'order::' + paymentIntentId
    const orderRedisRes = await redis.get(key)
    console.log('orderRedisRes', orderRedisRes);
    if (!orderRedisRes) {
      await redis.setex(key, ONE_DAY, paymentIntentId)    // 防止重复处理
      await boostPack({ userId })
    }
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log('single pay deal', e);
    return NextResponse.json({ message: 'single pay something wrong' }, { status: 500 });
  }
}

const memberPayDeal = async (userId: string, subscription: Stripe.Subscription) => {
  try {
    const key = 'order::' + subscription.id
    const orderRedisRes = await redis.get(key)
    console.log('orderRedisRes', orderRedisRes);
    if (!orderRedisRes) {
      await redis.setex(key, ONE_DAY, subscription.id)    // 防止重复处理

      // 订阅 subscription
      await prisma.user.update({
        where: { userId },
        data: {
          subscriptionId: `${subscription.id}`,
          customerId: `${subscription.customer}`,
          currentPeriodEnd: subscription.items.data[0].current_period_end,
        },
      });

      console.log('更新订阅', userId);
      // 重置今天的积分
      clearTodayUsage({ userId })

      console.log('充值积分', userId);
      return NextResponse.json({ status: 200 });
      // 处理订阅
      await boostPack({ userId })
    }
    return NextResponse.json({ status: 200 });
  } catch (e) {
    console.log('single pay deal', e);
    return NextResponse.json({ message: 'single pay something wrong' }, { status: 500 });
  }
}
