import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Paperclip, X } from "lucide-react";
import { useChatStore } from "../store/chatStore";
import { validateFile, formatFileSize } from "../utils";
import { useToast } from "./Toast";

interface FileUploadProps {
  theme: "light" | "dark";
  allowUpload: boolean;
}

interface FileUploadFormData {
  files: FileList | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  theme,
  allowUpload,
}) => {
  const { uploadedFiles, addFile, removeFile } = useChatStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { register } = useForm<FileUploadFormData>();
  const { addToast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    files.forEach((file) => {
      const validation = validateFile(file);
      if (validation.valid) {
        if (uploadedFiles.length < 3) {
          addFile(file);
          addToast({
            type: "success",
            title: "File uploaded",
            message: `${file.name} has been added successfully`,
          });
        } else {
          addToast({
            type: "warning",
            title: "Upload limit reached",
            message: "Maximum 3 files allowed",
          });
        }
      } else {
        addToast({
          type: "error",
          title: "Upload failed",
          message: validation.error,
        });
      }
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (fileId: string) => {
    removeFile(fileId);
  };

  if (!allowUpload) return null;

  const themeClasses =
    theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900";

  return (
    <div className={`p-3 border-b ${themeClasses}`}>
      {/* File tags */}
      {uploadedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {uploadedFiles.map((file) => (
            <motion.div
              key={file.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              <span className="truncate max-w-[120px]">{file.name}</span>
              <span className="text-xs opacity-70">
                ({formatFileSize(file.size)})
              </span>
              <button
                onClick={() => handleRemoveFile(file.id)}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X size={12} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <div className="flex items-center gap-2">
        <input
          {...register("files")}
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.doc,.txt"
          onChange={handleFileSelect}
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadedFiles.length >= 3}
          className={`
            p-2 rounded-lg transition-colors
            ${
              uploadedFiles.length >= 3
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100 cursor-pointer"
            }
          `}
        >
          <Paperclip size={20} />
        </button>
        <span className="text-sm text-gray-500">
          {uploadedFiles.length}/3 files
        </span>
      </div>
    </div>
  );
};
