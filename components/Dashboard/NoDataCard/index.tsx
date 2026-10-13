const NoDataCard = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 h-50">
      <svg
        width="52"
        height="44"
        viewBox="0 0 52 44"
        fill="none"
        stroke="#c9ced9"
        strokeWidth="1.5"
      >
        <rect x="4" y="30" width="8" height="12" rx="1" />
        <rect x="16" y="22" width="8" height="20" rx="1" />
        <rect x="28" y="26" width="8" height="16" rx="1" />
        <rect x="40" y="14" width="8" height="28" rx="1" />
        <polyline points="4,22 16,14 28,18 46,4" />
      </svg>
      <p className="text-sm">No Graph data available!</p>
    </div>
  );
};

export default NoDataCard;
