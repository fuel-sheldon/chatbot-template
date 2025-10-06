import React from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star } from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { FeedbackFormData } from "../types";

interface FeedbackModalProps {
  theme: "light" | "dark";
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({ theme }) => {
  const { showFeedbackModal, hideFeedbackModal } = useChatStore();
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<FeedbackFormData>();
  const rating = watch("rating", 0);

  const onSubmit = (data: FeedbackFormData) => {
    console.log("Feedback submitted:", data);
    // Here you would typically send the feedback to your backend
    alert("Thank you for your feedback!");
    reset();
    hideFeedbackModal();
  };

  const themeClasses =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900";

  const overlayClasses =
    theme === "dark" ? "bg-black bg-opacity-50" : "bg-black bg-opacity-25";

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

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    How would you rate your experience?
                  </label>
                  <div className="flex gap-1">
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
                    {...register("rating", { required: true, min: 1 })}
                  />
                </div>

                {/* Comments */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    {...register("comments")}
                    placeholder="Tell us more about your experience..."
                    className={`
                      w-full p-3 rounded-lg resize-none
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${
                        theme === "dark"
                          ? "bg-gray-700 text-white placeholder-gray-400"
                          : "bg-gray-50 text-gray-900 placeholder-gray-500"
                      }
                    `}
                    rows={4}
                  />
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="your@email.com"
                    className={`
                      w-full p-3 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${
                        theme === "dark"
                          ? "bg-gray-700 text-white placeholder-gray-400"
                          : "bg-gray-50 text-gray-900 placeholder-gray-500"
                      }
                    `}
                  />
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
                    className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
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
