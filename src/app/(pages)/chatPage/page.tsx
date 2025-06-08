"use client";
import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import Navbar from "@/component/navbar";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ProductCard from "./ProductCard";
import ResetButton from "./ResetButton";
import axios from "axios";

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
        const response = await axios.get(
          "https://ecombackend2-ha8d.onrender.com/get_products"
        );
        const fetchedProducts = response.data.data;
        setAllProducts(fetchedProducts);
        const randomProducts = getRandomProducts(fetchedProducts, 100);
        setProducts(randomProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-4 md:py-8">
        <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
          {/* Product Recommendations */}
          <div className="w-full lg:w-full">
            <div className="bg-[#f9dfdf] rounded-lg p-4">
              <h3 className="text-3xl font-semibold text-center text-gray-800 mb-4">
                All Collections
              </h3>

              {/* Category Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md cursor-pointer text-sm font-medium transition-colors
                      ${
                        selectedCategory === category
                          ? "bg-[#2b2b2b] text-white"
                          : "bg-white text-gray-700 hover:bg-gray-300"
                      }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 cursor-pointer lg:grid-cols-4 gap-4">
                {filteredProducts.map((product: Product) => (
                  <ProductCard
                    key={`${product.name}-${product.price}`}
                    product={product}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Chat Window */}
          {isChatOpen && (
            <div className="fixed right-4  top-4 w-196 bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-4 border-b flex justify-between  bg-[#f9dfdf] items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  Chat Support
                </h2>
                <div className="flex items-center gap-2">
                  <ResetButton onReset={handleReset} />
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
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
              className="fixed bottom-2 right-4 bg-[#f9dfdf] text-black hover:text-white hover:bg-[#2b2b2b] p-3 flex gap-2 rounded-full shadow-lg transition-colors"
            >
              <MessageSquare size={24} /> 
              <span>ChatBot</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
