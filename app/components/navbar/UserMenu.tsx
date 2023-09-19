"use client";
import { useState, useCallback } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { onOpen as onRegisterOpen } from "@/app/redux/features/isRegisterModalOpen/isRegisterModalOpenSlice";
import { onOpen as onLoginOpen } from "@/app/redux/features/isLoginModalOpen/isLoginModalOpenSlice";
import { onOpenUpload } from "@/app/redux/features/isUploadToAirbnbModalOpen/isUploadToAirbnbModalOpenSlice";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
interface UserMenu {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenu> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const user = useAppSelector((state) => state.userSessionSlice.userData.user);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  const dispatch = useAppDispatch();
  const registerModalOpen = useCallback(() => {
    dispatch(onRegisterOpen());
  }, [dispatch]);
  const loginModalOpen = useCallback(() => {
    dispatch(onLoginOpen());
  }, [dispatch]);
  const uploadModalOpen = useCallback(
    () => dispatch(onOpenUpload()),
    [dispatch]
  );
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={user ? uploadModalOpen : loginModalOpen}
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
            <Avatar image={user?.image ? user?.image : null} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {!user ? (
              <>
                <MenuItem onClick={loginModalOpen} label="Login" />
                <MenuItem onClick={registerModalOpen} label="SignUp" />
              </>
            ) : (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push("/trips")}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push("/favorites")}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push("/reservations")}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push("/properties")}
                />
                <MenuItem label="Airbnb your home" onClick={uploadModalOpen} />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
