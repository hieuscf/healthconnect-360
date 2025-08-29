import React, { useEffect, useState } from "react";
import services from "./ServiceData";

const ServicesSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("services-section");
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services-section" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-16 text-gray-800">
          Our Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-[1.02] ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-6">
                <img
                  src={service.image}
                  alt={service.title}
                  className="h-20 w-20 object-contain"
                />
              </div>

              <h3 className="text-xl font-semibold text-center mb-3 text-gray-800">
                {service.title}
              </h3>

              {/* Bạn có thể thêm mô tả nếu cần:
              <p className="text-sm text-gray-500 text-center mb-4">
                Description here...
              </p> */}

              <div className="flex justify-center flex-wrap gap-3 mt-4">
                {service.buttons.map((btn, i) => (
                  <button
                    key={i}
                    className={`px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 ${btn.color}`}
                  >
                    {btn.text}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
