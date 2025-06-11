"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import image1 from "../../public/image1.jpg";
import image2 from "../../public/image2.jpg";
import image3 from "../../public/image3.jpg";
import image4 from "../../public/levitating.jpg";
import image5 from "../../public/headphones2.jpg";

interface Product {
  id: number;
  name: string;
  image: any; // Using any for StaticImageData
  price: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Headphones",
    image: image1,
    price: "$99.99",
  },
  {
    id: 2,
    name: "Wireless Earbuds",
    image: image2,
    price: "$149.99",
  },
  {
    id: 3,
    name: "Noise Cancelling",
    image: image3,
    price: "$199.99",
  },
  {
    id: 4,
    name: "Gaming Headset",
    image: image4,
    price: "$79.99",
  },
  {
    id: 5,
    name: "Studio Headphones",
    image: image5,
    price: "$129.99",
  },
];

const ProductsCarousel = () => {
  const [position, setPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => {
        const newPosition = prevPosition - 1.5;
        const itemWidth = 288; // w-72 (18rem) = 288px
        const totalWidth = itemWidth * products.length;

        // When we've scrolled past the first set of items
        if (newPosition <= -totalWidth) {
          setIsTransitioning(true);
          // Jump back to the start without animation
          setTimeout(() => {
            setPosition(0);
            setIsTransitioning(false);
          }, 50);
          return -totalWidth;
        }
        return newPosition;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-gray-100 py-8">
      <div className="relative" ref={containerRef}>
        <div
          className="flex space-x-6"
          style={{
            transform: `translateX(${position}px)`,
            width: "fit-content",
            transition: isTransitioning ? "none" : "transform 16ms linear",
          }}
        >
          {/* First set of products */}
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-none w-72 bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
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
                <p className="text-gray-600">{product.price}</p>
              </div>
            </div>
          ))}
          {/* Duplicate products for seamless loop */}
          {products.map((product) => (
            <div
              key={`duplicate-${product.id}`}
              className="flex-none w-72 bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
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
                <p className="text-gray-600">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsCarousel;
