"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/component/navbar";
import { ArrowLeft } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
  category: string;
};

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productName = searchParams.get("name");
        if (!productName) return;

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/get_products`
        );
        const allProducts = response.data.data;
        const foundProduct = allProducts.find(
          (p: Product) => p.name === decodeURIComponent(productName)
        );
        setProduct(foundProduct || null);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="container bg-gray-900 mx-auto px-4">
      <Navbar />
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 mt-9 cursor-pointer text-gray-200 hover:text-white transition-colors"
      >
        <ArrowLeft size={20} />
        <span>Back to Products</span>
      </button>
      <div className="grid grid-cols-1 mt-12 md:grid-cols-2 gap-8">
        {/* Product Details */}
        <div className="flex ml-10 flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-100 hover:text-white">
              {product.name}
            </h1>
            <p className="text-sm text-gray-100 mt-2">
              Category: {product.category}
            </p>
          </div>

          <div className="text-2xl font-semibold text-gray-100">
            ₹{product.price.toLocaleString()}
          </div>

          <div className="border-t border-b border-gray-100 py-6">
            <h2 className="text-lg text-white font-semibold mb-2">
              Description
            </h2>
            <p className="text-gray-100">{product.desc}</p>
          </div>
        </div>

        {/* Product Image */}
        <div className="relative h-[400px] w-full bg-gray-100 rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-1"
            sizes="(max-width: 668px) 100vw, 50vw"
          />
        </div>
      </div>
    </div>
  );
}
