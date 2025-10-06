import React from "react";
import { ChatBubble } from "./ChatBubble";
import { ChatWindow } from "./ChatWindow";
import { ChatbotWidgetProps } from "../types";
import { useChatStore } from "../store/chatStore";

export const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({
  botName = "Assistant",
  position = "bottom-right",
  allowUpload = true,
}) => {
  const { theme } = useChatStore();

  return (
    <>
      <ChatBubble position={position} theme={theme} />
      <ChatWindow
        botName={botName}
        position={position}
        allowUpload={allowUpload}
      />
    </>
  );
};
