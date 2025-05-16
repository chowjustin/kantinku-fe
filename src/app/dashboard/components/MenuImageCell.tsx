"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import useEditMenuMutation from "@/app/hooks/useEditMenuMutation";

interface MenuImageCellProps {
  menuId: string;
  imageUrl: string | null;
}

export default function MenuImageCell({
  menuId,
  imageUrl,
}: MenuImageCellProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(imageUrl);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: updateMenuImage, isPending } = useEditMenuMutation({
    id: menuId,
  });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Ukuran gambar harus kurang dari 2MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Harap pilih file gambar");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    try {
      await updateMenuImage({ image: file });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className="relative group cursor-pointer w-16 h-12 bg-gray-100 rounded-md overflow-hidden"
        onClick={triggerFileInput}
      >
        {imagePreview ? (
          <div className="relative w-full h-full">
            <Image
              src={imagePreview}
              alt="Menu"
              fill
              className="object-cover"
              sizes="(max-width: 64px) 100vw, 64px"
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Camera size={16} className="text-gray-400" />
          </div>
        )}

        {(isUploading || isPending) && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Loader2 className="w-4 h-4 text-white animate-spin" />
          </div>
        )}

        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Camera className="w-4 h-4 text-white" />
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
