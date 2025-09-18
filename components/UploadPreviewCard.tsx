'use client';
import { Button } from '@/components/ui/button';
import { imageConfigs } from '@/config/imageConfig';
import { UserInfo } from "@/types/user";
import { UserBalance } from '@/types/userBalance';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';


interface UploadPreviewCardProps {
  onUpload?: (file: File) => void;
  user: UserInfo | null;
  userBalance?: UserBalance | null;
}

export function UploadPreviewCard({ onUpload, user, userBalance }: UploadPreviewCardProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [currentUses, setCurrentUses] = useState(0);
  const [remainingCredits, setRemainingCredits] = useState(0);
  const [boostPackRemainingCredits, setBoostPackRemainingCredits] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const newImages = Array.from(files);
    updatePreview(newImages[0]);
  };

  const updatePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    if (onUpload) onUpload(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };



  const handleSubmit = async () => {

    if (!user || !user.userId) {
      toast.error("Please login first");
      return;
    }

    if (!preview) {
      toast.error('请先上传图片');
      return;
    }

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast.error('未选择文件');
      return;
    }

    if (selectedImageIndex === null) {
      toast.error('请选择一种风格');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', imageConfigs[selectedImageIndex].type.toString());

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();
      console.log('Upload result:', result);
      toast.success('上传成功');
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('上传失败，请重试');
    }
  };


  const { remaining = 0, boostPackRemaining = 0 } = userBalance || {};

  useEffect(() => {
    const newRemaining = remaining - currentUses;
    const newBoostRemaining = boostPackRemaining - Math.max(0, currentUses - remaining);

    setRemainingCredits(Math.max(0, newRemaining));
    setBoostPackRemainingCredits(Math.max(0, newBoostRemaining));
  }, [remaining, boostPackRemaining, currentUses]);


  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg mt-6 w-[1200px]">
      {/* 组件标题 */}
      <h2 className="text-xl font-semibold text-gray-800 text-left">AI IMAGE</h2>

      {/* 内容区域 */}
      <div className="flex gap-6 min-h-0">
        {/* 左侧上传区域 */}
        <div className="w-1/2 flex flex-col gap-4 min-h-0">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gray-600 text-left">上传区域</h3>
            <div className="border-b border-gray-200 w-full"></div>
          </div>

          <div
            className="border-2 border-dashed min-h-[200px] border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors  flex flex-col items-center justify-center"
            onClick={triggerFileInput}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
              multiple
            />
            {preview ? (
              <img
                src={preview}
                alt="预览"
                className="max-h-80 max-w-full object-contain"
              />
            ) : (
              <p className="text-gray-500">点击或拖拽文件到此处上传</p>
            )}
          </div>

          {/* 图片切换区域 */}
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-sm text-gray-600 text-left">选择一种风格</p>
            <div className="border-b border-gray-200 w-full"></div>
          </div>

          <div className="flex gap-4 mt-2 max-w-full">
            {imageConfigs.map((image, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 relative z-10 ${selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''}`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image.href}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <div className="p-1 text-white text-xs bg-slate-500 rounded-sm">
                    {image.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-b border-gray-200 w-full"></div>
          <div className='flex gap-2 items-center text-gray-500 text-xs justify-center'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
            </svg>
            <span className="">当前积分：   {boostPackRemainingCredits <= 0 ? 0 : boostPackRemainingCredits} </span>
            <span className='h-3'>|</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="">会员到期时间：
              {userBalance && userBalance.membershipExpire
                ? dayjs(userBalance.membershipExpire).format('YYYY-MM-DD HH:mm')
                : '无'}
            </span>
          </div>

          <div className='w-full flex justify-between gap-4 '>
            <Button className='h-10 w-2/4 bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm' onClick={triggerFileInput}>

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              选择图片
            </Button>

            <Button className='h-10 w-2/4 bg-red-100 text-red-800 hover:bg-red-200 text-sm' onClick={handleSubmit}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              提交制作
            </Button>

          </div>

        </div>

        {/* 右侧预览区域 */}
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gray-600 text-left">制作结果</h3>
            <div className="border-b border-gray-200 w-full"></div>
          </div>

          <div className="flex items-center justify-center bg-gray-100 rounded-lg min-h-[300px]">
            <p className="text-gray-400">制作中...</p>
          </div>

        </div>
      </div>
    </div>
  );
}