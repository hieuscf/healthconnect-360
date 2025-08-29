import React from "react";
import { ChevronDown } from "lucide-react";

const Topbar = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm font-epilogue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left - Flag + Dropdown */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <img
                src="https://flagcdn.com/w40/sg.png"
                alt="Singapore Flag"
                className="w-8 h-6 object-cover rounded-sm"
              />
              <div className="ml-3 relative group">
                <div className="flex items-center cursor-pointer">
                  <span className="text-gray-700 hover:text-gray-900 transition-colors">
                    DA Singapore
                  </span>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-700" />
                </div>

                {/* Dropdown on hover */}
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                  {["DA Singapore", "DA Malaysia", "DA Thailand"].map(
                    (item) => (
                      <a
                        key={item}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item}
                      </a>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                About
              </a>
            </nav>
          </div>

          {/* Right - Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {["Health Library", "Help Centre", "Contact Us"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Mobile button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      
      <div className="md:hidden border-t border-gray-200 bg-white">
        <div className="px-4 py-2 space-y-1">
          {["About", "Health Library", "Help Centre", "Contact Us"].map(
            (item) => (
              <a
                key={item}
                href="#"
                className="block px-3 py-2 text-base text-gray-700 hover:text-gray-900 hover:bg-gray-50"
              >
                {item}
              </a>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
