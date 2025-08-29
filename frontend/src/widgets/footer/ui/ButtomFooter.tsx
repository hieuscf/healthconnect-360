import React from "react";

const ButtomFooter = () => {
  const links = [
    { label: "DA Group Whistleblowing Policy", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms & Conditions", href: "#" },
  ];

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center pt-12 border-t border-gray-600">
      {/* Bản quyền */}
      <div className="text-gray-400 text-base mb-6 lg:mb-0">
        © 2025 Doctor Anywhere. All Rights Reserved
      </div>

      {/* Links + nút scroll top */}
      <div className="flex flex-wrap justify-center lg:justify-end items-center gap-6">
        {links.map((link, idx) => (
          <a
            key={idx}
            href={link.href}
            className="text-gray-400 hover:text-white transition-colors duration-300 text-base"
          >
            {link.label}
          </a>
        ))}

        {/* Scroll to top button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-gray-600 hover:bg-gray-500 text-white p-3 rounded-full transition-colors duration-300"
          aria-label="Scroll to top"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 11l5-5m0 0l5 5m-5-5v12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ButtomFooter;
