# Chatbot Widget

A fully functional React chatbot widget with modern UI/UX features built with TypeScript, TailwindCSS, and Framer Motion.

## Features

- 🎯 **Floating Chat Bubble**: Smooth toggle animation with customizable position
- 💬 **Interactive Chat**: User and bot messages with markdown rendering
- 👍 **Feedback System**: Upvote/downvote buttons for each bot message
- 📎 **File Upload**: Support for PDF, DOCX, TXT files with validation
- 📝 **Feedback Form**: Modal form when closing chat with React Hook Form
- 💾 **Persistent Storage**: Chat history saved in localStorage
- 🎨 **Theming**: Light and dark theme support
- ⚡ **Animations**: Smooth transitions with Framer Motion
- 🔧 **Customizable**: Configurable bot name, position, and features

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **React Hook Form** for form handling
- **Zustand** for state management
- **React Markdown** for message rendering

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Usage

```tsx
import { ChatbotWidget } from "./components/ChatbotWidget";

function App() {
  return (
    <div>
      {/* Your app content */}

      <ChatbotWidget
        botName="AI Assistant"
        theme="light"
        position="bottom-right"
        allowUpload={true}
      />
    </div>
  );
}
```

## Props

| Prop          | Type                              | Default          | Description                        |
| ------------- | --------------------------------- | ---------------- | ---------------------------------- |
| `botName`     | `string`                          | `"Assistant"`    | Name displayed in chat header      |
| `theme`       | `"light" \| "dark"`               | `"light"`        | Color theme for the widget         |
| `position`    | `"bottom-right" \| "bottom-left"` | `"bottom-right"` | Position of the chat bubble        |
| `allowUpload` | `boolean`                         | `true`           | Enable/disable file upload feature |

## File Upload

- **Supported formats**: PDF, DOCX, TXT
- **Maximum files**: 3 files
- **Maximum size**: 10MB per file
- **Validation**: Client-side validation with error messages

## State Management

The widget uses Zustand for state management with persistence:

- Chat messages and feedback are automatically saved to localStorage
- State persists across browser sessions
- Real-time updates with optimistic UI

## Styling

The widget is fully styled with TailwindCSS and supports:

- Responsive design
- Custom themes
- Smooth animations
- Accessible UI components

## Browser Support

- Modern browsers with ES2020 support
- Chrome, Firefox, Safari, Edge (latest versions)
- Mobile responsive design
