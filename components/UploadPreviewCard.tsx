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
  selectedImageIndex?: number;
}

export function UploadPreviewCard({ onUpload, user, userBalance, selectedImageIndex = 0 }: UploadPreviewCardProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [currentUses, setCurrentUses] = useState(0);
  const [selectedIndex, setSelectedImageIndex] = useState<number>(selectedImageIndex);
  const [remainingCredits, setRemainingCredits] = useState(0);
  const [boostPackRemainingCredits, setBoostPackRemainingCredits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

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

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', imageConfigs[selectedIndex].type.toString());

    // 显示加载中的toast提示，设置为永久显示直到手动关闭
    const loadingToast = toast.loading('Generating...', {
      duration: Infinity // 设置为无限时长，只有手动调用dismiss才会消失
    });

    try {
      // 设置加载状态为true
      setIsLoading(true);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const result = await response.json();

      // 销毁加载中的toast
      toast.dismiss(loadingToast);
      if (result.code === 403) {
        toast.error(result.error || 'Insufficient boost pack balance. Please recharge.');
        return;
      }
      if (result.code !== 0) {
        toast.error('Upload fail, please try again');
        return;
      }

      console.log('Upload result++++++++++:', result);
      if (result && result.img) {
        setResultImage(result.img);
      }
      toast.success('Success');

    } catch (error) {
      console.error('Error uploading file:', error);
      // 销毁加载中的toast，显示错误提示
      toast.dismiss(loadingToast);
      toast.error('Upload fail, please try again');
    } finally {
      // 无论成功还是失败，都将加载状态设置为false
      setIsLoading(false);
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
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg border-t border-b border-gray-200 w-[1200px] mt-10">

      {/* 内容区域 */}
      <div className="flex gap-6 min-h-0">
        {/* 左侧上传区域 */}
        <div className="w-1/2 flex flex-col gap-4 min-h-0">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gray-600 text-left" id="try-it-now">Upload</h3>
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
              <p className="text-gray-500">Click or drag and drop files here to upload</p>
            )}
          </div>

          {/* 图片切换区域 */}
          <div className="flex flex-col gap-2 mt-4">
            <p className="text-sm text-gray-600 text-left">Choose Style</p>
            <div className="border-b border-gray-200 w-full"></div>
          </div>

          <div className="flex flex-wrap gap-4 mt-2 max-w-full z-0">
            {imageConfigs.map((image, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden cursor-pointer transition-transform relative z-0 ${selectedIndex === index ? 'ring-2 ring-purple-500' : ''}`}
                onClick={() => setSelectedImageIndex(index)}
              >
                <img
                  src={image.href}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center z-0">
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
            <span className="">Current Credits：   {boostPackRemainingCredits <= 0 ? 0 : boostPackRemainingCredits} + {remainingCredits <= 0 ? 0 : remainingCredits} (VIP)</span>
            <span className='h-3'>|</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="">Member Expire Time：
              {userBalance && userBalance.membershipExpire
                ? dayjs(userBalance.membershipExpire).format('YYYY-MM-DD HH:mm')
                : ''}
            </span>
          </div>

          <div className='w-full flex justify-between gap-4 '>
            <Button className='h-10 w-2/4 bg-gray-100 text-gray-800 hover:bg-gray-200 text-sm' onClick={triggerFileInput}>

              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Choose Image
            </Button>

            <Button className='h-10 w-2/4 bg-red-100 text-red-800 hover:bg-red-200 text-sm' onClick={handleSubmit}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Submit
            </Button>

          </div>

        </div>

        {/* 右侧预览区域 */}
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-gray-600 text-left">Result</h3>
            <div className="border-b border-gray-200 w-full"></div>

          </div>

          <div className="border border-dashed border-gray-300 p-2 shadow-inner flex items-center justify-center h-[450px] w-[80%] mx-auto mt-4 overflow-hidden">
            {isLoading ? (
              <div className="flex space-x-2 animate-pulse">
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              </div>
            ) : resultImage ? (
              <img
                src={resultImage}
                alt="处理结果"
                className="max-w-[100%] object-contain p-1 rounded-lg"
              />
            ) : (
              <img
                src={imageConfigs[selectedIndex].href}
                alt={imageConfigs[selectedIndex].name}
                className="max-w-[100%] object-contain p-1 rounded-lg"
              />
            )}
          </div>

        </div>
      </div>
    </div>
  );
}