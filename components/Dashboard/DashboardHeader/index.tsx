import { RefreshCw, MoreVertical, Clock } from "lucide-react";

import AddWidgetButton from "@/components/Dashboard/DashboardHeader/AddWidgetButton";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0">
      <h3 className="font-bold text-xl 2xl:text-2xl">CNAPP Dashboard</h3>
      <div className="flex items-center gap-3 sm:gap-4 xl:gap-5">
        <AddWidgetButton />
        <Button variant="dashboard" className="h-10 w-10" size="sm">
          <RefreshCw className="size-3 rotate-120" />
        </Button>
        <Button variant="dashboard" className="h-10 w-10" size="sm">
          <MoreVertical className="size-3" />
        </Button>
        <Select defaultValue="2d">
          <SelectTrigger className="bg-white min-h-10 w-40 shadow-sm font-semibold text-blue-900">
            <Clock className="size-4" />
            |
            <SelectValue />
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectItem value="2d" className=" min-h-10 px-4">
              Last 2 days
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default DashboardHeader;
