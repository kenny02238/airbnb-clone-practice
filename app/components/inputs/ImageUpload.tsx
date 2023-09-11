"use client";

import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { UseFormSetValue } from "react-hook-form";
import { FieldValues } from "react-hook-form";
interface ImageUploadProps {
  onChange: UseFormSetValue<FieldValues>;
  value: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  const [img, setImg] = useState<string>(
    "blob:http://localhost:3000/58fea745-f110-4f23-8e25-54c1b60c83f7"
  );

  const handlePicUpLoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectURL = URL.createObjectURL(file);
      setImg(objectURL);
      onChange("image", file);
    }
  };
  return (
    <div>
      <label
        className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            "
      >
        <TbPhotoPlus size={50} />
        <div className="font-semibold text-lg">Click to upload</div>
        {img && (
          <div
            className="
              absolute inset-0 w-full h-full"
          >
            <Image fill style={{ objectFit: "cover" }} src={img} alt="House" />
          </div>
        )}
        <input
          type="file"
          name="image"
          accept="image/*"
          className="hidden"
          onChange={handlePicUpLoad}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
