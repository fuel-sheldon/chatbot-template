import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChatStore, Message, UploadedFile } from "../types";
import { STORAGE_KEYS, ERROR_MESSAGES } from "../constants";

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      // State
      isOpen: false,
      isFullscreen: false,
      messages: [],
      uploadedFiles: [],
      isLoading: false,
      showFeedbackModal: false,

      // Actions
      toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
      toggleFullscreen: () =>
        set((state) => ({ isFullscreen: !state.isFullscreen })),

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
        try {
          const stored = localStorage.getItem(STORAGE_KEYS.CHATBOT_WIDGET);
          if (stored) {
            const data = JSON.parse(stored) as { messages?: Message[] };
            // Convert timestamp strings back to Date objects
            const messages =
              data.messages?.map((msg) => ({
                ...msg,
                timestamp: new Date(msg.timestamp),
              })) || [];
            set({ messages });
          }
        } catch (error) {
          console.error(ERROR_MESSAGES.LOAD_ERROR, error);
          // Clear corrupted data
          localStorage.removeItem(STORAGE_KEYS.CHATBOT_WIDGET);
        }
      },

      saveChatToStorage: () => {
        try {
          const { messages } = get();
          localStorage.setItem(
            STORAGE_KEYS.CHATBOT_WIDGET,
            JSON.stringify({ messages })
          );
        } catch (error) {
          console.error(ERROR_MESSAGES.STORAGE_ERROR, error);
        }
      },
    }),
    {
      name: STORAGE_KEYS.CHATBOT_WIDGET,
      partialize: (state) => ({ messages: state.messages }),
    }
  )
);
