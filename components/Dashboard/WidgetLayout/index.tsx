import DonutChart from "@/components/Dashboard/Charts/DonutChart";
import StackedBarChart from "@/components/Dashboard/Charts/StackedBar";
import TextWidget from "@/components/Dashboard/Charts/TextWidget";

import { WidgetData } from "@/types/dashboard";

const WidgetLayout = ({ type, data }: { type: string; data: WidgetData }) => {
 
    if (type === "donut") {
    return <DonutChart data={data} />;
  } else if (type === "bar") {
    return <StackedBarChart data={data} />;
  } else if (type === "text" && typeof data === "string") {
    return <TextWidget data={data} />;
  }
 
  return null;
};

export default WidgetLayout;
