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
    <div className="p-1">
      <div className="flex flex-row bg-gray-900 rounded-md justify-between items-center p-12">
        {/* Left content - Product details */}
        <div className="w-1/2 ml-13 space-y-4">
          <h2 className="text-4xl text-white font-bold [text-shadow:_2px_2px_0px_rgb(0_0_0_/_40%)]">
            {featuredProducts[currentIndex]?.name || "Premium Products"}
          </h2>
          <p className="text-gray-200">
            {featuredProducts[currentIndex]?.desc ||
              "Experience our premium collection of products."}
          </p>

          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Learn More
          </button>
        </div>

        {/* Right content - Product carousel */}
        <div className="w-1/2 flex justify-center">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent>
              {featuredProducts.map((product, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-80 w-full mb-2">
                    <Image
                      src={product.image || image1}
                      alt={product.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>

      <div className="flex flex-row p-4 gap-4">
        {featuredProducts.map((product) => (
          <div
            key={`${product.name}-${product.price}`}
            className="w-1/3 p-4 flex bg-[#0d082c] rounded-md flex-col items-center"
          >
            <div className="relative h-30 w-full mb-2">
              <Image
                src={product.image || image1}
                alt={product.name}
                fill
                className="object-contain p-2"
              />
            </div>
            <h3 className="mt-4 text-xl text-white font-bold">
              {product.name}
            </h3>
            <p className="mt-2 text-white text-center">{product.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
