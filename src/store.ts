import { create } from "zustand";
import { GroupMember, Group, Message, User } from "@prisma/client";

export type Store = {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
  selectedGroup: Group | null;
  setSelectedGroup: (selectedGroup: Group | null) => void;
  groups: Group[];
  fetchGroups: (userId: string) => Promise<void>;
  groupMessages: Record<string, Message[]>;
  fetchGroupMessages: (groupId: string) => Promise<void>;
  user: User | null;
  fetchUser: () => Promise<void>;
  members: (GroupMember & {
    user: { id: string; name: string; image: string | null };
  })[];
  fetchMembers: (groupId: string) => Promise<void>;
};

const useStore = create<Store>((set) => ({
  showSidebar: true,
  setShowSidebar: (showSidebar: boolean) => set({ showSidebar }),
  selectedGroup: null,
  setSelectedGroup: (selectedGroup: Group | null) => set({ selectedGroup }),

  groups: [],
  fetchGroups: async (userId: string) => {
    const response = await fetch("/api/groups?userId=" + userId);

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

  members: [],
  fetchMembers: async (groupId: string) => {
    const response = await fetch(`/api/members/${groupId}`);
    const data = await response.json();

    set({ members: data });
  },
}));

export default useStore;
