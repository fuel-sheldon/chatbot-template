import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useChatStore } from "../store/chatStore";

interface ChatBubbleProps {
  position: "bottom-right" | "bottom-left";
  theme: "light" | "dark";
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ position, theme }) => {
  const { isOpen, toggleChat } = useChatStore();

  const positionClasses =
    position === "bottom-right"
      ? "bottom-4 right-4 sm:bottom-6 sm:right-6"
      : "bottom-4 left-4 sm:bottom-6 sm:left-6";

  const themeClasses =
    theme === "dark"
      ? "bg-gray-800 text-white hover:bg-gray-700"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <motion.button
      onClick={toggleChat}
      className={`
        fixed ${positionClasses} z-50
        w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg
        flex items-center justify-center
        transition-colors duration-200
        ${themeClasses}
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0 }}
      animate={{ scale: isOpen ? 0 : 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <MessageCircle size={20} className="sm:w-6 sm:h-6" />
      </motion.div>
    </motion.button>
  );
};
