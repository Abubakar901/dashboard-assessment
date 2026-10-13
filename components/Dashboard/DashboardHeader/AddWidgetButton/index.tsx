import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useDashboardStore } from "@/store/dashboardStore";

const AddWidgetButton = () => {
  const toggleSidePanel = useDashboardStore((s) => s.toggleSidePanel);

  return (
    <Button
      variant="dashboard"
      className="h-10"
      size="sm"
      onClick={toggleSidePanel}
    >
      Add Widget
      <Plus />
    </Button>
  );
};

export default AddWidgetButton;
