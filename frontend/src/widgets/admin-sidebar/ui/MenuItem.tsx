import React, { type ReactNode } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSidebarStore } from "../model/useSidebarStore";

interface Props {
  icon: LucideIcon;
  label: string;
  hasSubmenu?: boolean;
  menuKey: string;
  to?: string; // đường dẫn tới route
  children?: ReactNode;
}

export const MenuItem: React.FC<Props> = ({
  icon: Icon,
  label,
  hasSubmenu,
  menuKey,
  to,
  children,
}) => {
  const { activeMenu, openMenus, toggleMenu, setActiveMenu } =
    useSidebarStore();

  const content = (
    <div
      className={`flex items-center justify-between cursor-pointer py-2 px-2 rounded-lg transition-colors duration-200
        ${
          activeMenu === menuKey
            ? "bg-gray-100 text-blue-600"
            : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
        }`}
      onClick={() => {
        setActiveMenu(menuKey);
        if (hasSubmenu) toggleMenu(menuKey);
      }}
    >
      <div className="flex items-center space-x-3">
        <Icon size={20} className="text-gray-500" />
        <span className="font-medium">{label}</span>
      </div>
      {hasSubmenu && (
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform duration-200 ${
            openMenus[menuKey] ? "rotate-180" : ""
          }`}
        />
      )}
    </div>
  );

  return (
    <div className="px-4">
      {to && !hasSubmenu ? <Link to={to}>{content}</Link> : content}

      {hasSubmenu && openMenus[menuKey] && (
        <div className="ml-8 mt-1 space-y-1">{children}</div>
      )}
    </div>
  );
};
