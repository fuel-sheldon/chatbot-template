export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  feedback?: "upvote" | "downvote";
  files?: UploadedFile[];
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  file: File;
}

export interface FeedbackFormData {
  rating: number;
  comments: string;
  email?: string;
}

export interface ChatbotWidgetProps {
  botName?: string;
  theme?: "light" | "dark";
  position?: "bottom-right" | "bottom-left";
  allowUpload?: boolean;
}

export interface ChatState {
  isOpen: boolean;
  isFullscreen: boolean;
  messages: Message[];
  uploadedFiles: UploadedFile[];
  isLoading: boolean;
  showFeedbackModal: boolean;
}

export interface ChatActions {
  toggleChat: () => void;
  toggleFullscreen: () => void;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  updateMessageFeedback: (
    messageId: string,
    feedback: "upvote" | "downvote"
  ) => void;
  addFile: (file: File) => void;
  removeFile: (fileId: string) => void;
  clearFiles: () => void;
  setLoading: (loading: boolean) => void;
  openFeedbackModal: () => void;
  hideFeedbackModal: () => void;
  clearChat: () => void;
  loadChatFromStorage: () => void;
  saveChatToStorage: () => void;
}

export type ChatStore = ChatState & ChatActions;
