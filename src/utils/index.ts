import { FILE_CONSTRAINTS, ERROR_MESSAGES, BOT_RESPONSES } from "../constants";

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const validateFile = (
  file: File
): { valid: boolean; error?: string } => {
  if (file.size > FILE_CONSTRAINTS.MAX_SIZE) {
    return { valid: false, error: ERROR_MESSAGES.FILE_TOO_LARGE };
  }

  if (!FILE_CONSTRAINTS.ALLOWED_TYPES.includes(file.type as any)) {
    return { valid: false, error: ERROR_MESSAGES.INVALID_FILE_TYPE };
  }

  return { valid: true };
};

export const generateBotResponse = (_userMessage: string): string => {
  return BOT_RESPONSES[Math.floor(Math.random() * BOT_RESPONSES.length)];
};
