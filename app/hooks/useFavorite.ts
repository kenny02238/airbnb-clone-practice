import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import { onOpen } from "../redux/features/isLoginModalOpen/isLoginModalOpenSlice";
import {
  onOpen as onOpenWishList,
  setListingId,
} from "@/app/redux/features/isWishListOpen/isWishListOpenSlice";
import { SafeListing } from "../types";
import { useCallback, useMemo } from "react";
interface useFavoriteParams {
  listingId: string;
}
const useFavorite = ({ listingId }: useFavoriteParams) => {
  const token = useAppSelector(
    (state) => state.userSessionSlice.userData.authToken
  );
  const favList = useAppSelector(
    (state) => state.userSessionSlice.userData.user?.favorites
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
    if (favList) {
      return favList.some((item: SafeListing) => item.id === listingId);
    }
    return false;
  }, [favList, listingId]);

  return { toggleFavorite, isFavorite };
};

export default useFavorite;
