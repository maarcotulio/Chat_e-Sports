"use client";

import { useState, useEffect } from "react";
import useStore from "@/store";
import { currentUser } from "@/mock/users";
import { groupMessages } from "@/mock/message";
import { Message } from "@/@types/chat";

export default function useGroupChat() {
  const showSidebar = useStore((state) => state.showSidebar);
  const setShowSidebar = useStore((state) => state.setShowSidebar);
  const selectedGroup = useStore((state) => state.selectedGroup);
  const [mobileView, setMobileView] = useState(false);

  const [messages, setMessages] = useState<Message[]>(
    selectedGroup ? groupMessages[selectedGroup.id] : []
  );
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    setMessages(selectedGroup ? groupMessages[selectedGroup.id] : []);
  }, [selectedGroup]);

  useEffect(() => {
    const checkMobile = () => {
      setMobileView(window.innerWidth < 768);
      setShowSidebar(window.innerWidth >= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedGroup) {
      const newMessage: Message = {
        id: `m${Date.now()}`,
        content: messageInput,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        userId: currentUser.id,
      };

      setMessages([...messages, newMessage]);
      setMessageInput("");
    }
  };

  return {
    mobileView,
    showSidebar,
    setShowSidebar,
    messages,
    messageInput,
    setMessageInput,
    handleSendMessage,
    selectedGroup,
  };
}
