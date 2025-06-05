
type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}; 

const MessageBubble = ({ message }: { message: Message }) => {
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
        <p className="text-sm">{message.text}</p>
        <span className="text-xs opacity-70">
          {message.timestamp.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;