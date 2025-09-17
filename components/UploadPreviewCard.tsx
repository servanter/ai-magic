'use client';
import { Button } from '@/components/ui/button';
import { imageConfigs } from '@/config/imageConfig';
import { UserInfo } from "@/types/user";
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface UploadPreviewCardProps {
  onUpload?: (file: File) => void;
  user: UserInfo | null;
}

export function UploadPreviewCard({ onUpload, user }: UploadPreviewCardProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg mt-6 w-full">
      {/* 组件标题 */}
      <h2 className="text-xl font-semibold text-gray-800">上传预览卡片</h2>

      {/* 内容区域 */}
      <div className="flex gap-6 min-h-0">
        {/* 左侧上传区域 */}
        <div className="w-1/2 flex flex-col gap-4 min-h-0">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gray-600 text-left">上传区域</h3>
            <div className="border-b border-gray-200 w-full"></div>
          </div>

          <div
            className="border-2 border-dashed min-h-[200px] border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors jusetify-center flex flex-col items-center justify-center"
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
            <p className="text-sm text-gray-600">点击下方图片切换预览</p>
            <div className="border-b border-gray-200 w-full"></div>
          </div>

          <div className="flex gap-4 mt-4 max-w-full">
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

          <div className='w-full flex justify-between gap-4 mt-4'>
            <Button className='h-10 w-2/4 bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm' onClick={triggerFileInput}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 mr-2">
                <path fillRule="evenodd" d="M6.701 2.25c.577-1 2.02-1 2.598 0l5.196 9a1.5 1.5 0 0 1-1.299 2.25H2.804a1.5 1.5 0 0 1-1.3-2.25l5.197-9ZM8 4a.75.75 0 0 1 .75.75v3a.75.75 0 1 1-1.5 0v-3A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
              </svg>
              Select Image
            </Button>

            <Button className='h-10 w-2/4 bg-red-100 text-red-800 hover:bg-red-200 text-sm' onClick={handleSubmit}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4 mr-2">
                <path d="M8.75 6h-1.5V3.56L6.03 4.78a.75.75 0 0 1-1.06-1.06l2.5-2.5a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 1 1-1.06 1.06L8.75 3.56V6H11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.25v5.25a.75.75 0 0 0 1.5 0V6Z" />
              </svg>
              Submit Image
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