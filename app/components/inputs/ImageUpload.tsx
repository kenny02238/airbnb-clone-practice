"use client";

import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { UseFormSetValue } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import { Dispatch, SetStateAction } from "react";
interface ImageUploadProps {
  onChange: UseFormSetValue<FieldValues>;
  value: string;
  setImg: Dispatch<SetStateAction<string>>;
  img: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  setImg,
  img,
}) => {
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
              absolute inset-0 w-full h-full object-cover"
          >
            <Image
              fill
              src={img}
              alt="upLoadImg"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
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
