'use client';

import React from 'react';
import TestimonialCarousel from '@/components/testimonials/TestimonialCarousel';

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">我们的服务</h1>
        
        {/* 其他内容可以放在这里 */}
        <div className="mb-16">
          <p className="text-lg text-center max-w-3xl mx-auto">
            我们提供专业的AI图像处理服务，包括老照片修复、黑白照片上色、照片增强等功能。
            使用最先进的人工智能技术，让您珍贵的回忆焕发新生。
          </p>
        </div>
        
        {/* 评价轮播图组件 */}
        <TestimonialCarousel />
      </div>
    </div>
  );
}