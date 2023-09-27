import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import Categories from "./Categories";
import { SafeUser } from "@/app/types";

interface NavBarProps {
  currentUser?: SafeUser | null;
}
const NavBar: React.FC<NavBarProps> = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm h-[180px]">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
        <Categories />
      </div>
    </div>
  );
};

export default NavBar;
