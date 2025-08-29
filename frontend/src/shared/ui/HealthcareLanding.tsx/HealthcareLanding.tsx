import React from "react";
import { ArrowRight } from "lucide-react";

export default function HealthcareLanding() {
  return (
    <div className="h-[600px] bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Main heading */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          A quality care experience,{" "}
          <span className="text-blue-600">wherever you are</span>
        </h1>

        {/* Description text */}
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          We're all about providing you and your family with trusted,
          personalised care. With our telehealth app, physical clinics, health
          screening centers, and mobile medical teams, we make it easy to get
          the health and wellness support you need, wherever you are.
        </p>

        {/* CTA button */}
        <button className="group inline-flex items-center px-6 py-3 bg-transparent border-none text-blue-600 font-medium text-lg hover:text-blue-800 transition-colors duration-200">
          Learn how we bring quality care to you
          <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 right-8">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200 cursor-pointer">
          <ArrowRight className="w-5 h-5 text-gray-600 transform rotate-90" />
        </div>
      </div>
    </div>
  );
}
