"use client";

import { useEffect } from "react";
import { useAppDispatch } from "../redux/hook";
import {
  setToken,
  setUser,
} from "../redux/features/userSession/userSessionSlice";
import { useSession } from "next-auth/react";
import { responseHandler } from "@/utils/responseHandler";
import { SafeReservation } from "../types";
import { setFavoriteList } from "../redux/features/userSession/userSessionSlice";
interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const { data } = useSession();

  const dispatch = useAppDispatch();
  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await fetch("/api/user/getToken");
        const response = await res.json();
        dispatch(setToken(response));
        dispatch(setUser(data?.customUser));
      } catch (err) {
        console.log(err);
      }
    };
    getToken();
  }, [data, dispatch]);

  // useEffect(() => {
  //   const fetchFavorite = async () => {
  //     const res = await fetch("/api/user/favorite");

  //     const response = await responseHandler(res);
  //     if (response) {
  //       const ids = response.map((item: SafeReservation) => item.id);
  //       dispatch(setFavoriteList(ids));
  //     }
  //   };
  //   fetchFavorite();
  // }, [dispatch]);
  return (
    <div
      className="
          max-w-[2520px] 
          mx-auto
          xl:px-20 
          md:px-10 
          sm:px-2 
          px-4
      "
    >
      {children}
    </div>
  );
};

export default Container;
