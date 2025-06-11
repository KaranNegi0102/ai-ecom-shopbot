import React from "react";
import Link from "next/link";

const VerticalNavbar = () => {
  return (
    <div className="absolute right-0 top-5 lg:pr-8 flex flex-col space-y-25  justify-center h-full">
      <Link
        href="/"
        className="text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-black text-center font-medium whitespace-nowrap -rotate-90 transform  "
      >
        Home
      </Link>
      <Link
        href="/chatPage"
        className="text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-black font-medium whitespace-nowrap -rotate-90 transform "
      >
        Products
      </Link>
      <Link
        href="/about"
        className="text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-black font-medium whitespace-nowrap -rotate-90 transform "
      >
        About Us
      </Link>
    </div>
  );
};

export default VerticalNavbar;
