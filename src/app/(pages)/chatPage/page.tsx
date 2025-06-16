"use client";
import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import Navbar from "@/component/navbar";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ProductCard from "./ProductCard";
import ResetButton from "./ResetButton";
import axios from "axios";
import SponsorDiv from "@/component/productPage/SponsorDiv";
import ProductDetail from "./productDetail";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
  category: string;
};

type Message = {
  id: string;
  text: string | Product[];
  sender: "user" | "bot";
  timestamp: Date;
};

// Create a fixed initial timestamp
const INITIAL_TIMESTAMP = new Date("2024-01-01T00:00:00");

export default function ChatPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: INITIAL_TIMESTAMP,
    },
  ]);

  const getRandomProducts = (allProducts: Product[], count: number) => {
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/get_products`
        );
        const fetchedProducts = response.data.data;
        setAllProducts(fetchedProducts);
        const randomProducts = getRandomProducts(fetchedProducts, 100);
        setProducts(randomProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories
  const categories = [
    "all",
    ...new Set(allProducts.map((product) => product.category)),
  ];

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Get random products for the carousel
  const carouselProducts = getRandomProducts(allProducts, 5);

  const handleSendMessage = (text: string | Product[], isUser: boolean) => {
    const newMessage: Message = {
      id: Math.floor(Math.random() * 1000000).toString(),
      text,
      sender: isUser ? "user" : "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "initial",
        text: "Hello! How can I help you today?",
        sender: "bot",
        timestamp: INITIAL_TIMESTAMP,
      },
    ]);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-4 md:py-0">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 text-lg">Loading products...</p>
              <p className="text-gray-600 italic text-lg">
                This might take a little while as the server is currently in
                sleep mode and needs some time to wake up. Thank you for your
                patience.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-4 md:py-0">
        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
          {/* Product Recommendations */}
          <div className="w-full lg:w-full">
            <div className="bg-gray-100 rounded-lg p-4">
              <SponsorDiv products={carouselProducts} />

              <h3 className="text-5xl mt-19 font-semibold text-center  text-gray-700 mb-3">
                All Products
              </h3>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center pb-3 items-center gap-2 mb-12">
                {categories.map((category, index) => (
                  <React.Fragment key={category}>
                    <span
                      onClick={() => setSelectedCategory(category)}
                      className={`cursor-pointer hover:underline text-sm ${
                        selectedCategory === category
                          ? "font-semibold"
                          : "text-gray-600"
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </span>
                    {index < categories.length - 1 && (
                      <span className="text-gray-400">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 cursor-pointer lg:grid-cols-3 gap-4">
                {filteredProducts.map((product: Product) => (
                  <div
                    key={`${product.name}-${product.price}`}
                    onClick={() => handleProductClick(product)}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Modal */}
          {selectedProduct && (
            <ProductDetail
              selectedProduct={selectedProduct}
              onClose={handleCloseModal}
            />
          )}

          {/* Chat Window */}
          {isChatOpen && (
            <div className="fixed right-4  top-4 w-196 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 border-b flex justify-between  bg-gray-900 items-center">
                <h2 className="text-xl font-semibold text-white">
                  Chat Support
                </h2>
                <div className="flex items-center gap-2">
                  <ResetButton onReset={handleReset} />
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="text-white cursor-pointer hover:text-gray-700"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="h-[400px] overflow-y-auto p-4">
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
              </div>
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          )}

          {/* Floating Chat Button */}
          {!isChatOpen && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="fixed top-3 right-4 cursor-pointer bg-[#f9dfdf] text-black hover:text-white hover:bg-gray-900 p-3 flex gap-2 rounded-md shadow-lg transition-colors"
            >
              <MessageSquare size={24} />
              <span>Chat Assistant</span>
              
            </button>
            
          )}
        </div>
      </div>
    </div>
  );
}
