import React from "react";
import Image from "next/image";
import image1 from "../../../public/watch.jpg";

interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: any; // Using any for now since we're using imported images
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    desc: "Active noise cancellation, 30-hour battery life",
    price: 12999,
    image: image1,
    category: "headphones",
  },
  {
    id: 2,
    name: "Gaming Headset Pro",
    desc: "7.1 surround sound, RGB lighting",
    price: 8999,
    image: image1,
    category: "gaming",
  },
  {
    id: 3,
    name: "Sports Wireless Earbuds",
    desc: "Water-resistant, 8-hour battery",
    price: 4999,
    image: image1,
    category: "earbuds",
  },
  {
    id: 4,
    name: "Studio Monitor Speakers",
    desc: "Professional-grade audio production",
    price: 24999,
    image: image1,
    category: "speakers",
  },
];

export default function AllProducts() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className=" shadow-md mb-4 h-[300px] group transition-transform duration-300 hover:-translate-y-2"
        >
          <div className="relative h-60 w-full  border-black mb-2 bg-gray-100 transition-transform duration-300 group-hover:-translate-y-2">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-2"
            />
          </div>
          <h3 className="font-semibold text-center  text-black">
            {product.name}
          </h3>
          {/* <p className="text-sm text-white text-center mb-2">{product.desc}</p> */}
          <p className="text-black text-center text-sm">
            ₹{product.price.toLocaleString()}
          </p>
          {/* <div className="flex justify-center mt-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Add to Cart
            </button>
          </div> */}
        </div>
      ))}
    </div>
  );
}
