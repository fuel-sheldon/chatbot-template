import { ChatbotWidget } from "./components/ChatbotWidget";
import { useThemeSync } from "./hooks/useThemeSync";
import { useState } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ToastProvider } from "./components/Toast";
import "./index.css";

function App() {
  // Sync chatbot theme with page theme
  useThemeSync();

  const [pageTheme, setPageTheme] = useState<"light" | "dark">("light");

  const togglePageTheme = () => {
    const newTheme = pageTheme === "light" ? "dark" : "light";
    setPageTheme(newTheme);

    // Update the page's theme
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return (
    <ErrorBoundary>
      <ToastProvider>
        <div
          className={`min-h-screen transition-colors ${
            pageTheme === "dark" ? "bg-gray-900" : "bg-gray-100"
          }`}
        >
          {/* Demo content */}
          <div className="container mx-auto px-4 py-4 sm:py-8">
            <div className="flex justify-between items-center mb-4 sm:mb-8">
              <h1
                className={`text-2xl sm:text-4xl font-bold text-center ${
                  pageTheme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                Chatbot Widget Demo
              </h1>

              {/* Theme Toggle Button */}
              <button
                onClick={togglePageTheme}
                className={`
              px-4 py-2 rounded-lg font-medium transition-colors
              ${
                pageTheme === "dark"
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-white text-gray-800 hover:bg-gray-50"
              } border border-gray-300 dark:border-gray-600
            `}
              >
                {pageTheme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
              </button>
            </div>

            <div className="max-w-4xl mx-auto">
              <div
                className={`rounded-lg shadow-lg p-4 sm:p-8 mb-4 sm:mb-8 ${
                  pageTheme === "dark" ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h2
                  className={`text-xl sm:text-2xl font-semibold mb-4 ${
                    pageTheme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Features
                </h2>
                <ul
                  className={`space-y-2 ${
                    pageTheme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <li>• Floating chat bubble with smooth animations</li>
                  <li>• Upvote/downvote feedback for each bot message</li>
                  <li>
                    • File upload support (PDF, DOCX, TXT) with validation
                  </li>
                  <li>• Feedback form modal when closing chat</li>
                  <li>• Persistent chat history using localStorage</li>
                  <li>• Markdown rendering for bot messages</li>
                  <li>• Responsive design with light/dark themes</li>
                  <li>• Customizable position and bot name</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
                <div
                  className={`rounded-lg shadow-lg p-4 sm:p-6 ${
                    pageTheme === "dark" ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      pageTheme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Light Theme
                  </h3>
                  <div
                    className={`text-sm ${
                      pageTheme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <p>• Try uploading files</p>
                    <p>• Rate bot responses</p>
                    <p>• Send feedback when closing</p>
                  </div>
                </div>

                <div
                  className={`rounded-lg shadow-lg p-4 sm:p-6 ${
                    pageTheme === "dark" ? "bg-gray-700" : "bg-gray-800"
                  } text-white`}
                >
                  <h3 className="text-xl font-semibold mb-4">Dark Theme</h3>
                  <p className="text-gray-300 mb-4">
                    Perfect for embedding in any website - the widget seamlessly
                    adapts to your site's theme without any configuration
                    needed.
                  </p>
                  <div className="text-sm text-gray-400">
                    <p>• Smooth animations with Framer Motion</p>
                    <p>• Form validation with React Hook Form</p>
                    <p>• State management with Zustand</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chatbot Widget */}
          <ChatbotWidget
            botName="Support Assistant"
            position="bottom-right"
            allowUpload={true}
          />
        </div>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
