"use client";

import { useAppSelector , useAppDispatch } from "@/app/hooks/hooks";
import { useRouter } from "next/navigation";
import VerticalNavbar from "@/component/verticalNavbar";
import image3 from "../../public/levitating.jpg";
import ProductsCarousel from "@/component/productsCaraousel";
import Footer from "@/component/footer";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { useEffect } from "react";
import { fetchUserData } from "@/app/redux/slices/authSlice";



export default function Home() {
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);


  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push("/chatPage");
    } else {
      router.push("/login");
    }
  };

  return (
    <div>
      <div
        className="relative h-full flex flex-col bg-cover"
        style={{
          backgroundImage: `url(${image3.src})`,
        }}
      >
        {/* Top Header */}
        <div className="relative z-20 p-5 flex  shadow-full mx-auto">
          <div className="text-gray-700 font-bold text-4xl text-shadow-lg/20">
            ShopBot
          </div>
        </div>

        {/* Vertical Navigation (absolute position) */}
        <div className="z-30">
          <VerticalNavbar />
        </div>

        {/* Main Hero Content */}
        <div className="flex-1 flex h-full items-center  relative z-10">
          <div className="max-w-7xl  px-6 lg:px-2 w-full">
            <div className=" grid grid-cols-1 p-4 lg:grid-cols-2 gap-1 items-center">
              {/* Left content */}
              <div className=" space-y-5">
                <div>
                  <h1 className="text-5xl lg:text-6xl xl:text-5xl font-bold text-gray-600 leading-tight">
                    Smart Shopping
                    <br />
                    <TypingAnimation className="ml-10  text-gray-900">
                      with AI Assistant
                    </TypingAnimation>
                  </h1>

                  <p className="text-sm ml-15 text-gray-500 max-w-lg leading-relaxed">
                    Experience the future of shopping with our AI-powered
                    chatbot.
                    <br />
                    Get personalized recommendations and instant support.
                    <br />
                    Shop smarter, faster, and more efficiently with ShopBot.
                  </p>
                </div>

                <button
                  onClick={handleGetStarted}
                  className="group mt-1 ml-20 bg-gray-900 cursor-pointer rounded-md  text-white px-8 py-4 font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center tracking-wide">
                    {isLoggedIn ? "START SHOPPING" : "LOGIN & GET STARTED"}
                  </span>
                </button>
              </div>
            </div>

            <div className="p-4 mt-4">
              <div className="mt-3 space-y-6">
                <h1 className="text-5xl ml-30 lg:text-5xl xl:text-5xl font-bold text-gray-600 leading-tight">
                  AI-Powered
                  <br />
                  <span className="text-gray-600">Shopping Experience</span>
                </h1>

                <p className="text-sm ml-40  text-gray-500 max-w-lg leading-relaxed">
                  Let our AI do the searching for you—find exactly what you need
                  in seconds.
                  <br />
                  From recommendations to instant support, we&apos;re here to
                  make shopping effortless.
                  <br />
                  Your personalized shopping journey starts here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product Carousel Section */}
      <div className="w-full bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-700 mb-8 text-center">
            Products
          </h2>
          <ProductsCarousel />
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-700 mb-12 text-center">
            Why Choose ShopBot?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                AI-Powered Assistance
              </h3>
              <p className="text-gray-600">
                Get instant, intelligent responses to your shopping queries and
                personalized recommendations.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Find exactly what you&apos;re looking for in seconds with our
                advanced search capabilities.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="text-2xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Personalized Experience
              </h3>
              <p className="text-gray-600">
                Enjoy a shopping experience tailored to your preferences and
                needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
