"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/hooks";
import { logout, fetchUserData } from "@/app/redux/slices/authSlice";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state: any) => state.auth);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const isProductPage = pathname === "/productPage";

  useEffect(() => {
    setMounted(true);
    dispatch(fetchUserData());
  }, [dispatch]);

  async function handleLogout() {
    try {
      const response = await axios.get("/api/auth/logout", {
        withCredentials: true,
      });
      if (response.data.success) {
        console.log("user logged out successfully");
        dispatch(logout());
        router.push("/");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  // Don't render auth-dependent content until after mounting
  const renderAuthLinks = () => {
    if (!mounted) return null;

    const linkClass = isProductPage
      ? "text-gray-200 hover:text-white px-3 py-2 rounded-md text-md font-medium"
      : "text-gray-700 hover:text-gray-300 px-3 py-2 rounded-md text-md font-medium";

    if (isLoggedIn) {
      return (
        <>
          <Link href="/profile" className={linkClass}>
            Profile
          </Link>
          <button onClick={handleLogout} className={linkClass}>
            Logout
          </button>
        </>
      );
    }

    return (
      <>
        <Link href="/login" className={linkClass}>
          Login
        </Link>
        <Link href="/register" className={linkClass}>
          Register
        </Link>
      </>
    );
  };

  return (
    <nav className={isProductPage ? "bg-gray-900" : "bg-white"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left side - Brand name */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className={`text-3xl font-bold ${
                isProductPage ? "text-white" : "text-gray-700"
              }`}
            >
              ShopBot
            </Link>
          </div>

          {/* Center - Navigation links */}
          <div className="hidden md:block flex-1">
            <div className="flex justify-center items-center space-x-4">
              <Link
                href="/"
                className={
                  isProductPage
                    ? "text-gray-200 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    : "text-gray-700 hover:text-gray-300 px-3 py-2 rounded-md text-md font-medium"
                }
              >
                Home
              </Link>
              <Link
                href="/aboutus"
                className={
                  isProductPage
                    ? "text-gray-200 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                    : "text-gray-700 hover:text-gray-300 px-3 py-2 rounded-md text-md font-medium"
                }
              >
                About Us
              </Link>
              {renderAuthLinks()}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isProductPage ? "text-white" : "text-gray-700"
              } hover:text-gray-300 focus:outline-none`}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden hidden" id="mobile-menu">
        <div
          className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${
            isProductPage ? "bg-gray-900" : "bg-white"
          }`}
        >
          <Link
            href="/"
            className={
              isProductPage
                ? "text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                : "text-gray-700 hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            Home
          </Link>
          <Link
            href="/about"
            className={
              isProductPage
                ? "text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                : "text-gray-700 hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
            }
          >
            About Us
          </Link>
          {mounted && (
            <>
              {isLoggedIn ? (
                <>
                  <Link
                    href="/profile"
                    className={
                      isProductPage
                        ? "text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        : "text-gray-700 hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className={
                      isProductPage
                        ? "text-gray-200 hover:text-white block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                        : "text-gray-700 hover:text-gray-300 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={
                      isProductPage
                        ? "text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        : "text-gray-700 hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className={
                      isProductPage
                        ? "text-gray-200 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        : "text-gray-700 hover:text-gray-300 block px-3 py-2 rounded-md text-base font-medium"
                    }
                  >
                    Register
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
