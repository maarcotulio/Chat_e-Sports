"use client";

import SideBar from "./components/sideBar";
import GroupChat from "./components/groupChat";
import { useESportsChat } from "./useESportsChat";
import { Loader2 } from "lucide-react";

export default function ESportsChat() {
  const { isLoading } = useESportsChat();

  if (isLoading) {
    return (
      <div className="flex flex-col gap-2 h-screen bg-black text-white items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
        <p className="text-gray-400 text-sm">Carregando informações...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white">
      <SideBar />
      <GroupChat />
    </div>
  );
}
