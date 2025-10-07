import React from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star } from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { FeedbackFormData } from "../types";
import { useToast } from "./Toast";

interface FeedbackModalProps {
  theme: "light" | "dark";
  inline?: boolean; // New prop to control rendering mode
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  theme,
  inline = false,
}) => {
  const { showFeedbackModal, hideFeedbackModal, toggleChat } = useChatStore();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    mode: "onBlur", // Validate on blur for better UX
  });
  const rating = watch("rating", 0);
  const comments = watch("comments", "");
  const { addToast } = useToast();

  // Check if form is valid for submission
  const isFormValid = rating > 0 && Object.keys(errors).length === 0;

  const onSubmit = (data: FeedbackFormData) => {
    console.log("Feedback submitted:", data);
    // Here you would typically send the feedback to your backend
    addToast({
      type: "success",
      title: "Feedback submitted",
      message: "Thank you for your feedback!",
    });
    reset();
    hideFeedbackModal();

    // If in inline mode, close the chat after feedback submission
    if (inline) {
      toggleChat();
    }
  };

  const onError = (errors: any) => {
    console.log("Form validation errors:", errors);
    addToast({
      type: "error",
      title: "Validation Error",
      message: "Please check the form and try again",
    });
  };

  const themeClasses =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900";

  const overlayClasses =
    theme === "dark" ? "bg-black bg-opacity-50" : "bg-black bg-opacity-25";

  // Render inline feedback form
  if (inline) {
    return (
      <AnimatePresence>
        {showFeedbackModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`w-full h-full flex flex-col ${themeClasses}`}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold">Share Your Feedback</h3>
              <button
                onClick={hideFeedbackModal}
                className={`p-1 rounded transition-colors ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="space-y-4 h-full flex flex-col"
                noValidate
              >
                {/* Form fields container */}
                <div className="flex-1 space-y-4">
                  {/* Rating */}
                  <div>
                    <label
                      className={`block text-sm font-medium mb-2 ${
                        errors.rating ? "text-red-600 dark:text-red-400" : ""
                      }`}
                    >
                      How would you rate your experience?{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div
                      className={`flex gap-1 p-2 rounded-lg transition-colors ${
                        errors.rating ? "bg-red-50 dark:bg-red-900/20" : ""
                      }`}
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setValue("rating", star)}
                          className="p-1"
                        >
                          <Star
                            size={24}
                            className={
                              star <= rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }
                          />
                        </button>
                      ))}
                    </div>
                    <input
                      type="hidden"
                      {...register("rating", {
                        required: "Please select a rating",
                        min: {
                          value: 1,
                          message: "Please select at least 1 star",
                        },
                      })}
                    />
                    {errors.rating && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.rating.message}
                      </motion.div>
                    )}
                  </div>

                  {/* Comments */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Additional Comments (Optional)
                    </label>
                    <textarea
                      {...register("comments", {
                        maxLength: {
                          value: 1000,
                          message: "Comments must be less than 1000 characters",
                        },
                      })}
                      placeholder="Tell us more about your experience..."
                      className={`
                        w-full p-3 rounded-lg resize-none border-2 transition-colors
                        focus:outline-none focus:ring-2
                        ${
                          errors.comments
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }
                        ${
                          theme === "dark"
                            ? "bg-gray-700 text-white placeholder-gray-400"
                            : "bg-gray-50 text-gray-900 placeholder-gray-500"
                        }
                      `}
                      rows={4}
                    />
                    {errors.comments && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.comments.message}
                      </motion.div>
                    )}
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                      {comments.length}/1000 characters
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address",
                        },
                        maxLength: {
                          value: 254,
                          message: "Email address is too long",
                        },
                      })}
                      placeholder="your@email.com"
                      className={`
                        w-full p-3 rounded-lg border-2 transition-colors
                        focus:outline-none focus:ring-2
                        ${
                          errors.email
                            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        }
                        ${
                          theme === "dark"
                            ? "bg-gray-700 text-white placeholder-gray-400"
                            : "bg-gray-50 text-gray-900 placeholder-gray-500"
                        }
                      `}
                    />
                    {errors.email && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mt-1 text-sm text-red-600 dark:text-red-400"
                      >
                        {errors.email.message}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4 mt-auto">
                  <button
                    type="button"
                    onClick={hideFeedbackModal}
                    className={`flex-1 px-4 py-2 border rounded-lg transition-colors ${
                      theme === "dark"
                        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`
                      flex-1 px-4 py-2 rounded-lg transition-colors
                      ${
                        isFormValid
                          ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }
                    `}
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Render overlay feedback modal (original behavior)
  return (
    <AnimatePresence>
      {showFeedbackModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${overlayClasses}`}
          onClick={hideFeedbackModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`w-full max-w-md mx-4 rounded-lg shadow-xl ${themeClasses}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Share Your Feedback</h3>
                <button
                  onClick={hideFeedbackModal}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit, onError)}
                className="space-y-4"
                noValidate
              >
                {/* Rating */}
                <div>
                  <label
                    className={`block text-sm font-medium mb-2 ${
                      errors.rating ? "text-red-600 dark:text-red-400" : ""
                    }`}
                  >
                    How would you rate your experience?{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div
                    className={`flex gap-1 p-2 rounded-lg transition-colors ${
                      errors.rating ? "bg-red-50 dark:bg-red-900/20" : ""
                    }`}
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setValue("rating", star)}
                        className="p-1"
                      >
                        <Star
                          size={24}
                          className={
                            star <= rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }
                        />
                      </button>
                    ))}
                  </div>
                  <input
                    type="hidden"
                    {...register("rating", {
                      required: "Please select a rating",
                      min: {
                        value: 1,
                        message: "Please select at least 1 star",
                      },
                    })}
                  />
                  {errors.rating && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                    >
                      {errors.rating.message}
                    </motion.div>
                  )}
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    {...register("comments", {
                      maxLength: {
                        value: 1000,
                        message: "Comments must be less than 1000 characters",
                      },
                    })}
                    placeholder="Tell us more about your experience..."
                    className={`
                      w-full p-3 rounded-lg resize-none border-2 transition-colors
                      focus:outline-none focus:ring-2
                      ${
                        errors.comments
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }
                      ${
                        theme === "dark"
                          ? "bg-gray-700 text-white placeholder-gray-400"
                          : "bg-gray-50 text-gray-900 placeholder-gray-500"
                      }
                    `}
                    rows={4}
                  />
                  {errors.comments && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                    >
                      {errors.comments.message}
                    </motion.div>
                  )}
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 text-right">
                    {comments.length}/1000 characters
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("email", {
                      required: "Email address is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address",
                      },
                      maxLength: {
                        value: 254,
                        message: "Email address is too long",
                      },
                    })}
                    placeholder="your@email.com"
                    className={`
                      w-full p-3 rounded-lg border-2 transition-colors
                      focus:outline-none focus:ring-2
                      ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                          : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                      }
                      ${
                        theme === "dark"
                          ? "bg-gray-700 text-white placeholder-gray-400"
                          : "bg-gray-50 text-gray-900 placeholder-gray-500"
                      }
                    `}
                  />
                  {errors.email && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-600 dark:text-red-400"
                    >
                      {errors.email.message}
                    </motion.div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={hideFeedbackModal}
                    className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isFormValid}
                    className={`
                      flex-1 px-4 py-2 rounded-lg transition-colors
                      ${
                        isFormValid
                          ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }
                    `}
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
