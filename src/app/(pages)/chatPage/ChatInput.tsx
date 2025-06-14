"use client";

import React, { useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
  category: string;
};

type ChatInputProps = {
  onSendMessage: (message: string | Product[], isUser: boolean) => void;
};

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsLoading(true);
      // Send user message to chat
      onSendMessage(message, true);

      try {
        // Send query to API
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/send_query`,
          {
            query: message,
          }
        );

        console.log("this is the response 1-> ", response.data.data);
        console.log("this is the response 2-> ", response.data);
        console.log("this is the response 3-> ", response);

        let messageData;
        if (Object.keys(response.data).length === 1) {
          messageData = response.data;
        } else {
          messageData = response.data.data;
        }

        onSendMessage(messageData, false);
      } catch (error) {
        console.error("Error sending query:", error);
        onSendMessage(
          "Sorry, I couldn't process your request. Please try again.",
          false
        );
      } finally {
        setIsLoading(false);
        setMessage("");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t p-4 ">
      <div className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border text-black border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="rounded-lg bg-[#2b2b2b] px-4 py-2 text-white hover:bg-[#514e4e] hover:text cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
