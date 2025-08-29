import React from "react";
import { Search } from "../../shared/components/Search";
import { BellNotification } from "../../shared/components/BellNotification";
import { Avatar } from "../../shared/components/Avatar";

export const Topbar = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 px-12 flex items-center justify-between shadow-sm">
      {/* Search */}
      <div className="flex items-center w-1/3">
        <Search />
      </div>

      {/* User actions */}
      <div className="flex items-center space-x-6">
        <BellNotification />
        <Avatar />
      </div>
    </div>
  );
};


