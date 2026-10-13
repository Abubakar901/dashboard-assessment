import { Plus } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { useDashboardStore } from "@/store/dashboardStore";

const AddWidgetCard = () => {
  const toggleSidePanel = useDashboardStore((s) => s.toggleSidePanel);

  return (
    <Card className="flex items-center justify-center ">
      <Button
        variant="dashboard"
        className="h-10 w-35 px-4 my-15"
        size="sm"
        onClick={toggleSidePanel}
      >
        <Plus />
        Add Widget
      </Button>
    </Card>
  );
};

export default AddWidgetCard;
