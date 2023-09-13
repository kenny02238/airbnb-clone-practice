import React from "react";
import Image from "next/image";
const Avatar = ({ image }: { image: string | null }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={image ? image : "/images/placeholder.jpg"}
    />
  );
};

export default Avatar;
