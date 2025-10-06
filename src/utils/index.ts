import { FILE_CONSTRAINTS, ERROR_MESSAGES, BOT_RESPONSES } from "../constants";
import { ValidationResult } from "../types/errors";

// Re-export email validation utilities
export * from "./emailValidation";

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const validateFile = (file: File): ValidationResult => {
  if (file.size > FILE_CONSTRAINTS.MAX_SIZE) {
    return {
      valid: false,
      error: ERROR_MESSAGES.FILE_TOO_LARGE,
    };
  }

  if (!FILE_CONSTRAINTS.ALLOWED_TYPES.includes(file.type as any)) {
    return {
      valid: false,
      error: ERROR_MESSAGES.INVALID_FILE_TYPE,
    };
  }

  return { valid: true };
};

export const generateBotResponse = (_userMessage: string): string => {
  return BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
};

// Error handling utilities
export const handleError = (error: unknown, context: string): void => {
  if (error instanceof Error) {
    console.error(`[${context}] ${error.message}`, error);
  } else {
    console.error(`[${context}] Unknown error:`, error);
  }
};

// Safe localStorage operations
export const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      handleError(error, "localStorage.getItem");
      return null;
    }
  },

  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      handleError(error, "localStorage.setItem");
      return false;
    }
  },

  removeItem: (key: string): boolean => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      handleError(error, "localStorage.removeItem");
      return false;
    }
  },
};
