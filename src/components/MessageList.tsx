import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageItem } from "./MessageItem";
import { useChatStore } from "../store/chatStore";

export const MessageList: React.FC = () => {
  const { messages, isLoading, theme } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const themeClasses = theme === "dark" ? "bg-gray-800" : "bg-white";

  return (
    <div className={`flex-1 overflow-y-auto p-4 ${themeClasses}`}>
      <div className="space-y-4">
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-200 rounded-lg px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      <div ref={messagesEndRef} />
    </div>
  );
};
