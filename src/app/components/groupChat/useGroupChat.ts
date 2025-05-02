"use client";

import { useState, useEffect } from "react";
import useStore from "@/store";
import { Message, Group } from "@/@types/chat";

export default function useGroupChat() {
  const showSidebar = useStore((state) => state.showSidebar);
  const setShowSidebar = useStore((state) => state.setShowSidebar);
  const selectedGroup = useStore(
    (state) => state.selectedGroup
  ) as Group | null;
  const [mobileView, setMobileView] = useState(false);
  const groupMessages = useStore((state) => state.groupMessages);
  const fetchGroupMessages = useStore((state) => state.fetchGroupMessages);
  const currentUser = useStore((state) => state.user);
  useEffect(() => {
    if (selectedGroup) {
      fetchGroupMessages(selectedGroup.id);
    }
  }, [selectedGroup]);

  const [messages, setMessages] = useState<Message[]>(
    selectedGroup ? groupMessages[selectedGroup.id] || [] : []
  );

  useEffect(() => {
    if (selectedGroup) {
      setMessages(groupMessages[selectedGroup.id] || []);
    }
  }, [selectedGroup, groupMessages]);

  const [messageInput, setMessageInput] = useState("");

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
        timestamp: new Date(),
        userId: currentUser!.id,
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
