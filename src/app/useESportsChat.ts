import useStore from "@/store";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export function useESportsChat() {
  const { isPending } = useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });

  const setUser = useStore((state) => state.setUser);

  const fetchUser = async () => {
    const response = await fetch("/api/user");
    const data = await response.json();
    setUser(data);
    return data;
  };

  return {
    isLoading: isPending,
  };
}
