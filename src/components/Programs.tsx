import React from 'react';
import { ArrowRight } from 'lucide-react';
interface ProgramsProps {
  setCurrentPage: (page: string) => void;
}

const Programs: React.FC<ProgramsProps> = ({ setCurrentPage }) => {
  const programs = [
    {
      title: "Orphan Care & Support",
      description: "Providing comprehensive care, education, and emotional support for orphaned children across Somalia, ensuring they have the opportunity to thrive.",
      image: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/3b376c440400ab2e9d306b5665ae38c9.jfif"
    },
    {
      title: "Education Initiatives",
      description: "Building and supporting schools that provide quality education to orphaned and underprivileged children, empowering the next generation.",
      image: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/fdabed76848f547f1299ba58e7ab1b6f.jfif"
    },
    {
      title: "Family Assistance",
      description: "Supporting vulnerable families with essential resources, healthcare access, and sustainable livelihood opportunities to break the cycle of poverty.",
      image: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/2afc35b342cda4b93acade6de7b2be11.jfif"
    },
    {
      title: "Drought Relief",
      description: "Providing emergency food aid and water supplies to communities affected by drought, while implementing long-term solutions for food security.",
      image: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/8ed814d21d4571b12ac4d42c70319de5.jfif"
    },
    {
      title: "Youth Employment",
      description: "Creating opportunities for young people through vocational training, entrepreneurship programs, and job placement services to combat unemployment.",
      image: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/1f927991aa474710ecabcd9f4cb85568.jfif"
    },
    {
      title: "Water Access Projects",
      description: "Developing sustainable water infrastructure including wells, water purification systems, and rainwater harvesting to address critical water shortages.",
      image: "https://static.readdy.ai/image/adf562689ffc9835cd635ce609fa5c86/b6a93f5c1bf5b5eec9de19805ad88228.jfif"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Programs</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover how Khadija Foundation is making a difference through our six core program areas addressing critical needs in Somaliland.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="h-48 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <button
                  onClick={() => setCurrentPage('programs')}
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;