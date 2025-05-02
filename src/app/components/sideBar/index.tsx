"use client";

import { X, Search } from "lucide-react";
import { useSideBar } from "./useSideBar";
import ListGroups from "./components/listGroups";
import { Input } from "@/app/auth/components/ui/input";
import Image from "next/image";
import Options from "./components/options";

export default function SideBar() {
  const {
    showSidebar,
    mobileView,
    setShowSidebar,
    handleSelectGroup,
    groups,
    selectedGroup,
    isSearchVisible,
    setIsSearchVisible,
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
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 rounded-full hover:bg-gray-800 text-white hover:cursor-pointer"
                    onClick={() => setIsSearchVisible(!isSearchVisible)}
                  >
                    <Search size={20} />
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
                  />
                </div>
              )}
            </div>

            <ListGroups
              groups={groups}
              selectedGroup={selectedGroup}
              handleSelectGroup={handleSelectGroup}
            />
          </div>
        </>
      )}
    </>
  );
}
