import { create } from "zustand";
import { Group, Message, User } from "./@types/chat";

export type Store = {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
  selectedGroup: Group | null;
  setSelectedGroup: (selectedGroup: Group | null) => void;
  groups: Group[];
  fetchGroups: () => Promise<void>;
  groupMessages: Record<string, Message[]>;
  fetchGroupMessages: (groupId: string) => Promise<void>;
  user: User | null;
  fetchUser: () => Promise<void>;
};

const useStore = create<Store>((set) => ({
  showSidebar: true,
  setShowSidebar: (showSidebar: boolean) => set({ showSidebar }),
  selectedGroup: null,
  setSelectedGroup: (selectedGroup: Group | null) => set({ selectedGroup }),

  groups: [],
  fetchGroups: async () => {
    const response = await fetch("/api/groups");

    const data = await response.json();

    set({ groups: data });
  },

  groupMessages: {},
  fetchGroupMessages: async (groupId: string) => {
    const response = await fetch(`/api/messages?groupId=${groupId}`);
    const data = await response.json();

    set((state) => ({
      groupMessages: {
        ...state.groupMessages,
        [groupId]: data,
      },
    }));
  },

  user: null,
  fetchUser: async () => {
    const response = await fetch("/api/user");
    const data = await response.json();

    set({ user: data });
  },
}));

export default useStore;
