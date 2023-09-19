"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Logo = () => {
  const router = useRouter();
  return (
    <figure
      className="w-[100px] aspect-[100/31.25] relative"
      onClick={() => router.push("/")}
    >
      <Image
        alt="LOGO"
        className="hidden md:block cursor-pointer h-full w-full"
        fill
        src="/images/logo.png"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </figure>
  );
};

export default Logo;
