"use client";

import { useState, useEffect } from "react";
import useStore from "@/store";
import { Message, Group } from "@prisma/client";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { prisma } from "@/lib/prisma";

interface SupabasePayload {
  new: {
    id: string;
    content: string;
    createdAt: Date;
    groupId: string;
    userId: string;
    user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
    };
  };
  old: Record<string, any>;
  eventType: "INSERT" | "UPDATE" | "DELETE";
}

export default function useGroupChat() {
  const queryClient = useQueryClient();
  const [mobileView, setMobileView] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const showSidebar = useStore((state) => state.showSidebar);
  const setShowSidebar = useStore((state) => state.setShowSidebar);
  const selectedGroup = useStore(
    (state) => state.selectedGroup
  ) as Group | null;
  const currentUser = useStore((state) => state.user);
  const setGroupMessages = useStore((state) => state.setGroupMessages);

  const { data: messagesData, isPending: isLoadingGroupMessages } = useQuery({
    queryKey: ["groupMessages", selectedGroup?.id],
    queryFn: async () => {
      if (!selectedGroup) return [];
      const response = await fetch(`/api/messages?groupId=${selectedGroup.id}`);
      const data = await response.json();
      setGroupMessages(data);
      return data;
    },
    enabled: !!selectedGroup,
  });

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messagesData) {
      setMessages(messagesData);
    }
  }, [messagesData]);

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

  if (selectedGroup) {
    const channel = supabase
      .channel(`group_messages_${selectedGroup.id}`)
      .on(
        "postgres_changes" as any,
        {
          event: "*",
          schema: "public",
          table: "messages",
        },
        (payload: SupabasePayload) => {
          if (payload.new?.groupId === selectedGroup.id) {
            queryClient.invalidateQueries({
              queryKey: ["groupMessages", selectedGroup.id],
            });
          }
        }
      )
      .subscribe();
  }

  const handleSendMessage = async () => {
    if (messageInput.trim() && selectedGroup) {
      const newMessage: Message = {
        id: uuidv4(),
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
        headers: {
          "Content-Type": "application/json",
        },
      });

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
    isLoadingGroupMessages,
  };
}
