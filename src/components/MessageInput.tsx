import React, { useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Send, Paperclip, X } from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { generateBotResponse, validateFile } from "../utils";
import { FILE_CONSTRAINTS, ERROR_MESSAGES } from "../constants";

interface MessageInputProps {
  theme: "light" | "dark";
  allowUpload?: boolean;
}

interface FormData {
  message: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  theme,
  allowUpload = true,
}) => {
  const {
    addMessage,
    setLoading,
    uploadedFiles,
    clearFiles,
    addFile,
    removeFile,
  } = useChatStore();
  const { register, handleSubmit, reset, watch } = useForm<FormData>();
  const messageValue = watch("message", "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(event.target.files || []);

      files.forEach((file) => {
        const validation = validateFile(file);
        if (validation.valid) {
          if (uploadedFiles.length < FILE_CONSTRAINTS.MAX_FILES) {
            addFile(file);
          } else {
            // Better error handling - could be replaced with toast notification
            console.warn(ERROR_MESSAGES.MAX_FILES_EXCEEDED);
            alert(ERROR_MESSAGES.MAX_FILES_EXCEEDED);
          }
        } else {
          console.warn(validation.error);
          alert(validation.error);
        }
      });

      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [uploadedFiles.length, addFile]
  );

  const handleRemoveFile = useCallback(
    (fileId: string) => {
      removeFile(fileId);
    },
    [removeFile]
  );

  const onSubmit = async (data: FormData) => {
    if (!data.message.trim() && uploadedFiles.length === 0) return;

    // Add user message
    addMessage({
      content: data.message.trim() || "(attached files)",
      sender: "user",
      files: uploadedFiles,
    });

    // Clear files after sending
    if (uploadedFiles.length > 0) {
      clearFiles();
    }

    // Reset form
    reset();

    // Simulate bot response
    setLoading(true);
    setTimeout(() => {
      const botResponse = generateBotResponse(data.message);
      addMessage({
        content: botResponse,
        sender: "bot",
      });
      setLoading(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const themeClasses =
    theme === "dark"
      ? "bg-gray-800 text-white border-gray-700"
      : "bg-white text-gray-900 border-gray-200";

  return (
    <div className={`p-3 sm:p-4 border-t ${themeClasses}`}>
      {/* File Preview Section */}
      {allowUpload && uploadedFiles.length > 0 && (
        <div className="mb-3 space-y-2">
          <div className="text-xs font-medium opacity-70">
            Attached files ({uploadedFiles.length}/{FILE_CONSTRAINTS.MAX_FILES}
            ):
          </div>
          <div className="space-y-1">
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`
                  flex items-center justify-between p-2 rounded-lg text-sm
                  ${
                    theme === "dark"
                      ? "bg-gray-700 text-gray-200"
                      : "bg-gray-100 text-gray-700"
                  }
                `}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Paperclip size={14} className="flex-shrink-0" />
                  <span className="truncate text-xs sm:text-sm">
                    {file.name}
                  </span>
                  <span className="text-xs opacity-60 flex-shrink-0 hidden sm:inline">
                    ({(file.size / 1024).toFixed(1)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(file.id)}
                  className={`
                    p-1 rounded hover:bg-opacity-20 transition-colors flex-shrink-0
                    ${
                      theme === "dark"
                        ? "hover:bg-red-500 text-gray-400 hover:text-red-300"
                        : "hover:bg-red-500 text-gray-500 hover:text-red-600"
                    }
                  `}
                >
                  <X size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex items-end gap-2">
        {/* File Upload Button */}
        {allowUpload && (
          <>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept=".pdf,.docx,.doc,.txt"
              multiple
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadedFiles.length >= FILE_CONSTRAINTS.MAX_FILES}
              className={`
                p-1.5 sm:p-2 rounded-lg transition-colors flex-shrink-0
                ${
                  uploadedFiles.length >= FILE_CONSTRAINTS.MAX_FILES
                    ? "text-gray-400 cursor-not-allowed"
                    : theme === "dark"
                    ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                }
              `}
              aria-label="Attach file"
            >
              <Paperclip size={18} className="sm:w-5 sm:h-5" />
            </button>
          </>
        )}

        {/* Message Input */}
        <textarea
          {...register("message")}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className={`
            flex-1 px-2 sm:px-3 py-2 border rounded-lg resize-none text-sm sm:text-base
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            min-h-[36px] max-h-[120px] sm:max-h-[150px]
            ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
            }
          `}
          rows={1}
          style={{
            height: "auto",
          }}
          onInput={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = "auto";
            target.style.height = target.scrollHeight + "px";
          }}
        />

        {/* Send Button */}
        <motion.button
          type="submit"
          disabled={!messageValue.trim() && uploadedFiles.length === 0}
          className={`
            p-1.5 sm:p-2 rounded-lg transition-colors flex-shrink-0
            ${
              messageValue.trim() || uploadedFiles.length > 0
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }
          `}
          whileHover={
            messageValue.trim() || uploadedFiles.length > 0
              ? { scale: 1.05 }
              : {}
          }
          whileTap={
            messageValue.trim() || uploadedFiles.length > 0
              ? { scale: 0.95 }
              : {}
          }
        >
          <Send size={18} className="sm:w-5 sm:h-5" />
        </motion.button>
      </form>
    </div>
  );
};
