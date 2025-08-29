import React from 'react';
import { type Logo , logos } from './DuplicatedLogoData';


const AsSeenOn: React.FC = () => {
  
  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <div className="px-20 py-20"> {/* lớp bọc thêm với padding 40px */}
      <div className="bg-gray-50 py-16 overflow-hidden rounded-xl shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-gray-600 tracking-wider uppercase">
              AS SEEN ON
            </h2>
          </div>

          {/* Marquee Container */}
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee space-x-16">
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center min-w-[200px] h-16"
                >
                  <LogoComponent logo={logo} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

// Component for individual logos
const LogoComponent: React.FC<{ logo: Logo }> = ({ logo }) => {
  const getLogoStyle = (name: string) => {
    switch (name) {
      case 'CNA':
        return 'text-red-600 text-2xl font-bold';
      case 'The Straits Times':
        return 'text-gray-500 text-lg font-serif tracking-wide';
      case 'Bloomberg':
        return 'text-gray-600 text-2xl font-bold';
      case 'CNBC':
        return 'text-gray-500 text-2xl font-bold';
      case 'Yahoo':
        return 'text-purple-600 text-2xl font-bold';
      default:
        return 'text-gray-500 text-xl font-medium';
    }
  };

  return (
    <div className="transition-opacity duration-300 hover:opacity-60">
      <span className={getLogoStyle(logo.name)}>{logo.text}</span>
    </div>
  );
};

export default AsSeenOn;





