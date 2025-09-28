import { ONE_DAY } from '@/lib/constants';
import redis from '@/lib/redis';
import { boostPack } from '@/lib/upgrade/upgrade';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.text();
  console.log('body11111', body)
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
      if (productId === '1') {
        singlePayDeal(userId, paymentIntent.id)
      } else {

      }
      if (!user) return NextResponse.json({ message: "Your account was not found" }, { status: 401 });


      // 在这里执行支付成功后的业务逻辑
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