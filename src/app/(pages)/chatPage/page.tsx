"use client";

import React, { useState } from "react";
import Navbar from "@/component/navbar";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ProductCard from "./ProductCard";
import ResetButton from "./ResetButton";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: INITIAL_TIMESTAMP,
    },
  ]);

  const handleSendMessage = (text: string | Product[], isUser: boolean) => {
    const newMessage: Message = {
      id: Math.floor(Math.random() * 1000000).toString(),
      text,
      sender: isUser ? "user" : "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  // console.log("this is messages in chat", messages);

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

  // Get the latest product message
  const latestProductMessage = messages
    .filter((message) => Array.isArray(message.text))
    .pop();

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
              {latestProductMessage &&
                Array.isArray(latestProductMessage.text) && (
                  <div className="space-y-4">
                    {latestProductMessage.text.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
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
