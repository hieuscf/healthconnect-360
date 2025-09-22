export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterField {
  name: string; // ví dụ "specialization"
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export interface FiltersProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  fields?: FilterField[]; // mảng các filter dropdown động
  viewMode?: "grid" | "list";
  onViewModeChange?: (value: "grid" | "list") => void;
  addLabel?: string;
  onAdd?: () => void;
}