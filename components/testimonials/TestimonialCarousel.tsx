'use client';

import { Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// 评价数据类型
interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Michael Johnson',
    avatar: '/avatars/avatar-1.svg',
    rating: 5,
    date: '2025-09-20',
    text: 'I am extremely satisfied with this AI image processing tool. It restored my old photos to life with results exceeding my expectations!'
  },
  {
    id: 2,
    name: 'Emily Wilson',
    avatar: '/avatars/avatar-2.svg',
    rating: 5,
    date: '2025-09-18',
    text: 'I used this tool to colorize my grandmother\'s black and white photos. The results were very natural, and my whole family was touched.'
  },
  {
    id: 3,
    name: 'Robert Taylor',
    avatar: '/avatars/avatar-3.svg',
    rating: 4,
    date: '2025-09-15',
    text: 'The interface is simple to use, processing is fast, and restoration quality is excellent. Highly recommended for anyone needing old photo.'
  },
  {
    id: 4,
    name: 'Sarah Anderson',
    avatar: '/avatars/avatar-4.svg',
    rating: 5,
    date: '2025-09-12',
    text: 'I processed dozens of family old photos with this tool, and each one was restored perfectly. Thank you so much for this amazing tool!'
  },
  {
    id: 5,
    name: 'David Miller',
    avatar: '/avatars/avatar-5.svg',
    rating: 5,
    date: '2025-09-10',
    text: 'Professional AI restoration technology that brings my treasured historical photos back to life.'
  },
  {
    id: 6,
    name: 'Jennifer Lopez',
    avatar: '/avatars/avatar-6.svg',
    rating: 5,
    date: '2025-09-08',
    text: 'The AI enhancement feature is incredible! It brought clarity to my grandfather\'s wedding photos that I never thought possible.'
  },
  {
    id: 7,
    name: 'Thomas Wright',
    avatar: '/avatars/avatar-7.svg',
    rating: 4,
    date: '2025-09-05',
    text: 'As a photography enthusiast, I\'m impressed by the detail preservation in the restoration process. The colors are vibrant without looking artificial.'
  },
  {
    id: 8,
    name: 'Olivia Martinez',
    avatar: '/avatars/avatar-8.svg',
    rating: 5,
    date: '2025-09-03',
    text: 'I was skeptical at first, but this tool saved our damaged family photos after a flood. The results are nothing short of miraculous!'
  },
  {
    id: 9,
    name: 'William Chen',
    avatar: '/avatars/avatar-9.svg',
    rating: 5,
    date: '2025-08-30',
    text: 'The face enhancement feature is remarkable. It recognized and restored details in century-old portraits with amazing accuracy.'
  },
  {
    id: 10,
    name: 'Sophia Kim',
    avatar: '/avatars/avatar-10.svg',
    rating: 4,
    date: '2025-08-28',
    text: 'I use this tool professionally for my archive restoration business. Clients are consistently amazed by the transformation.'
  },
  {
    id: 11,
    name: 'James Wilson',
    avatar: '/avatars/avatar-11.svg',
    rating: 5,
    date: '2025-08-25',
    text: 'The batch processing feature saved me countless hours restoring my family\'s photo collection.'
  },
  {
    id: 12,
    name: 'Emma Thompson',
    avatar: '/avatars/avatar-12.svg',
    rating: 5,
    date: '2025-08-22',
    text: 'I\'m creating a family history book and this tool has been invaluable. The AI perfectly restored photos that were creased, faded and damaged.'
  }
];

const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleTestimonials, setVisibleTestimonials] = useState<Testimonial[]>([]);

  // 根据屏幕宽度决定显示的评价数量
  const getVisibleCount = () => {
    return 6; // 默认值
  };

  // 更新可见评价
  const updateVisibleTestimonials = () => {
    const visibleCount = getVisibleCount();
    const newVisibleTestimonials: Testimonial[] = [];

    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % testimonials.length;
      newVisibleTestimonials.push(testimonials[index]);
    }

    setVisibleTestimonials(newVisibleTestimonials);
  };

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      updateVisibleTestimonials();
    };

    window.addEventListener('resize', handleResize);
    updateVisibleTestimonials();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentIndex]);

  // 自动轮播
  useEffect(() => {
    const interval = setInterval(() => {
      // 保存当前滚动位置
      const scrollPosition = window.scrollY;

      handleNext();

      // 防止页面自动滚动到轮播位置
      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'auto' // 使用auto而不是smooth以避免用户察觉
        });
      }, 0);
    }, 2000); // 缩短轮播间隔时间为4秒

    return () => clearInterval(interval);
  }, [currentIndex]);


  // 下一个
  const handleNext = () => {
    // 保存当前滚动位置
    const scrollPosition = window.scrollY;

    setCurrentIndex((prevIndex) =>
      (prevIndex + getVisibleCount()) % testimonials.length
    );

    // 防止页面自动滚动到轮播位置
    setTimeout(() => {
      window.scrollTo({
        top: scrollPosition,
        behavior: 'auto'
      });
    }, 0);
  };

  // 渲染星级评分
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="w-full py-8 mt-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Customer Reviews</h2>
          <p className="text-slate-500">See what others are saying about our service</p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 overflow-hidden transition-all duration-500">
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-lg shadow-md border border-gray-100 p-8 transition-all duration-300 min-h-[220px]"
              >
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-left">{testimonial.name}</h3>
                    <div className="flex items-center">
                      {renderStars(testimonial.rating)}
                      <span className="ml-2 text-sm text-gray-500">{testimonial.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic text-left">&ldquo;{testimonial.text}&rdquo;</p>
              </div>
            ))}
          </div>

          {/* 指示器 - 根据可见数量计算页数 */}
          <div className="flex justify-center mt-6 gap-2">
            {Array(Math.ceil(testimonials.length / getVisibleCount())).fill(0).map((_, pageIndex) => {
              const visibleCount = getVisibleCount();
              const pageStartIndex = pageIndex * visibleCount;
              return (
                <button
                  key={pageIndex}
                  onClick={(e) => {
                    // 阻止默认行为
                    e.preventDefault();

                    // 保存当前滚动位置
                    const scrollPosition = window.scrollY;

                    // 设置新的索引
                    setCurrentIndex(pageStartIndex);

                    // 防止页面自动滚动到轮播位置
                    setTimeout(() => {
                      window.scrollTo({
                        top: scrollPosition,
                        behavior: 'auto'
                      });
                    }, 0);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${currentIndex >= pageStartIndex && currentIndex < (pageStartIndex + getVisibleCount())
                    ? 'bg-blue-600 w-6'
                    : 'bg-gray-300'
                    }`}
                  aria-label={`Go to page ${pageIndex + 1}`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCarousel;