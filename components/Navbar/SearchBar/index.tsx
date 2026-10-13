"use client";

import { SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

import { useDashboardStore } from "@/store/dashboardStore";

const SearchInput = () => {
  const searchQuery = useDashboardStore((state) => state.searchQuery);
  const setSearchQuery = useDashboardStore((state) => state.setSearchQuery);

  return (
    <div className="w-1/2 md:w-1/3 2xl:w-1/5 flex justify-center items-center border rounded-sm px-2 border-blue-200 bg-blue-50/50">
      <SearchIcon className="text-gray-400" size={20} />
      <Input
        className="text-sm md:text-md border-none outline-none shadow-none focus-visible:ring-0 bg-transparent"
        placeholder="Search anything..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default SearchInput; 