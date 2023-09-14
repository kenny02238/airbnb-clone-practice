"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// import useFavorite from "@/app/hooks/useFavorite";
import { userData, googleUserData } from "@/app/types";

interface HeartButtonProps {
  listingId: string;
  currentUser?: userData | googleUserData | undefined;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  //   const { hasFavorited, toggleFavorite } = useFavorite({
  //     listingId,
  //     currentUser
  //   });

  return (
    <div
      onClick={() => {}}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={true ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
