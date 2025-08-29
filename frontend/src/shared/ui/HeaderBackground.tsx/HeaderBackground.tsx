import React, { useEffect, useState } from "react";

const HeaderBackground = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="h-[600px] flex items-center bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage:
          "url(https://sg.doctoranywhere.com/images/header_bg.jpg)",
      }}
    >
      {/* Overlay nếu cần */}
      {/* <div className="absolute inset-0 bg-white bg-opacity-20 pointer-events-none"></div> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left side để trống hiển thị ảnh nền */}
          <div></div>

          {/* Right side – Nội dung chữ */}
          <div className="flex justify-end w-full">
            <div className="space-y-6 text-right max-w-xl w-full pr-4">
              {/* Tiêu đề chính */}
              <div className="space-y-4">
                <h1
                  className={`text-5xl lg:text-6xl font-bold text-gray-800 leading-tight transform transition-all duration-1000 ease-out ${
                    isVisible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-12 opacity-0"
                  }`}
                >
                  To a healthier,
                  <br />
                  <span
                    className={`text-gray-700 transform transition-all duration-1000 ease-out delay-200 inline-block ${
                      isVisible
                        ? "translate-x-0 opacity-100"
                        : "translate-x-12 opacity-0"
                    }`}
                  >
                    happier nation
                  </span>
                </h1>
              </div>

              {/* Thương hiệu & slogan */}
              <div
                className={`space-y-6 transform transition-all duration-1000 ease-out delay-400 ${
                  isVisible
                    ? "translate-x-0 opacity-100"
                    : "translate-x-12 opacity-0"
                }`}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-serif italic text-gray-800">
                    Doctor Anywhere
                  </h2>
                  <p className="text-lg text-gray-600">
                    Your homegrown healthcare partner
                  </p>
                </div>

                {/* Nút CTA */}
                <div className="text-right">
                  <button
                    className={`bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg inline-flex items-center group ${
                      isVisible
                        ? "translate-x-0 opacity-100"
                        : "translate-x-12 opacity-0"
                    }`}
                    style={{ transitionDelay: "600ms" }}
                  >
                    See how we put health in your hands
                    <svg
                      className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderBackground;
