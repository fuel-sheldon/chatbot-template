// File validation constants
export const FILE_CONSTRAINTS = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 3,
  ALLOWED_TYPES: [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword",
    "text/plain",
  ],
  ALLOWED_EXTENSIONS: [".pdf", ".docx", ".doc", ".txt"],
} as const;

// Storage constants
export const STORAGE_KEYS = {
  CHATBOT_WIDGET: "chatbot-widget-storage",
} as const;

// UI constants
export const ANIMATION_DURATION = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
} as const;

// Theme constants
export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
} as const;

export const POSITIONS = {
  BOTTOM_RIGHT: "bottom-right",
  BOTTOM_LEFT: "bottom-left",
} as const;

// Error messages
export const ERROR_MESSAGES = {
  FILE_TOO_LARGE: "File size must be less than 10MB",
  INVALID_FILE_TYPE: "Only PDF, DOCX, and TXT files are allowed",
  MAX_FILES_EXCEEDED: "Maximum 3 files allowed",
  STORAGE_ERROR: "Failed to save chat data",
  LOAD_ERROR: "Failed to load chat data",
} as const;

// Bot response templates
export const BOT_RESPONSES = [
  "That's an interesting question! Let me help you with that.",
  "I understand what you're asking. Here's what I think...",
  "Great question! Based on my knowledge, I would suggest...",
  "I can definitely help you with that. Let me provide some insights.",
  "That's a common concern. Here's my perspective on this topic.",
] as const;
