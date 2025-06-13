"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import image1 from "../../public/image1.jpg";
import image2 from "../../public/image2.jpg";
import image3 from "../../public/image3.jpg";
import image4 from "../../public/phone2.jpg";
import image5 from "../../public/headphone.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

interface Product {
  id: number;
  name: string;
  image: any;
}

const products: Product[] = [
  {
    id: 1,
    name: "MSI 540HZ Desktop",
    image: image1
  },
  {
    id: 2,
    name: "Iphone 14 Pro Max",
    image: image2
    
  },
  {
    id: 3,
    name: "Caravan Classic S1",
    image: image3
    
  },
  {
    id: 4,
    name: "Google Pixel 7 Pro",
    image: image4
    
  },
  {
    id: 5,
    name: "Hyper X Cloud Stinger",
    image: image5
    
  },
];

const ProductsCarousel = () => {
  const [api, setApi] = useState<any>();


  //first i thought to implement api for calling all products but its taking a lot of time for loading products (because am using free tier deployment it has a delay of 1 min ) that why am using demo images
  useEffect(() => {
    if (!api) return;
  }, [api]);

  return (
    <div className="w-full bg-gray-100 py-8">
      <Carousel
        setApi={setApi}
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
      >
        <CarouselContent>
          {products.map((product) => (
            <CarouselItem
              key={product.id}
              className="md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <div className="flex-none w-full bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                  <div className="relative h-56 w-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h3>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ProductsCarousel;
