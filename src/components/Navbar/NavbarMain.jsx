import React from "react";
import NavbarText from "./NavbarText";
import NavbarIcon from "./NavbarIcon";

const NavbarMain = () => {
  return (
    <div className="h-16 flex justify-around bg-gray-100 items-center">
      <div className="w-28 hidden md:block lg:block"></div>
      <NavbarText />
      <NavbarIcon />
    </div>
  );
};

export default NavbarMain;
