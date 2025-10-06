import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Message } from "../types";
import { useChatStore } from "../store/chatStore";

interface MessageItemProps {
  message: Message;
  theme: "light" | "dark";
}

export const MessageItem: React.FC<MessageItemProps> = memo(
  ({ message, theme }) => {
    const { updateMessageFeedback } = useChatStore();
    const isUser = message.sender === "user";

    const handleFeedback = useCallback(
      (feedback: "upvote" | "downvote") => {
        updateMessageFeedback(message.id, feedback);
      },
      [message.id, updateMessageFeedback]
    );

    const themeClasses =
      theme === "dark"
        ? {
            user: "bg-blue-600 text-white",
            bot: "bg-gray-700 text-white",
            container: "text-gray-100",
            feedback: "text-gray-400 hover:text-gray-200",
          }
        : {
            user: "bg-blue-500 text-white",
            bot: "bg-gray-100 text-gray-900",
            container: "text-gray-900",
            feedback: "text-gray-500 hover:text-gray-700",
          };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      >
        <div className={`max-w-[85%] sm:max-w-[80%] ${themeClasses.container}`}>
          <div
            className={`
            px-4 py-2 rounded-lg
            ${isUser ? themeClasses.user : themeClasses.bot}
          `}
          >
            {isUser ? (
              <p className="whitespace-pre-wrap break-words">
                {message.content}
              </p>
            ) : (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className="prose prose-sm max-w-none break-words"
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>

          {/* Feedback buttons for bot messages */}
          {!isUser && (
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleFeedback("upvote")}
                className={`
                p-1 rounded transition-colors
                ${
                  message.feedback === "upvote"
                    ? "text-green-500 bg-green-100"
                    : themeClasses.feedback
                }
              `}
                aria-label="Upvote this message"
                title="Upvote this message"
              >
                <ThumbsUp size={16} />
              </button>
              <button
                onClick={() => handleFeedback("downvote")}
                className={`
                p-1 rounded transition-colors
                ${
                  message.feedback === "downvote"
                    ? "text-red-500 bg-red-100"
                    : themeClasses.feedback
                }
              `}
                aria-label="Downvote this message"
                title="Downvote this message"
              >
                <ThumbsDown size={16} />
              </button>
            </div>
          )}

          {/* ✅ Display attached files */}
          {message.files && message.files.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.files.map((file, i) => (
                <a
                  key={i}
                  href={URL.createObjectURL(file.file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-500 hover:underline truncate"
                >
                  📎 {file.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    );
  }
);

MessageItem.displayName = "MessageItem";
