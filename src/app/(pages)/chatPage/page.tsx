"use client";

import React, { useState } from "react";
import Navbar from "@/component/navbar";
import image from "../../../../public/headphone.jpg";
import image2 from "../../../../public/watch.jpg";
import { StaticImageData } from "next/image";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ProductCard from "./ProductCard";
import ResetButton from "./ResetButton";


type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
};


type Product = {
  id: number;
  name: string;
  price: number;
  image: StaticImageData; // Using Next.js StaticImageData type
  description: string;
};


export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);

  const [recommendedProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Wireless Headphones",
      price: 99.99,
      image: image,
      description: "High-quality wireless headphones with noise cancellation",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      image: image2,
      description: "Feature-rich smartwatch with health tracking",
    },
  ]);

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "I'm here to help you find the perfect products!",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Chat Window */}
          <div className="flex-1 bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Chat Support
              </h2>
            </div>
            <div className="h-[600px] overflow-y-auto p-4">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
            <ChatInput onSendMessage={handleSendMessage} />
          </div>

          {/* Product Recommendations */}
          <div className="w-80">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recommended Products
              </h3>
              {recommendedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-4">
              <ResetButton onReset={handleReset} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
