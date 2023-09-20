"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { useCallback, useMemo } from "react";
import { onOpen } from "@/app/redux/features/isLoginModalOpen/isLoginModalOpenSlice";
import {
  onOpen as onOpenWishList,
  setListingId,
} from "@/app/redux/features/isWishListOpen/isWishListOpenSlice";

interface HeartButtonProps {
  listingId: number;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId }) => {
  const token = useAppSelector(
    (state) => state.userSessionSlice.userData.authToken
  );
  const favList = useAppSelector(
    (state) => state.userSessionSlice.userFavoriteList
  );

  const dispatch = useAppDispatch();
  const loginModalOpen = useCallback(() => {
    dispatch(onOpen());
  }, [dispatch]);
  const setWishListModalOpen = useCallback(() => {
    dispatch(onOpenWishList());
  }, [dispatch]);
  const setWishListId = useCallback(() => {
    dispatch(setListingId(listingId));
  }, [dispatch, listingId]);
  const toggleFavorite = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!token) {
        return loginModalOpen();
      }
      setWishListModalOpen();
      setWishListId();
    },
    [loginModalOpen, setWishListId, setWishListModalOpen, token]
  );

  const isFavorite = useMemo(() => {
    return favList?.includes(listingId);
  }, [favList, listingId]);
  return (
    <div
      onClick={toggleFavorite}
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
        className={isFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
