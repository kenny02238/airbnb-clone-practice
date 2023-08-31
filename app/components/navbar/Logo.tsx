"use client";
import Image from "next/image";
const Logo = () => {
  return (
    <figure className="w-[100px] aspect-[100/31.25] relative">
      <Image
        alt="LOGO"
        className="hidden md:block cursor-pointer"
        fill
        sizes="(max-width: 1440px) 7vw, (max-width: 768px) 0vw"
        src="/images/logo.png"
      />
    </figure>
  );
};

export default Logo;
