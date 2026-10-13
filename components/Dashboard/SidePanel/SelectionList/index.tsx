"use client";

import { useState } from "react";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Plus } from "lucide-react";

import { useDashboardStore } from "@/store/dashboardStore";

export const WidgetSelectionList = ({
  onOpenCreate,
}: {
  onOpenCreate: () => void;
}) => {
  const toggleSidePanel = useDashboardStore((s) => s.toggleSidePanel);
  const categories = useDashboardStore((s) => s.categories);
  const applySelection = useDashboardStore((s) => s.applySelection);

  const [selected, setSelected] = useState<string[]>(() =>
    categories.flatMap((category) =>
      category.widgets
        .filter((widget) => widget.active)
        .map((widget) => widget.id),
    ),
  );

  const handleChange = (id: string, checked: boolean) =>
    setSelected((prev) =>
      checked ? [...prev, id] : prev.filter((widgetId) => widgetId !== id),
    );

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-3 px-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <p className="text-sm">
            Personalize your dashboard by adding or enabling widgets
          </p>
          <Button
            type="button"
            size="sm"
            onClick={onOpenCreate}
            className="bg-indigo-800 text-white text-xs h-8 gap-1 hover:bg-indigo-900 shrink-0"
          >
            <Plus size={14} /> Add Custom
          </Button>
        </div>

        <Tabs defaultValue={categories[0]?.id} className="gap-3">
          <TabsList className="h-auto w-full justify-start gap-6 rounded-none border-b bg-transparent p-0">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex-none cursor-pointer rounded-none border-0 border-b-2 border-transparent bg-transparent px-1 pb-2 text-xs font-medium text-muted-foreground shadow-none data-[active]:border-indigo-800 data-[active]:bg-transparent data-[active]:text-foreground data-[state=active]:border-indigo-800 data-[state=active]:bg-transparent data-[state=active]:text-foreground"
              >
                {category.tab}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent
              key={category.id}
              value={category.id}
              className="flex flex-col gap-2"
            >
              {category.widgets.map((widget) => (
                <label
                  key={widget.id}
                  className="flex cursor-pointer items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2.5 text-xs shadow-sm"
                >
                  <Checkbox
                    checked={selected.includes(widget.id)}
                    onCheckedChange={(checked) =>
                      handleChange(widget.id, checked === true)
                    }
                  />
                  {widget.name}
                </label>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>

      <div className="px-4 py-4 flex flex-row items-center justify-end gap-2 border-t bg-white">
        <Button
          variant="outline"
          className="h-9 px-6 border-indigo-800 text-indigo-800"
          onClick={toggleSidePanel}
        >
          Cancel
        </Button>
        <Button
          variant="default"
          className="h-9 bg-indigo-800 px-6 text-white hover:bg-indigo-900"
          onClick={() => {
            applySelection(selected);
            toggleSidePanel();
          }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};
