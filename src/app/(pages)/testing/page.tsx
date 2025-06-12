import React from "react";
import VerticalNavbar from "./../../../component/verticalNavbar";
import image3 from "../../../../public/levitating.jpg";
import ProductsCarousel from "@/component/productsCaraousel";
import Footer from "@/component/footer";
import { TypingAnimation } from "@/components/magicui/typing-animation";

const Hero = () => {
  return (
    <div>
      <div
        className="relative h-full flex flex-col bg-cover"
        style={{
          backgroundImage: `url(${image3.src})`,
        }}
      >
        {/* Top Header */}
        <div className="relative z-20 p-8 flex justify-center items-center">
          <div className="text-gray-700 font-bold text-3xl">ShopBot</div>
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
              <div className=" border-4 border-black space-y-3">
                <div className="space-y-6 ">
                  <h1 className="text-5xl lg:text-6xl xl:text-5xl font-bold text-gray-600 leading-tight">
                    Smart Shopping
                    <br />
                    <TypingAnimation className="ml-10  text-gray-900">with AI Assistant</TypingAnimation>
                  </h1>

                  <p className="text-sm text-gray-500 max-w-lg leading-relaxed">
                    Experience the future of shopping with our AI-powered
                    chatbot.
                    <br />
                    Get personalized recommendations and instant support.
                    <br />
                    Shop smarter, faster, and more efficiently.
                  </p>
                </div>

                <button className="group mt-1 bg-gray-900  text-white px-8 py-4 rounded-none font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
                  <span className="flex items-center tracking-wide">
                    START SHOPPING
                  </span>
                </button>
              </div>
            </div>

            <div className=" p-4 mt-4">
              <div className="mt-3">
                <h1 className="text-5xl lg:text-5xl xl:text-5xl font-bold text-gray-600 leading-tight">
                  AI-Powered
                  <br />
                  <span className="text-gray-600">Shopping Experience</span>
                </h1>

                <p className="text-sm text-gray-500 max-w-lg leading-relaxed">
                  Let our AI do the searching for you—find exactly what you need
                  in seconds.
                  <br />
                  From recommendations to instant support, we&apos;re here to make
                  shopping effortless.
                  <br />
                  Your personalized shopping journey starts here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product Carousel Section */}
      <div className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Featured Products
          </h2>
          <ProductsCarousel />
        </div>
      </div>

      <Footer/>
    </div>
  );
};

export default Hero;
