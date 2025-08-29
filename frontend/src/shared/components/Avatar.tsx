import React, { useState } from "react";
import { LogOut, User, Settings, HelpCircle } from "lucide-react";

export const Avatar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      {/* Avatar */}
      <img
        src="https://i.pravatar.cc/40"
        alt="user avatar"
        className="w-10 h-10 rounded-full cursor-pointer border"
        onClick={() => setOpen(!open)}
      />

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border p-4 z-50">
          <div className="mb-3">
            <h4 className="text-sm font-semibold text-gray-800">
              Musharof Chowdhury
            </h4>
            <p className="text-xs text-gray-500">randomuser@pimjo.com</p>
          </div>
          <div className="space-y-2">
            <button className="flex items-center w-full text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg">
              <User className="w-4 h-4 mr-2" /> Edit profile
            </button>
            <button className="flex items-center w-full text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg">
              <Settings className="w-4 h-4 mr-2" /> Account settings
            </button>
            <button className="flex items-center w-full text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg">
              <HelpCircle className="w-4 h-4 mr-2" /> Support
            </button>
            <hr />
            <button className="flex items-center w-full text-sm text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg">
              <LogOut className="w-4 h-4 mr-2" /> Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
