import { Sender, Feedback, Theme, Position } from "./errors";

export interface Message {
  id: string;
  content: string;
  sender: Sender;
  timestamp: Date;
  feedback?: Feedback;
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
  theme?: Theme;
  position?: Position;
  allowUpload?: boolean;
}

export interface ChatState {
  isOpen: boolean;
  isFullscreen: boolean;
  theme: Theme;
  messages: Message[];
  uploadedFiles: UploadedFile[];
  isLoading: boolean;
  showFeedbackModal: boolean;
}

export interface ChatActions {
  toggleChat: () => void;
  toggleFullscreen: () => void;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  addMessage: (message: Omit<Message, "id" | "timestamp">) => void;
  updateMessageFeedback: (messageId: string, feedback: Feedback) => void;
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
