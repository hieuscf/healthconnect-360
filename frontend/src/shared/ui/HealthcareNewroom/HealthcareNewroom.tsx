import React from "react";
import { ArrowRight, ArrowUp } from "lucide-react";

export default function HealthcareNewsroom() {
  const newsArticles = [
    {
      id: 1,
      date: "January 7, 2025",
      title:
        "Behind-the-scenes at Doctor Anywhere: Delivering trusted, quality care",
      image:
        "https://th.bing.com/th/id/OIP.YA8ylWs14DJv8Jfl6qrazwHaEK?w=265&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      action: "Read more",
      imageAlt: "Doctor Anywhere team members in colorful backgrounds",
    },
    {
      id: 2,
      date: "October 21, 2024",
      title:
        "NYSE Floor Talk: Trends shaping the future of healthcare in SE Asia",
      image:
        "https://th.bing.com/th/id/OIP.YA8ylWs14DJv8Jfl6qrazwHaEK?w=265&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      action: "Watch talk",
      imageAlt: "NYSE floor interview with healthcare professionals",
    },
    {
      id: 3,
      date: "April 22, 2024",
      title:
        "Singlife and DA launch tailored health subscriptions for gig workers",
      image:
        "https://th.bing.com/th/id/OIP.YA8ylWs14DJv8Jfl6qrazwHaEK?w=265&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      action: "Read more",
      imageAlt: "Singlife and Doctor Anywhere team collaboration",
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-16">
          Newsroom
        </h1>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 ">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className="group cursor-pointer rounded-xl transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Article Image */}
              <div className="relative overflow-hidden rounded-xl mb-5 aspect-[4/3]">
                <img
                  src={article.image}
                  alt={article.imageAlt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-xl"></div>
              </div>

              {/* Content */}
              <div className="space-y-3 px-1">
                <p className="text-sm text-gray-500">{article.date}</p>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition duration-200">
                  {article.title}
                </h3>
                <button className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition duration-200">
                  {article.action}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
