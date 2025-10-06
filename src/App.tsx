import { ChatbotWidget } from "./components/ChatbotWidget";
import "./index.css";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Demo content */}
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-center mb-4 sm:mb-8 text-gray-800">
          Chatbot Widget Demo
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8 mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">Features</h2>
            <ul className="space-y-2 text-gray-700">
              <li>• Floating chat bubble with smooth animations</li>
              <li>• Upvote/downvote feedback for each bot message</li>
              <li>• File upload support (PDF, DOCX, TXT) with validation</li>
              <li>• Feedback form modal when closing chat</li>
              <li>• Persistent chat history using localStorage</li>
              <li>• Markdown rendering for bot messages</li>
              <li>• Responsive design with light/dark themes</li>
              <li>• Customizable position and bot name</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
              <h3 className="text-xl font-semibold mb-4">Light Theme</h3>
              <p className="text-gray-600 mb-4">
                Click the chat bubble in the bottom-right corner to start
                chatting!
              </p>
              <div className="text-sm text-gray-500">
                <p>• Try uploading files</p>
                <p>• Rate bot responses</p>
                <p>• Send feedback when closing</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Dark Theme</h3>
              <p className="text-gray-300 mb-4">
                The widget supports both light and dark themes for better user
                experience.
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
        theme="light"
        position="bottom-right"
        allowUpload={true}
      />
    </div>
  );
}

export default App;
