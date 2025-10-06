// Error types for better error handling
export interface ValidationError {
  valid: false;
  error: string;
}

export interface ValidationSuccess {
  valid: true;
}

export type ValidationResult = ValidationError | ValidationSuccess;

export interface StorageError extends Error {
  code: "STORAGE_ERROR" | "PARSE_ERROR" | "QUOTA_EXCEEDED";
  originalError?: Error;
}

export interface FileValidationError extends Error {
  code: "FILE_TOO_LARGE" | "INVALID_TYPE" | "MAX_FILES_EXCEEDED";
  file?: File;
}

// Custom error classes
export class StorageError extends Error {
  constructor(
    message: string,
    public code: "STORAGE_ERROR" | "PARSE_ERROR" | "QUOTA_EXCEEDED",
    public originalError?: Error
  ) {
    super(message);
    this.name = "StorageError";
  }
}

export class FileValidationError extends Error {
  constructor(
    message: string,
    public code: "FILE_TOO_LARGE" | "INVALID_TYPE" | "MAX_FILES_EXCEEDED",
    public file?: File
  ) {
    super(message);
    this.name = "FileValidationError";
  }
}

// Theme types
export type Theme = "light" | "dark";
export type Position = "bottom-right" | "bottom-left";
export type Feedback = "upvote" | "downvote";
export type Sender = "user" | "bot";
