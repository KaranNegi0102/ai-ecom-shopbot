"use client"

import {useState} from "react"

const ChatInput = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
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
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInput;