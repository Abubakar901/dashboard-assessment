export type Segment = { label: string; value: number; color: string };

export type ChartData = {
  total: number;
  totalLabel?: string;
  segments: Segment[];
};

export type WidgetData = ChartData | string | null;

export type WidgetType = "donut" | "bar" | "text" | "empty";

export type Widget = {
  id: string;
  name: string;
  type: WidgetType;
  active: boolean;
  data: WidgetData;
};

export type Category = {
  id: string;
  name: string;
  tab: string;
  widgets: Widget[];
};

export type DashboardJson = {
  categories: Category[];
};
