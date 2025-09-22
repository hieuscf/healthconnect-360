import React from "react";
import { Search, Plus } from "lucide-react";

export interface Option {
  label: string;
  value: string;
}

export interface FilterField {
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Option[];
}

export interface FiltersProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  fields?: FilterField[];
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  addLabel?: string;
  onAdd?: () => void;
}

export const AdminFilters: React.FC<FiltersProps> = ({
  searchTerm = "",
  onSearchChange,
  fields = [],
  viewMode,
  onViewModeChange,
  addLabel,
  onAdd,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          {onSearchChange && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          )}

          {fields.map((field) => (
            <select
              key={field.name}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
            >
              {field.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          ))}
        </div>

        {/* Actions: view mode + add button */}
        <div className="flex items-center space-x-3">
          {viewMode && onViewModeChange && (
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange("grid")}
                className={`p-2 rounded ${
                  viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500"
                }`}
              >
                <div className="grid grid-cols-2 gap-1 w-4 h-4">
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                  <div className="bg-current rounded-sm"></div>
                </div>
              </button>
              <button
                onClick={() => onViewModeChange("list")}
                className={`p-2 rounded ${
                  viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500"
                }`}
              >
                <div className="space-y-1 w-4 h-4">
                  <div className="bg-current h-1 rounded"></div>
                  <div className="bg-current h-1 rounded"></div>
                  <div className="bg-current h-1 rounded"></div>
                </div>
              </button>
            </div>
          )}

          {onAdd && (
            <button
              onClick={onAdd}
              className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              {addLabel || "Thêm mới"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminFilters;
