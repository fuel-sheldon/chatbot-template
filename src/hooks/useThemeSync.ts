import { useEffect } from "react";
import { useChatStore } from "../store/chatStore";
import { detectPageTheme, watchPageTheme } from "../utils/themeDetection";

export const useThemeSync = () => {
  const { setTheme } = useChatStore();

  useEffect(() => {
    // Set initial theme based on page
    const initialTheme = detectPageTheme();
    setTheme(initialTheme);

    // Watch for theme changes
    const cleanup = watchPageTheme((newTheme) => {
      setTheme(newTheme);
    });

    // Cleanup on unmount
    return cleanup;
  }, [setTheme]);
};
