"use client";

import { Input } from "@/app/auth/components/ui/input";
import { Send, ChevronLeft } from "lucide-react";
import MessageArea from "./components/messageArea";
import useGroupChat from "./useGroupChat";
import { Group } from "@/@types/chat";

export default function GroupChat() {
  const {
    mobileView,
    showSidebar,
    setShowSidebar,
    messages,
    messageInput,
    setMessageInput,
    handleSendMessage,
    selectedGroup,
  } = useGroupChat();

  const group = selectedGroup as Group | null;

  return (
    <div className="flex-1 flex flex-col bg-black">
      {selectedGroup !== null ? (
        <>
          {selectedGroup && (
            <>
              <div className="p-3 bg-gray-900 border-b border-gray-800 flex items-center">
                {mobileView && !showSidebar && (
                  <button
                    className="mr-2 p-2 rounded-full hover:bg-gray-800 text-white"
                    onClick={() => setShowSidebar(true)}
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-100 font-bold">
                  {group?.icon}
                </div>
                <div className="ml-3 flex-1">
                  <h2 className="font-medium text-white">{group?.name}</h2>
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto bg-black">
                <MessageArea messages={messages} />
              </div>

              <div className="p-3 bg-gray-900 border-t border-gray-800">
                <div className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Digite uma mensagem..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <button
                    className="ml-2 p-2 bg-gray-100 text-black rounded-full hover:bg-gray-200 focus:outline-none"
                    onClick={handleSendMessage}
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </>
          )}

          {!selectedGroup && (
            <div className="flex items-center justify-center h-screen">
              <h1 className="text-gray-400 text-md font-bold">
                Selecione um grupo
              </h1>
            </div>
          )}
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-black">
          <p className="text-gray-500">
            Selecione um grupo para iniciar o chat
          </p>
        </div>
      )}
    </div>
  );
}
