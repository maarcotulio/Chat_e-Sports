"use client";

import { useState, useEffect } from "react";
import { Menu, Send, X, ChevronLeft, MoreVertical, Search } from "lucide-react";
import { Input } from "./auth/components/ui/input";
import SideBar from "./components/sideBar";
import GroupChat from "./components/groupChat";

type Group = {
  id: string;
  name: string;
  icon: string;
  lastMessage: string;
  time: string;
  unread?: number;
};

type User = {
  id: string;
  name: string;
  avatar: string;
};

type Message = {
  id: string;
  content: string;
  timestamp: string;
  userId: string;
};

export default function ESportsChat() {
  // Estado para controlar o layout em dispositivos móveis
  const [mobileView, setMobileView] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  return (
    <div className="flex h-screen bg-black text-white">
      <SideBar />

      {/* Área principal de chat */}
      <div className="flex-1 flex flex-col bg-black">
        {!selectedGroup ? (
          <GroupChat />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-black">
            <p className="text-gray-500">
              Selecione um grupo para iniciar o chat
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
