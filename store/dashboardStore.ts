import { create } from "zustand";

import rawData from "@/data/dashboard.json";

import type { Category } from "@/types/dashboard";

type DashboardState = {
  categories: Category[];
  sidePanel: boolean;
  toggleSidePanel: () => void;
  searchQuery: string; // <-- Add this
  setSearchQuery: (query: string) => void; // <-- Add this
  removeWidget: (categoryId: string, widgetId: string) => void;
  applySelection: (activeIds: string[]) => void;
  addWidget: (categoryId: string, name: string, text: string) => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  categories: rawData.categories as unknown as Category[],
  sidePanel: false,
  toggleSidePanel: () => set((state) => ({ sidePanel: !state.sidePanel })),

  searchQuery: "", 
  setSearchQuery: (query) => set({ searchQuery: query }),

  removeWidget: (categoryId, widgetId) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id !== categoryId
          ? category
          : {
              ...category,
              widgets: category.widgets.map((widget) =>
                widget.id === widgetId ? { ...widget, active: false } : widget
              ),
            }
      ),
    })),

  applySelection: (activeIds) =>
    set((state) => ({
      categories: state.categories.map((category) => ({
        ...category,
        widgets: category.widgets.map((widget) => ({
          ...widget,
          active: activeIds.includes(widget.id),
        })),
      })),
    })),

    addWidget: (categoryId, name, text) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id !== categoryId
          ? category
          : {
              ...category,
              widgets: [
                ...category.widgets,
                {
                  id: `custom-widget-${Date.now()}`,
                  name,
                  type: "text", 
                  data: text,
                  active: true, 
                },
              ],
            }
      ),
    })),
}));