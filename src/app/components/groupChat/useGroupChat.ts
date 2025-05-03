"use client";

import { useState, useEffect } from "react";
import useStore from "@/store";
import { Message, Group } from "@prisma/client";

export default function useGroupChat() {
  const [mobileView, setMobileView] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const showSidebar = useStore((state) => state.showSidebar);
  const setShowSidebar = useStore((state) => state.setShowSidebar);
  const selectedGroup = useStore(
    (state) => state.selectedGroup
  ) as Group | null;
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

  const handleSendMessage = async () => {
    if (messageInput.trim() && selectedGroup) {
      const newMessage: Message = {
        id: `m${Date.now()}`,
        content: messageInput,
        createdAt: new Date(),
        groupId: selectedGroup.id,
        userId: currentUser!.id,
      };

      await fetch("/api/messages", {
        method: "POST",
        body: JSON.stringify({
          content: messageInput,
          groupId: selectedGroup.id,
          userId: currentUser!.id,
        }),
      });

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
    showDetails,
    setShowDetails,
  };
}
