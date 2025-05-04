"use client";

import { X, Search, Plus, Loader2, Gamepad2 } from "lucide-react";
import { useSideBar } from "./useSideBar";
import ListGroups from "./components/listGroups";
import { Input } from "@/app/auth/components/ui/input";
import Image from "next/image";
import Options from "./components/options";
import { CreateGroup } from "./components/createGroup";

export default function SideBar() {
  const {
    isLoading,
    showSidebar,
    selectedGroup,
    handleSelectGroup,
    groups,
    isSearchVisible,
    setIsSearchVisible,
    setShowSidebar,
    mobileView,
    isCreateGroupModalOpen,
    setIsCreateGroupModalOpen,
    handleMatches,
    handleSearch,
  } = useSideBar();

  return (
    <>
      {showSidebar && (
        <>
          <div className="w-full md:w-80 bg-black border-r border-gray-800 flex flex-col">
            <div className="p-4 bg-gray-900 border-b border-gray-800 flex flex-col justify-between items-center">
              <div className="flex items-center justify-between w-full">
                <Image
                  src={"/logo.png"}
                  alt="Logo Chat eSports"
                  width={50}
                  height={50}
                />
                <div className="flex items-center space-x-2 justify-end">
                  <button
                    className="p-2 rounded-full hover:bg-gray-800 text-white hover:cursor-pointer"
                    onClick={() => setIsSearchVisible(!isSearchVisible)}
                  >
                    <Search size={20} />
                  </button>
                  <button
                    className="p-2 rounded-full hover:bg-gray-800 text-white hover:cursor-pointer"
                    onClick={() => handleMatches()}
                  >
                    <Gamepad2 size={20} />
                  </button>
                  <Options />
                  {mobileView && (
                    <button
                      className="md:hidden p-2 rounded-full hover:bg-gray-800 text-white"
                      onClick={() => setShowSidebar(false)}
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>
              {isSearchVisible && (
                <div className="mt-4 w-full h-full">
                  <Input
                    type="text"
                    placeholder="Pesquisar"
                    className="w-full p-2 rounded-md bg-gray-800 text-white"
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-10 h-10 animate-spin" />
              </div>
            ) : (
              <>
                {groups.length > 0 ? (
                  <ListGroups
                    groups={groups}
                    selectedGroup={selectedGroup}
                    handleSelectGroup={handleSelectGroup}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-2 ">
                    <div
                      className="rounded-full border border-gray-400 border-dashed flex items-center justify-center gap-2 p-2  flex-col hover:cursor-pointer"
                      onClick={() => setIsCreateGroupModalOpen(true)}
                    >
                      <Plus size={24} />
                    </div>
                    <p className="text-gray-400">Criar grupo</p>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}

      <CreateGroup
        isCreateGroupOpen={isCreateGroupModalOpen}
        setIsCreateGroupOpen={setIsCreateGroupModalOpen}
      />
    </>
  );
}
