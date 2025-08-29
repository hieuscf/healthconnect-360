import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-16 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="text-5xl font-bold text-white mb-6">DA</div>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-sm">
              Regional healthcare company supporting the health and well-being of over 2.8 million people in Southeast Asia.
            </p>
            <div className="inline-flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 px-4 py-3 rounded-lg cursor-pointer transition-colors duration-300">
              <div className="w-5 h-5 bg-red-500 rounded-full"></div>
              <span className="text-sm text-white">DA Singapore</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* About Us */}
          <div>
            <h3 className="text-gray-400 font-Outfit mb-6 uppercase tracking-wider text-sm">About Us</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">Our Company</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">News & Updates</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">Career Opportunities</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">Join Our Provider Network</a></li>
            </ul>
          </div>

          {/* Healthcare */}
          <div>
            <h3 className="text-gray-400 font-Outfit mb-6 uppercase tracking-wider text-sm">Healthcare</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">For Children</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">For Students</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">For Self-Employed</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">For Businesses</a></li>
            </ul>
          </div>

          {/* Book an Appointment */}
          <div>
            <h3 className="text-gray-400 font-Outfit mb-6 uppercase tracking-wider text-sm">Book an Appointment</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">Health Screening</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">Childhood Immunisation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">Senior Vaccination</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">Specialist Teleconsult</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">Mental Wellness Teleconsult</a></li>
            </ul>
          </div>

          {/* Part of the DA Group */}
          <div>
            <h3 className="text-gray-400 font-Outfit mb-6 uppercase tracking-wider text-sm">Part of the DA Group</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">DA Telehealth App</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">DA Clinic</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">DA Marketplace</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">DA Orchard MedSuites</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors duration-300 text-base">Asian Healthcare Specialists</a></li>
            </ul>
          </div>
        </div>

        {/* License */}
        <div className="border-t border-gray-600 pt-12 mb-12">
          <p className="text-center text-gray-400 text-base">
            Licensed by MOH. License No. L/17M0116/MDS/003/232
          </p>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-12 border-t border-gray-600">
          <div className="text-gray-400 text-base mb-6 lg:mb-0">
            © 2025 Doctor Anywhere. All Rights Reserved
          </div>
          <div className="flex flex-wrap justify-center lg:justify-end items-center space-x-8">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">DA Group Whistleblowing Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-base">Terms & Conditions</a>
            <button 
              onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
              className="bg-gray-600 hover:bg-gray-500 text-white p-3 rounded-full transition-colors duration-300 ml-8"
              aria-label="Scroll to top"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;