"use client";

import SideBar from "./components/sideBar";
import GroupChat from "./components/groupChat";
import useStore from "@/store";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

export default function ESportsChat() {
  const fetchUser = useStore((state) => state.fetchUser);
  const fetchGroups = useStore((state) => state.fetchGroups);
  const user = useStore((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await fetchUser();
      if (user?.id) {
        await fetchGroups(user.id);
      }
      setIsLoading(false);
    };
    init();
  }, [fetchUser, fetchGroups, user?.id]);

  if (isLoading) {
    return (
      <div className="flex h-screen bg-black text-white items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-black text-white">
      {user && (
        <>
          <SideBar />
          <GroupChat />
        </>
      )}
    </div>
  );
}
