import React from "react";
import { User, Upload, Download, type LucideIcon } from "lucide-react";

interface HeaderProps {
  icon?: LucideIcon; // icon có thể thay đổi
  title: string; // tiêu đề động
  onImport?: () => void; // callback khi bấm import
  onExport?: () => void; // callback khi bấm export
  showActions?: boolean; // có hiển thị Import/Export không
}

const Header: React.FC<HeaderProps> = ({
  icon: Icon = User,
  title,
  onImport,
  onExport,
  showActions = true,
}) => {
  return (
    <div className="bg-white shadow-sm border-b border-gray-200 rounded-b-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center space-x-3">
            <Icon className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          </div>

          {/* Right side */}
          {showActions && (
            <div className="flex items-center space-x-3">
              <button
                onClick={onImport}
                className="flex items-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <Upload className="h-4 w-4 mr-2" />
                Import
              </button>
              <button
                onClick={onExport}
                className="flex items-center px-3 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
