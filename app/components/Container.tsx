"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  setToken,
  setUser,
} from "../redux/features/userSession/userSessionSlice";
import { useSession } from "next-auth/react";
interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const { data } = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getToken = async () => {
      const res = await fetch("/api/user/getToken");
      const response = await res.json();
      dispatch(setToken(response));
    };
    getToken();
    dispatch(setUser(data?.user));
  }, [data, dispatch]);
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
