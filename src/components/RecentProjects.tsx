import React from 'react';
import { ArrowRight } from 'lucide-react';

const RecentProjects = () => {
  const projects = [
    {
      title: "Our school in burco graduating and ranking on top school in burco ( 2 largest cities in somaliland )",
      description: "We not only focus on there education but also focus in there wellbeing emotionally support, health care, transport access. We thank the mother/family of the orphans and teachers and school staff for all they done",
      image: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/08bc1dc1514cfc09b8f523c5806be1eb.jfif",
      category: "Education",
      date: "Completed June 2024",
      categoryColor: "bg-blue-100 text-blue-800"
    },
    {
      title: "Water aid support across the country",
      description: "We try to reach places that most ngo's , or local or foreign aid doesn't reach on drought seasons more then few thousand people try to rely on us every year.",
      image: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/e0eabc37b88dcf27bd2e2c27ba369097.jfif",
      category: "Water Access",
      date: "Completed May 2023",
      categoryColor: "bg-teal-100 text-teal-800"
    },
    {
      title: "Youths",
      description: "Unemployment is a issue that we are still trying to solve in our communities",
      image: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/a83fce7a3fe8d834f9495c5e7350bd70.jfif",
      category: "Youth Employment",
      date: "Completed April 2024",
      categoryColor: "bg-orange-100 text-orange-800"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Recent Projects</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore some of our recent initiatives making a difference in communities across Somaliland.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <span className={`inline-block px-3 py-1 ${project.categoryColor} rounded-full text-sm font-medium mb-3`}>
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{project.date}</span>
                  <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700">
                    View Details
                    <ArrowRight className="w-5 h-5 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center justify-center bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition whitespace-nowrap">
            View All Projects
            <ArrowRight className="w-5 h-5 ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default RecentProjects;