"use client";
import Image from "next/image";
import image1 from "../../../public/image1.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useState, useEffect } from "react";

interface Product {
  name: string;
  desc: string;
  image: string;
  price: number;
}

interface SponsorDivProps {
  products: Product[];
}

export default function SponsorDiv({ products }: SponsorDivProps) {
  // Get random products for display
  const getRandomProducts = (products: Product[], count: number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const featuredProducts = getRandomProducts(products, 3); // Get 5 random products
  const [currentIndex, setCurrentIndex] = useState(0);
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="py-10 px-4 md:px-8 lg:px-12 bg-gray-100">
      <div className="flex flex-col lg:flex-row bg-gray-800 rounded-2xl shadow-xl overflow-hidden items-center p-6 lg:p-16 mb-4 transform transition-all duration-500 hover:scale-[1.01]">
        {/* Left content - Product details */}
        <div className="w-full lg:w-1/3 text-center lg:text-left mb-10 lg:mb-0 lg:mr-16 animate-fade-in">
          <h2 className="text-2xl md:text-3xl text-gray-300 leading-tight tracking-tight mb-6">
            Premium Products
          </h2>
          <h2 className="text-5xl md:text-5xl text-white font-extrabold leading-tight tracking-tight mb-6">
            {featuredProducts[currentIndex]?.name || "Elevate Your Experience"}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed font-light">
            {featuredProducts[currentIndex]?.desc ||
              "Discover a curated selection of premium products, meticulously designed to blend innovation with unparalleled quality."}
          </p>
        </div>

        {/* Right content - Product carousel */}
        <div className="w-full lg:w-2/3 flex justify-center">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full max-w-xl"
            setApi={setApi}
          >
            <CarouselContent className="-ml-4">
              {featuredProducts.map((product, index) => (
                <CarouselItem key={index} className="pl-4">
                  <div className="relative h-96 w-full bg-gray-700 rounded-lg shadow-md overflow-hidden flex items-center justify-center p-6 border border-gray-600">
                    <Image
                      src={product.image || image1}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((product) => (
          <div
            key={`${product.name}-${product.price}`}
            className="p-8 flex flex-col items-center text-center bg-gray-800 rounded-xl shadow-md border border-gray-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative h-48 w-full mb-6 rounded-md overflow-hidden bg-gray-700 flex items-center justify-center p-4 border border-gray-600">
              <Image
                src={product.image || image1}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <h3 className="mt-2 text-2xl text-white font-bold tracking-tight line-clamp-1">
              {product.name}
            </h3>
            <p className="mt-2 text-gray-400 text-base leading-relaxed line-clamp-2">
              {product.desc}
            </p>
            <p className="mt-4 text-2xl text-white font-extrabold">
              ₹{product.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
