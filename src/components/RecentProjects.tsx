import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const RecentProjects = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const projects = [
    {
      title: "Our school in Burco graduating and ranking on top",
      description: "We not only focus on their education but also their wellbeing, emotional support, health care, and transport access. We thank the families, teachers, and school staff for all they have done.",
      image: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/08bc1dc1514cfc09b8f523c5806be1eb.jfif",
      category: "Education",
      date: "Completed June 2024",
      categoryColor: "bg-blue-600 text-white"
    },
    {
      title: "Water aid support across the country",
      description: "We try to reach places that most NGOs or foreign aid don't reach during drought seasons. Thousands of people rely on us every year for critical water access.",
      image: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/e0eabc37b88dcf27bd2e2c27ba369097.jfif",
      category: "Water Access",
      date: "Completed May 2023",
      categoryColor: "bg-teal-600 text-white"
    },
    {
      title: "Youth Employment & Support",
      description: "Unemployment is an issue that we are still trying to solve in our communities through hands-on training and youth initiatives.",
      image: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/a83fce7a3fe8d834f9495c5e7350bd70.jfif",
      category: "Youth Employment",
      date: "Completed April 2024",
      categoryColor: "bg-orange-600 text-white"
    }
  ];

  // Auto-advance slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [projects.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % projects.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);

  const activeProject = projects[currentSlide];

  return (
    <section className="relative w-full bg-gray-900 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out transform scale-105"
        style={{ backgroundImage: `url(${activeProject.image})` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 md:py-32">
        <div className="text-center md:text-left mb-6">
          <h2 className="text-sm uppercase tracking-wider font-semibold text-gray-300 mb-2">Recent Projects Spotlight</h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="w-full md:w-2/3 lg:w-1/2 md:pr-8">
            <div className="mb-6 flex flex-wrap gap-2 items-center justify-center md:justify-start">
              <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide ${activeProject.categoryColor}`}>
                {activeProject.category}
              </span>
              <span className="text-gray-300 text-sm font-medium border border-gray-500 rounded-full px-4 py-1.5">
                {activeProject.date}
              </span>
            </div>

            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight transition-all duration-500 min-h-[100px] md:min-h-[120px]">
              {activeProject.title}
            </h3>

            <p className="text-lg text-gray-200 mb-8 max-w-xl transition-all duration-500 min-h-[90px]">
              {activeProject.description}
            </p>

            <button className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition whitespace-nowrap shadow-lg">
              Explore Project Details
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all z-20"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all z-20"
        aria-label="Next project"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-blue-500 w-8' : 'bg-white/50 hover:bg-white/80'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentProjects;