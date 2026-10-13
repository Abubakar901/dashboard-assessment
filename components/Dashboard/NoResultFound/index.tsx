import { SearchX } from "lucide-react";

const NoResultFound = ({ searchQuery }: { searchQuery: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[350px] border border-dashed rounded-lg bg-gray-50/50 p-8 text-center my-6">
      <div className="bg-blue-100 p-4 rounded-full mb-4 text-blue-600">
        <SearchX size={40} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-1">
        No matching widgets found
      </h3>
      <p className="text-sm text-gray-500 max-w-md mb-4">
        We couldn't find any active widgets matching "<span className="font-semibold text-gray-700">{searchQuery}</span>". Try
        searching with a different keyword.
      </p>
    </div>
  );
};

export default NoResultFound;
