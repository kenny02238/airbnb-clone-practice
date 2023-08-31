"use client";
import { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useAppDispatch } from "@/app/redux/hook";
import { onOpen as onRegisterOpen } from "@/app/redux/features/isRegisterModalOpen/isRegisterModalOpenSlice";
import { onOpen as onLoginOpen } from "@/app/redux/features/isLoginModalOpen/isLoginModalOpenSlice";
import { onOpenUpload } from "@/app/redux/features/isUploadToAirbnbModalOpen/isUploadToAirbnbModalOpenSlice";
import { SafeUser } from "@/app/types";
interface UserMenu {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenu> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const dispatch = useAppDispatch();
  const registerModalOpen = useCallback(() => {
    dispatch(onRegisterOpen());
  }, [dispatch]);
  const loginModalOpen = useCallback(() => {
    return dispatch(onLoginOpen());
  }, [dispatch]);
  const uploadModalOpen = useCallback(
    () => dispatch(onOpenUpload()),
    [dispatch]
  );
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={currentUser ? uploadModalOpen : loginModalOpen}
          className=" hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {!currentUser ? (
              <>
                <MenuItem onClick={loginModalOpen} label="Login" />
                <MenuItem onClick={registerModalOpen} label="SignUp" />
              </>
            ) : (
              <>
                <MenuItem label="My trips" onClick={() => {}} />
                <MenuItem label="My favorites" onClick={() => {}} />
                <MenuItem label="My reservations" onClick={() => {}} />
                <MenuItem label="My properties" onClick={() => {}} />
                <MenuItem label="Airbnb your home" onClick={uploadModalOpen} />
                <hr />
                <MenuItem label="Logout" onClick={() => {}} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
