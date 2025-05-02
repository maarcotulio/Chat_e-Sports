import { create } from "zustand";
import { Group } from "./@types/chat";

export type Store = {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
  selectedGroup: Group | null;
  setSelectedGroup: (selectedGroup: Group | null) => void;
};

const useStore = create<Store>((set) => ({
  showSidebar: true,
  setShowSidebar: (showSidebar: boolean) => set({ showSidebar }),
  selectedGroup: null,
  setSelectedGroup: (selectedGroup: Group | null) => set({ selectedGroup }),
}));

export default useStore;
