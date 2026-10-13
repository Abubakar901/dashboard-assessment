"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { ArrowLeft } from "lucide-react";

import { useDashboardStore } from "@/store/dashboardStore";

export const WidgetCreationForm = ({ onBack }: {onBack: () => void }) => {
  const categories = useDashboardStore((s) => s.categories);
  const addWidget = useDashboardStore((s) => s.addWidget);
  const toggleSidePanel = useDashboardStore((s) => s.toggleSidePanel);

  const [targetCategory, setTargetCategory] = useState(categories[0]?.id || "");
  const [widgetName, setWidgetName] = useState("");
  const [widgetText, setWidgetText] = useState("");

  const handleCreateWidget = (e: React.FormEvent) => {
    e.preventDefault();
    if (!widgetName.trim() || !widgetText.trim()) return;

    addWidget(targetCategory, widgetName, widgetText);
    
    setWidgetName("");
    setWidgetText("");
    onBack();
    toggleSidePanel();
  };

  return (
    <form onSubmit={handleCreateWidget} className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-4 px-4">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-xs text-indigo-800 font-semibold cursor-pointer w-fit"
        >
          <ArrowLeft size={14} /> Back to widget selection
        </button>

        <h3 className="text-sm font-bold text-gray-800">Add New Custom Widget</h3>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">Select Category</label>
          <select
            value={targetCategory}
            onChange={(e) => setTargetCategory(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-xs outline-none focus:border-indigo-800"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">Widget Name</label>
          <Input
            placeholder="e.g., Security Overview"
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            required
            className="text-xs"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">Widget Text / Content</label>
          <textarea
            placeholder="Enter random text or assignment notes..."
            value={widgetText}
            onChange={(e) => setWidgetText(e.target.value)}
            required
            rows={4}
            className="w-full rounded-md border border-slate-300 bg-white p-3 text-xs outline-none focus:border-indigo-800"
          />
        </div>
      </div>

      <div className="px-4 py-4 flex flex-row items-center justify-end gap-2 border-t bg-white">
        <Button
          type="button"
          variant="outline"
          className="h-9 px-6 border-indigo-800 text-indigo-800"
          onClick={onBack}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          className="h-9 bg-indigo-800 px-6 text-white hover:bg-indigo-900"
        >
          Save Widget
        </Button>
      </div>
    </form>
  );
};