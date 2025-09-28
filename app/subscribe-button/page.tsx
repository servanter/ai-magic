'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

// 初始化 Stripe Promise
const stripePromise = loadStripe("pk_test_51SAQlhEW767oU6bZdS3QoYabnWqe5dAz9JieaBbA8k1SIYRAlx5ASWrC9IKSiDhQjBee7hN5hS8YQreBFmGePazi00tM1Jhbli");

export default function SubscribeButtonPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const handleSubscribe = async () => {
    console.log('点击了订阅按钮');
    try {
      setLoading(true);
      setResult(null);

      // 1. 调用后端API创建订阅会话
      const response = await fetch('/api/stripe/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
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

      // 3. 如果API返回了sessionId，重定向到Stripe Checkout页面
      if (data.sessionId) {
        const { error } = await stripe.redirectToCheckout({
          sessionId: data.sessionId
        });

        window.location.href = data.session_url;

        if (error) {
          throw new Error(error.message);
        }
      } else {
        // 5. 显示API返回的数据
        setResult(JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.error('订阅请求失败:', error);
      setResult(`错误: ${error instanceof Error ? error.message : '未知错误'}`);
    } finally {
      setLoading(false);
    }
  };

  // 导入支付表单组件

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center w-full max-w-2xl px-4">
        <h1 className="text-2xl font-bold mb-6">订阅按钮示例</h1>

        <button
          onClick={() => {
            console.log('按钮被点击');
            handleSubscribe();
          }}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 disabled:opacity-50"
        >
          {loading ? '处理中...' : '点击订阅服务'}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg max-w-lg mx-auto overflow-auto">
            <pre className="text-sm text-gray-800">{result}</pre>
          </div>
        )}

      </div>
    </div>
  );
}