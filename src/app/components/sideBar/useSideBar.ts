"use client";

import { Group, Message } from "@/@types/chat";
import { useState, useEffect } from "react";
import { groupMessages } from "@/mock/message";
import { groups } from "@/mock/group";
import useStore from "@/store";

export function useSideBar() {
  const [mobileView, setMobileView] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const showSidebar = useStore((state) => state.showSidebar);
  const setShowSidebar = useStore((state) => state.setShowSidebar);
  const selectedGroup = useStore((state) => state.selectedGroup);
  const setSelectedGroup = useStore((state) => state.setSelectedGroup);

  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
    setMessages(groupMessages[group.id] || []);

    if (mobileView) {
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setMobileView(window.innerWidth < 768);
      setShowSidebar(window.innerWidth >= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return {
    mobileView,
    showSidebar,
    selectedGroup,
    setShowSidebar,
    messages,
    handleSelectGroup,
    groups,
    groupMessages,
    isSearchVisible,
    setIsSearchVisible,
  };
}
