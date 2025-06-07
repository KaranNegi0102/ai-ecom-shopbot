"use client";

import React from "react";

type Product = {
  name: string;
  desc: string;
  image: string;
  price: number;
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
        <div className="space-y-4">
          {message.text.map((product: Product) => (
            <div
              key={`${product.name}-${product.price}`}
              className="bg-white rounded-lg p-3 shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{product.desc}</p>
                  <p className="text-blue-600 font-bold mt-2">
                    ₹{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
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
            ? "bg-blue-600 text-white"
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
