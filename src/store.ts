import { create } from "zustand";
import { GroupMember, Group, Message, User } from "@prisma/client";

export type Store = {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;

  selectedGroup: Group | null;
  setSelectedGroup: (selectedGroup: Group | null) => void;

  groups: Group[];
  setGroups: (groups: Group[]) => void;

  groupMessages: Message[];
  setGroupMessages: (groupMessages: Message[]) => void;

  user: User | null;
  setUser: (user: User) => void;

  members: (GroupMember & {
    user: { id: string; name: string; image: string | null };
  })[];
  setMembers: (
    members: (GroupMember & {
      user: { id: string; name: string; image: string | null };
    })[]
  ) => void;
};

const useStore = create<Store>((set) => ({
  showSidebar: true,
  setShowSidebar: (showSidebar: boolean) => set({ showSidebar }),

  selectedGroup: null,
  setSelectedGroup: (selectedGroup: Group | null) => set({ selectedGroup }),

  groups: [],
  setGroups: (groups: Group[]) => set({ groups }),

  groupMessages: [],
  setGroupMessages: (groupMessages: Message[]) => set({ groupMessages }),

  user: null,
  setUser: (user: User) => set({ user }),

  members: [],
  setMembers: (
    members: (GroupMember & {
      user: { id: string; name: string; image: string | null };
    })[]
  ) => set({ members }),
}));

export default useStore;
