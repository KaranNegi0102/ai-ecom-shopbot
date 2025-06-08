"use client";

import React from "react";
import Image from "next/image";

type Product = {
  id: number;
  name: string;
  desc: string;
  image: string;
  price: number;
  category: string;
};

type Message = {
  id: string;
  text: string | Product[] | { tool: string } | Product;
  sender: "user" | "bot";
  timestamp: Date;
};

const MessageBubble = ({ message }: { message: Message }) => {
  // console.log("this is message ->> ", message);

  // Format timestamp consistently
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const renderContent = () => {
    // Handle tool messages (text messages)
    if (typeof message.text === "object" && "tool" in message.text) {
      return <p className="text-sm">{message.text.tool}</p>;
    }

    // Handle string messages
    if (typeof message.text === "string") {
      return <p className="text-sm">{message.text}</p>;
    }

    // Handle product array messages
    if (Array.isArray(message.text) && message.text.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 cursor-pointer md:grid-cols-3 gap-4">
          {message.text.map((product: Product) => (
            <div
              key={`${product.name}-${product.price}`}
              className="bg-[#2b2b2b] border-1 border-black shadow-md mb-4 h-[400px]"
            >
              <div className="relative h-60 w-full border-b-1 border-black mb-2 bg-gray-100 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <h3 className="font-semibold text-center mt-[35px] text-white truncate px-2">
                {product.name}
              </h3>
              <p className="text-xs text-white text-center mb-2 line-clamp-2 px-2">
                {product.desc}
              </p>
              <p className="text-white text-center font-bold">
                ₹{product.price.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      );
    }

    // Fallback for empty or invalid messages
    return <p className="text-sm">No content to display</p>;
  };

  return (
    <div
      className={`flex ${
        message.sender === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          message.sender === "user"
            ? "bg-[#2b2b2b] text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {renderContent()}
        <span className="text-xs opacity-70 block mt-2">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
