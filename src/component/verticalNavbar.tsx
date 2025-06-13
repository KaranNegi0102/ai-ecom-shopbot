import React from "react";
import Link from "next/link";

const VerticalNavbar = () => {
  return (
    <div className=" absolute right-0 top-10 h-[70%] lg:pr-8 flex flex-col space-y-25  justify-center ">
      <Link
        href="/"
        className="text-gray-600 hover:text-gray-900  hover:text-shadow-lg/30  text-center font-medium whitespace-nowrap -rotate-90 transform  "
      >
        Home
      </Link>
      <Link
        href="/chatPage"
        className="text-gray-600 hover:text-gray-900  hover:text-shadow-lg/30  font-medium whitespace-nowrap -rotate-90 transform "
      >
        Products
      </Link>
      <Link
        href="/about"
        className="text-gray-600 hover:text-gray-900  hover:text-shadow-lg/30  font-medium whitespace-nowrap -rotate-90 transform "
      >
        About Us
      </Link>
    </div>
  );
};

export default VerticalNavbar;
