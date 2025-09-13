import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../features/auth/model/authStore";
import { DropdownData } from "../model/DropdownData";

const Navigation = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showYouDropdown, setShowYouDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <header className="relative bg-white shadow-sm border-b border-gray-100 font-Outfit ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="https://user.doctoranywhere.com/image/company_logo?img_id=253959&t=1650037832742"
                alt="Company Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right side - Nav links + CTA */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex items-center space-x-8">
              <div className="">
                <button
                  onClick={() => setShowYouDropdown(!showYouDropdown)}
                  onMouseEnter={() => setShowYouDropdown(true)}
                  className="flex items-center text-gray-700 hover:text-gray-900 text-lg font-bold transition-colors duration-200 focus:outline-none"
                >
                  Healthcare for You
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>

                {showYouDropdown && (
                  <div
                    className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
                    onMouseLeave={() => setShowYouDropdown(false)}
                  >
                    <div className="max-w-7xl mx-auto grid grid-cols-4 gap-6 p-8">
                      {Object.entries(DropdownData).map(([category, items]) => (
                        <div key={category} className="space-y-4">
                          <h3 className="font-bold text-lg text-teal-600 border-b border-gray-200 pb-2">
                            {category}
                          </h3>
                          <ul className="space-y-3">
                            {items.map((item, index) => (
                              <li key={index}>
                                <a
                                  href="#"
                                  className="text-teal-600 hover:text-teal-800 text-sm font-Outfit transition-colors duration-200 block"
                                >
                                  {item}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 text-lg font-bold transition-colors duration-200"
              >
                Store
              </a>
            </nav>

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="text-gray-800 text-lg font-semibold focus:outline-none hover:text-blue-600"
                >
                  Profile
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Thông tin cá nhân
                    </Link>
                    <Link
                      to="/change-password"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Đổi mật khẩu
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/signin"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold px-6 py-2 rounded-full transition duration-200"
              >
                Login now
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
