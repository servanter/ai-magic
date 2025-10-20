"use client";

import { UserInfo } from "@/types/user";
import { UserBalance } from "@/types/userBalance";
import { UploadPreviewCard } from "./UploadPreviewCard";

interface UploadPreviewSectionProps {
  user: UserInfo | null;
  userBalance: UserBalance | null;
  selectedImageIndex?: number;
}

export default function UploadPreviewSection({ user, userBalance, selectedImageIndex }: UploadPreviewSectionProps) {
  return (
    <div>
      {/* 上传预览组件 */}
      <UploadPreviewCard user={user} userBalance={userBalance} selectedImageIndex={selectedImageIndex} />
    </div>
  )
}