"use client";
import Image from "next/image";
const Logo = () => {
  return (
    <figure className="w-[100px] aspect-[100/31.25] relative">
      <Image
        alt="LOGO"
        className="hidden md:block cursor-pointer h-full w-full"
        fill
        src="/images/logo.png"
        sizes="100vw"
      />
    </figure>
  );
};

export default Logo;
