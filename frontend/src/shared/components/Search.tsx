import React from "react";
import { Search as SearchIcon } from "lucide-react";

export const Search = () => (
  <div className="relative w-full max-w-sm">
    <SearchIcon
      size={18}
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
    <input
      type="text"
      placeholder="Search..."
      className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
