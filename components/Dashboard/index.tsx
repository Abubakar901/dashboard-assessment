"use client";

import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import SideDashboardPanel from "@/components/Dashboard/SidePanel";
import NoResultFound from "@/components/Dashboard/NoResultFound";
import DashboardMainContent from "@/components/Dashboard/MainContent";

import { useDashboardStore } from "@/store/dashboardStore";

const Dashboard = () => {
  const categories = useDashboardStore((s) => s.categories);
  const searchQuery = useDashboardStore((s) => s.searchQuery);

  const query = searchQuery.trim().toLowerCase();

  const isWidgetMatching = (widget: { name: string; data?: unknown }) => {
    const matchesName = widget.name.toLowerCase().includes(query);
    const matchesData =
      typeof widget.data === "string" &&
      widget.data.toLowerCase().includes(query);

    return matchesName || matchesData;
  };

  const filteredCategories = categories?.map((category) => ({
    ...category,
    widgets: category.widgets.filter(
      (widget) => widget.active && (!query || isWidgetMatching(widget)),
    ),
  }));

  const hasMatchingWidgets = filteredCategories?.some(
    (category) => category.widgets.length > 0,
  );

  
  return (
    <main className="px-4 md:px-6 xl:px-10 2xl:px-16 py-6 2xl:py-10 flex flex-col gap-6 sm:gap-4">
      <DashboardHeader />

      {query && !hasMatchingWidgets ? (
        <NoResultFound searchQuery={searchQuery} />
      ) : (
        <DashboardMainContent
          filteredCategories={filteredCategories}
          query={query}
        />
      )}

      <SideDashboardPanel />
    </main>
  );
};

export default Dashboard;
