import { create } from "zustand";

interface SidebarState {
  openMenus: Record<string, boolean>;
  activeMenu: string;
  toggleMenu: (key: string) => void;
  setActiveMenu: (key: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  openMenus: {},
  activeMenu: "",
  toggleMenu: (key) =>
    set((state) => ({
      openMenus: { ...state.openMenus, [key]: !state.openMenus[key] },
    })),
  setActiveMenu: (key) => set({ activeMenu: key }),
}));
