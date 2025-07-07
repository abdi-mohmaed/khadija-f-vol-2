import React, { useEffect, useState, useRef } from 'react';

const Impact = () => {
  const [counts, setCounts] = useState({
    orphans: 0,
    families: 0,
    projects: 0,
    schools: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const targets = {
    orphans: 14000,
    families: 8000,
    projects: 2765,
    schools: 5
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const frameRate = 60;
    const totalFrames = Math.round(duration / (1000 / frameRate));
    
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      setCounts({
        orphans: Math.round(targets.orphans * progress),
        families: Math.round(targets.families * progress),
        projects: Math.round(targets.projects * progress),
        schools: Math.round(targets.schools * progress)
      });
      
      if (frame >= totalFrames) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, 1000 / frameRate);
  };

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Impact</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Since 2015, Khadija Foundation has been making a meaningful difference in the lives of thousands across Somaliland.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="stat-item text-center px-4 py-6">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {counts.orphans.toLocaleString()}
              </div>
              <p className="text-gray-600 font-medium">Orphans</p>
            </div>
            <div className="stat-item text-center px-4 py-6">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {counts.families.toLocaleString()}
              </div>
              <p className="text-gray-600 font-medium">Low income families aids</p>
            </div>
            <div className="stat-item text-center px-4 py-6">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {counts.projects.toLocaleString()}
              </div>
              <p className="text-gray-600 font-medium">Projects</p>
            </div>
            <div className="stat-item text-center px-4 py-6">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {counts.schools.toLocaleString()}
              </div>
              <p className="text-gray-600 font-medium">Schools</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;