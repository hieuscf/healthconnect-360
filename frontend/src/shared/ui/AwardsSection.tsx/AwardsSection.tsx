import React from "react";
import { Award, ArrowRight, ArrowUp } from "lucide-react";
import awards from "./AwardsSectionData";

export default function AwardsSection() {
  

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Section - Title and Description */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
              Awards
              <br />
              <span className="text-blue-600">& Accolades</span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
              Our commitment to excellence and innovation has established Doctor
              Anywhere as a multi-award-winning company, recognized across Asia
              and beyond.
            </p>
          </div>

          {/* Right Section - Awards List */}
          <div className="space-y-10">
            {awards.map((award, index) => (
              <div key={award.id} className="group cursor-pointer">
                <div className="flex items-start space-x-5 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition duration-200">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
                      {award.title}
                    </h3>
                    <p className="text-gray-500 font-medium">{award.source}</p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition duration-300">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                {/* Line Divider */}
                {index < awards.length - 1 && (
                  <div className="ml-16 mt-6 border-b border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition duration-300"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
