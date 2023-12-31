"use client";

import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onClose } from "@/app/redux/features/isWishListOpen/isWishListOpenSlice";
import { onTransition } from "@/app/redux/features/forModalOpenTransition/forModalOpenTransition";
import {
  setFavoriteList,
  deleteFavoriteList,
} from "@/app/redux/features/userSession/userSessionSlice";

import Modal from "./Modal";
import Heading from "../Heading";

const FavoriteModal = () => {
  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector(
    (state) => state.isWishListOpenSlice.isOpen
  );
  const listingId = useAppSelector(
    (state) => state.isWishListOpenSlice.listingId
  );
  const wishListModalClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);

  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await toast.promise(
        fetch("/api/user/favorite", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            listingId,
          }),
        }),
        {
          pending: "Confirm property...",
          success: "Well done!",
          error: "Failed",
        }
      );
      const response = await res.json();

      if (res.status === 201) {
        dispatch(setFavoriteList(listingId!));
      }
      if (res.status === 202) {
        dispatch(deleteFavoriteList(listingId!));
      }
      dispatch(onTransition(false));
    } catch (err) {
      console.log("err", err);
      dispatch(onTransition(false));
    }
    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Are you sure you want to proceed with this operation?" />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={modalIsOpen}
      title="Your wishlists"
      actionLabel="Confirm"
      onClose={wishListModalClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      secondaryAction={wishListModalClose}
      secondaryActionLabel="Cancel"
    />
  );
};

export default FavoriteModal;
