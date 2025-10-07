import React from "react";
import { X, Minus, Square } from "lucide-react";
import { useChatStore } from "../store/chatStore";

interface ChatHeaderProps {
  botName: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ botName }) => {
  const { toggleChat, openFeedbackModal, toggleFullscreen, theme } =
    useChatStore();

  const themeClasses =
    theme === "dark"
      ? "bg-gray-900 text-white border-gray-700"
      : "bg-white text-gray-900 border-gray-200";

  const handleMinimize = () => {
    // For now, minimize will just close the chat
    // In a real implementation, this could minimize to a small bar
    toggleChat();
  };

  const handleMaximize = () => {
    // Toggle between popup and fullscreen mode
    toggleFullscreen();
  };

  const handleCloseWithFeedback = () => {
    // Open feedback modal - the modal will handle closing the chat after submission
    openFeedbackModal();
  };

  return (
    <div
      className={`flex items-center justify-between p-3 sm:p-4 border-b ${themeClasses}`}
    >
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs sm:text-sm font-semibold">
            {botName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-xs sm:text-sm md:text-base truncate">
            {botName}
          </h3>
          <p className="text-xs opacity-70">Online</p>
        </div>
      </div>

      <div className="flex items-center flex-shrink-0">
        {/* Minimize Button */}
        <button
          onClick={handleMinimize}
          className={`
            p-1.5 sm:p-2 hover:bg-opacity-20 transition-colors
            ${
              theme === "dark"
                ? "hover:bg-gray-600 text-gray-300 hover:text-white"
                : "hover:bg-gray-200 text-gray-600 hover:text-gray-800"
            }
          `}
          aria-label="Minimize chat window"
          title="Minimize"
        >
          <Minus size={14} className="sm:w-4 sm:h-4" />
        </button>

        {/* Maximize Button */}
        <button
          onClick={handleMaximize}
          className={`
            p-1.5 sm:p-2 hover:bg-opacity-20 transition-colors
            ${
              theme === "dark"
                ? "hover:bg-gray-600 text-gray-300 hover:text-white"
                : "hover:bg-gray-200 text-gray-600 hover:text-gray-800"
            }
          `}
          aria-label="Toggle fullscreen mode"
          title="Maximize"
        >
          <Square size={14} className="sm:w-4 sm:h-4" />
        </button>

        {/* Close Button (with feedback integration) */}
        <button
          onClick={handleCloseWithFeedback}
          className={`
            p-1.5 sm:p-2 hover:bg-opacity-20 transition-colors
            ${
              theme === "dark"
                ? "hover:bg-red-600 text-gray-300 hover:text-white"
                : "hover:bg-red-200 text-gray-600 hover:text-red-800"
            }
          `}
          aria-label="Close chat and provide feedback"
          title="Close (with feedback)"
        >
          <X size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};
