"use client";

import { useState } from "react";
import { X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { WidgetSelectionList } from "@/components/Dashboard/SidePanel/SelectionList";
import { WidgetCreationForm } from "@/components/Dashboard/SidePanel/CreationForm";

import { useDashboardStore } from "@/store/dashboardStore";

const SideDashboardPanel = () => {
  const sidePanel = useDashboardStore((s) => s.sidePanel);
  const toggleSidePanel = useDashboardStore((s) => s.toggleSidePanel);
  const [view, setView] = useState<"select" | "create">("select");

  return (
    <Sheet 
      open={sidePanel} 
      onOpenChange={(open) => {
        toggleSidePanel();
        if (!open) setView("select");
      }}
    >
      <SheetContent showCloseButton={false} className="min-w-2/5 bg-white flex flex-col p-0">
        <SheetHeader className="bg-indigo-800 flex flex-row items-center justify-between px-4 py-3 shrink-0">
          <SheetTitle className="text-white text-base">Add Widget?</SheetTitle>
          <button
            aria-label="Close"
            onClick={toggleSidePanel}
            className="cursor-pointer"
          >
            <X className="size-4 text-white" />
          </button>
        </SheetHeader>

        {sidePanel && (
          <div className="flex-1 overflow-y-auto">
            {view === "select" ? (
              <WidgetSelectionList onOpenCreate={() => setView("create")} />
            ) : (
              <WidgetCreationForm onBack={() => setView("select")} />
            )}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SideDashboardPanel;