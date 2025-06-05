"use client";

import { useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
};

const ChatInput = ({
  onSendMessage,
}: {
  onSendMessage: (message: string | Product[], isUser: boolean) => void;
}) => {
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
          "https://maximum-sweeping-sloth.ngrok-free.app/send_query",
          {
            query: message,
          }
        );

        console.log("this is the response 1-> ", response.data.data);
        console.log("this is the response 2-> ", response.data);
        console.log("this is the response 3-> ", response);

        let datababa;
        if (Object.keys(response.data).length === 1) {
          datababa = response.data;
        } else {
          datababa = response.data.data;
        }

        onSendMessage(datababa, false);
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
    <form onSubmit={handleSubmit} className="flex gap-2 p-4 border-t">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default ChatInput;
