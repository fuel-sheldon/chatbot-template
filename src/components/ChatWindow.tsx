import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { FeedbackModal } from "./FeedbackModal";
import { useChatStore } from "../store/chatStore";

interface ChatWindowProps {
  botName: string;
  position: "bottom-right" | "bottom-left";
  allowUpload: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  botName,
  position,
  allowUpload,
}) => {
  const {
    isOpen,
    isFullscreen,
    theme,
    loadChatFromStorage,
    addMessage,
    messages,
  } = useChatStore();

  useEffect(() => {
    loadChatFromStorage();
  }, [loadChatFromStorage]);

  // Add welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addMessage({
          content: `Hi! I'm ${botName}. How can I help you today?`,
          sender: "bot",
        });
      }, 500); // Small delay for better UX
    }
  }, [isOpen, messages.length, addMessage, botName]);

  const positionClasses = isFullscreen
    ? "top-0 left-0 right-0 bottom-0"
    : position === "bottom-right"
    ? "bottom-4 right-4 sm:bottom-6 sm:right-6"
    : "bottom-4 left-4 sm:bottom-6 sm:left-6";

  const sizeClasses = isFullscreen
    ? "w-full h-full max-w-none max-h-none"
    : "w-[calc(100vw-2rem)] sm:w-96 max-w-sm h-[calc(100vh-8rem)] sm:h-[600px] max-h-[calc(100vh-2rem)]";

  const themeClasses =
    theme === "dark"
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200";

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`
              fixed ${positionClasses} z-40
              ${sizeClasses}
              ${
                isFullscreen ? "rounded-none" : "rounded-lg"
              } shadow-2xl border flex flex-col overflow-hidden
              ${themeClasses}
            `}
          >
            <ChatHeader botName={botName} />
            <MessageList />
            <MessageInput allowUpload={allowUpload} />
          </motion.div>
        )}
      </AnimatePresence>

      <FeedbackModal theme={theme} />
    </>
  );
};
