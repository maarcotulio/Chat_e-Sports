"use client";

import { useState, useEffect } from "react";
import useStore from "@/store";
import { Group } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

export function useSideBar() {
  const { isPending } = useQuery({
    queryKey: ["groups"],
    queryFn: () => fetchGroups(),
  });

  const { refetch: refetchGroupMessages } = useQuery({
    queryKey: ["groupMessages"],
    queryFn: () => fetchGroupMessages(),
    enabled: false,
  });

  const [mobileView, setMobileView] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [isCreateGroupModalOpen, setIsCreateGroupModalOpen] = useState(false);
  const userId = useStore((state) => state.user?.id);
  const setGroups = useStore((state) => state.setGroups);
  const showSidebar = useStore((state) => state.showSidebar);
  const setShowSidebar = useStore((state) => state.setShowSidebar);
  const selectedGroup = useStore((state) => state.selectedGroup);
  const setSelectedGroup = useStore((state) => state.setSelectedGroup);
  const groups = useStore((state) => state.groups);
  const setGroupMessages = useStore((state) => state.setGroupMessages);
  const isMatchesOpen = useStore((state) => state.isMatchesOpen);
  const setIsMatchesOpen = useStore((state) => state.setIsMatchesOpen);

  const handleSelectGroup = async (group: Group) => {
    setSelectedGroup(group);
    refetchGroupMessages();

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

  const fetchGroups = async () => {
    const response = await fetch("/api/groups?userId=" + userId);
    const data = await response.json();
    setGroups(data);
    return data;
  };

  const fetchGroupMessages = async () => {
    const response = await fetch(`/api/messages?groupId=${selectedGroup?.id}`);
    const data = await response.json();
    setIsMatchesOpen(false);
    setGroupMessages(data);
    return data;
  };

  const handleMatches = () => {
    if (mobileView) {
      setShowSidebar(false);
    }
    setIsMatchesOpen(!isMatchesOpen);
  };

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
    handleMatches,
    isLoading: isPending,
  };
}
