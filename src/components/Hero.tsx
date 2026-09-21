import React from 'react';

interface HeroProps {
  setCurrentPage: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setCurrentPage }) => {
  return (
    <section className="hero-section pt-20 md:pt-24 w-full">
      <div className="hero-overlay w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 md:pr-12 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Where there is need, we are there
                Across all of Somaliland
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Khadija Foundation is dedicated to providing sustainable solutions for vulnerable communities in Somaliland through education, healthcare, and humanitarian aid programs and low income families, orphans. Since we started in 2010
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setCurrentPage('programs')}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition whitespace-nowrap"
                >
                  Our Programs
                </button>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition whitespace-nowrap"
                >
                  Get Involved
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              {/* This space intentionally left empty to showcase the background image */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;