const TextWidget = ({ data }: { data: string | null }) => {
  return (
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
      {data || "No text added."}
    </p>
  );
};

export default TextWidget;