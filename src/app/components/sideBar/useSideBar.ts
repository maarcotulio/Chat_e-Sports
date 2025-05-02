"use client";

import { Group, Message } from "@/@types/chat";
import { useState, useEffect } from "react";
import useStore from "@/store";

export function useSideBar() {
  const [mobileView, setMobileView] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const showSidebar = useStore((state) => state.showSidebar);
  const setShowSidebar = useStore((state) => state.setShowSidebar);
  const selectedGroup = useStore((state) => state.selectedGroup);
  const setSelectedGroup = useStore((state) => state.setSelectedGroup);
  const groups = useStore((state) => state.groups);
  const fetchGroupMessages = useStore((state) => state.fetchGroupMessages);

  const handleSelectGroup = (group: Group) => {
    setSelectedGroup(group);
    fetchGroupMessages(group.id);

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
    handleSelectGroup,
    groups,
    isSearchVisible,
    setIsSearchVisible,
    isCreateGroupModalOpen,
    setIsCreateGroupModalOpen,
  };
}
