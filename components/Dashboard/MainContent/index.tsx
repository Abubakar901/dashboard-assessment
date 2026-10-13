"use client";

import { X } from "lucide-react";
import { Card } from "@/components/ui/card";

import AddWidgetCard from "@/components/Dashboard/AddWidget";
import WidgetLayout from "@/components/Dashboard/WidgetLayout";
import NoDataCard from "@/components/Dashboard/NoDataCard";

import { useDashboardStore } from "@/store/dashboardStore";

import { Category } from "@/types/dashboard";

const DashboardMainContent = ({
  filteredCategories,
  query,
}: {
  filteredCategories: Category[];
  query: string;
}) => {
  const removeWidget = useDashboardStore((s) => s.removeWidget);

  return (
    <div className="flex flex-col gap-8 sm:gap-6">
      {filteredCategories?.map((category) => {
        if (query && category.widgets.length === 0) return null;

        return (
          <div key={category.id} className="flex flex-col gap-2">
            <h4 className="text-lg font-semibold">{category.name}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6">
              {category.widgets.map((widget) => (
                <Card key={widget.id} className="p-4 relative">
                  <button
                    onClick={() => removeWidget(category.id, widget.id)}
                    className="absolute top-3 right-5 text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                    title="Remove widget"
                  >
                    <X size={20} className="text-red-900 font-bold" />
                  </button>

                  <p className="text-md font-semibold pr-6">{widget.name}</p>
                  {widget.data === null ? (
                    <NoDataCard />
                  ) : (
                    <WidgetLayout type={widget.type} data={widget.data} />
                  )}
                </Card>
              ))}
              {!query && <AddWidgetCard />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardMainContent;
