import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatStore, Message, UploadedFile } from "../types";
import { STORAGE_KEYS } from "../constants";
import { safeLocalStorage, handleError } from "../utils";

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // State
      isOpen: false,
      isFullscreen: false,
      theme: "light" as "light" | "dark", // Will be synced with page theme
      messages: [],
      uploadedFiles: [],
      isLoading: false,
      showFeedbackModal: false,

      // Actions
      toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
      toggleFullscreen: () =>
        set((state) => ({ isFullscreen: !state.isFullscreen })),
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
      setTheme: (theme: "light" | "dark") => set({ theme }),

      addMessage: (messageData) => {
        const newMessage: Message = {
          ...messageData,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        };
        set((state) => ({
          messages: [...state.messages, newMessage],
        }));
        // Auto-save after adding message
        setTimeout(() => get().saveChatToStorage(), 100);
      },

      updateMessageFeedback: (messageId, feedback) => {
        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === messageId ? { ...msg, feedback } : msg
          ),
        }));
        // Auto-save after updating feedback
        setTimeout(() => get().saveChatToStorage(), 100);
      },

      addFile: (file) => {
        const uploadedFile: UploadedFile = {
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          type: file.type,
          file,
        };
        set((state) => ({
          uploadedFiles: [...state.uploadedFiles, uploadedFile],
        }));
      },

      removeFile: (fileId) => {
        set((state) => ({
          uploadedFiles: state.uploadedFiles.filter(
            (file) => file.id !== fileId
          ),
        }));
      },

      clearFiles: () => set({ uploadedFiles: [] }),

      setLoading: (loading) => set({ isLoading: loading }),

      openFeedbackModal: () => set({ showFeedbackModal: true }),

      hideFeedbackModal: () => set({ showFeedbackModal: false }),

      clearChat: () => set({ messages: [], uploadedFiles: [] }),

      loadChatFromStorage: () => {
        const stored = safeLocalStorage.getItem(STORAGE_KEYS.CHATBOT_WIDGET);
        if (!stored) return;

        try {
          const data = JSON.parse(stored) as {
            messages?: Message[];
            theme?: "light" | "dark";
          };

          // Convert timestamp strings back to Date objects
          const messages =
            data.messages?.map((msg) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })) || [];

          set({
            messages,
            theme: data.theme || "light",
          });
        } catch (error) {
          handleError(error, "loadChatFromStorage");
          // Clear corrupted data
          safeLocalStorage.removeItem(STORAGE_KEYS.CHATBOT_WIDGET);
        }
      },

      saveChatToStorage: () => {
        const { messages, theme } = get();
        const success = safeLocalStorage.setItem(
          STORAGE_KEYS.CHATBOT_WIDGET,
          JSON.stringify({ messages, theme })
        );

        if (!success) {
          handleError(
            new Error("Failed to save to localStorage"),
            "saveChatToStorage"
          );
        }
      },
    }),
    {
      name: STORAGE_KEYS.CHATBOT_WIDGET,
      partialize: (state) => ({ messages: state.messages, theme: state.theme }),
    }
  )
);
