// Theme detection utilities
export const detectPageTheme = (): "light" | "dark" => {
  // Check if the page has a dark class on html or body
  const htmlElement = document.documentElement;
  const bodyElement = document.body;

  // Check for common dark theme indicators
  const hasDarkClass =
    htmlElement.classList.contains("dark") ||
    bodyElement.classList.contains("dark") ||
    htmlElement.classList.contains("dark-mode") ||
    bodyElement.classList.contains("dark-mode");

  if (hasDarkClass) {
    return "dark";
  }

  // Check for data-theme attribute
  const dataTheme = htmlElement.getAttribute("data-theme");
  if (dataTheme === "dark") {
    return "dark";
  }

  // Check for CSS custom property (common in modern frameworks)
  const computedStyle = getComputedStyle(htmlElement);
  const colorScheme = computedStyle.getPropertyValue("color-scheme");
  if (colorScheme.includes("dark")) {
    return "dark";
  }

  // Check for prefers-color-scheme media query
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }

  // Default to light theme
  return "light";
};

export const watchPageTheme = (
  callback: (theme: "light" | "dark") => void
): (() => void) => {
  // Watch for changes in prefers-color-scheme
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  const handleChange = () => {
    callback(detectPageTheme());
  };

  // Listen for changes
  mediaQuery.addEventListener("change", handleChange);

  // Also watch for class changes on html/body elements
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        (mutation.attributeName === "class" ||
          mutation.attributeName === "data-theme")
      ) {
        handleChange();
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme"],
  });

  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class", "data-theme"],
  });

  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener("change", handleChange);
    observer.disconnect();
  };
};
