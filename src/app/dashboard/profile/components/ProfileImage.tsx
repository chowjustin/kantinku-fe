"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import toast from "react-hot-toast";
import useEditUserMutation from "@/app/hooks/useEditUserMutation";

interface TenantProfileImageProps {
  imageUrl: string | null;
  isTenant: boolean;
}

export default function TenantProfileImage({
  imageUrl,
  isTenant,
}: TenantProfileImageProps) {
  if (!isTenant) return null;

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: updateUserMutation, isPending: updateUserPending } =
    useEditUserMutation({ isTenant: true });

  useEffect(() => {
    if (imageUrl) {
      if (imageUrl.startsWith("http")) {
        setImagePreview(imageUrl);
      }
    }
  }, [imageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      await updateUserMutation({ file: imageFile });
      setImageFile(null);
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Gagal mengunggah gambar");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Foto Profil Tenant</h2>

      <div className="flex flex-col items-center mb-4">
        <div
          className="relative group cursor-pointer w-64 h-48 bg-gray-100 rounded-lg overflow-hidden"
          onClick={triggerFileInput}
        >
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Profile"
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">
                <Camera size={48} />
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Camera className="w-8 h-8 text-white" />
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

      {imageFile && (
        <div className="flex justify-center">
          <Button
            onClick={handleImageUpload}
            disabled={isUploading || updateUserPending}
            className="flex items-center gap-2"
          >
            {isUploading || updateUserPending ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Mengunggah...
              </>
            ) : (
              "Simpan Foto"
            )}
          </Button>
        </div>
      )}

      <p className="text-sm text-gray-500 text-center mt-2">
        Klik pada gambar untuk mengganti foto profil. Ukuran maksimal 2MB.
      </p>
    </div>
  );
}
