import React from 'react';
import { ArrowRight, Heart, GraduationCap, Home, Droplets, Utensils, Gift, Building, School } from 'lucide-react';

const OurPrograms = () => {
  const programs = [
    {
      title: "Orphanages Support Program",
      description: "Providing comprehensive care, emotional support, and essential resources for orphaned children across Somaliland, ensuring they receive the love and attention they deserve.",
      image: "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: Heart
    },
    {
      title: "Orphanages School Program",
      description: "Establishing and supporting educational facilities specifically for orphaned children, providing quality education and creating pathways to brighter futures.",
      image: "https://images.pexels.com/photos/8613313/pexels-photo-8613313.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: GraduationCap
    },
    {
      title: "Low Income Families Support Program",
      description: "Offering financial assistance, healthcare support, and essential resources to vulnerable families struggling with poverty and economic hardship.",
      image: "https://images.pexels.com/photos/6647003/pexels-photo-6647003.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: Heart
    },
    {
      title: "Low Income Families Housing Program",
      description: "Building and renovating homes for families in need, providing safe, dignified housing solutions that create stable foundations for family life.",
      image: "https://images.pexels.com/photos/8363028/pexels-photo-8363028.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: Home
    },
    {
      title: "Water Supply Aid Program",
      description: "Developing sustainable water infrastructure including wells, water purification systems, and distribution networks to address critical water shortages in rural communities.",
      image: "https://images.pexels.com/photos/8923671/pexels-photo-8923671.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: Droplets
    },
    {
      title: "Food Aid Program",
      description: "Providing emergency food assistance and establishing sustainable food security programs for families and communities facing hunger and malnutrition.",
      image: "https://images.pexels.com/photos/6647120/pexels-photo-6647120.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: Utensils
    },
    {
      title: "Ramadan Food Aid Program",
      description: "Special food distribution program during the holy month of Ramadan, providing iftar meals and food packages to ensure no family goes without during this sacred time.",
      image: "https://images.pexels.com/photos/8363102/pexels-photo-8363102.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: Gift
    },
    {
      title: "Eid Adha Program",
      description: "Celebrating Eid al-Adha by providing meat distribution to needy families, ensuring everyone can participate in this important religious celebration with dignity.",
      image: "https://images.pexels.com/photos/6646866/pexels-photo-6646866.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: Gift
    },
    {
      title: "Charitable Construction to Mosques Program",
      description: "Building and renovating mosques to serve as spiritual centers for communities, providing places of worship, learning, and community gathering.",
      image: "https://images.pexels.com/photos/8363103/pexels-photo-8363103.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: Building
    },
    {
      title: "Charitable Construction to Schools Program",
      description: "Constructing modern educational facilities equipped with proper classrooms, libraries, and learning resources to advance education in underserved areas.",
      image: "https://images.pexels.com/photos/8923672/pexels-photo-8923672.jpeg?auto=compress&cs=tinysrgb&w=600",
      icon: School
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-16 md:pb-24 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/6647001/pexels-photo-6647001.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="absolute inset-0 bg-blue-600/85"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Programs</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Discover how Khadija Foundation is making a difference through our multiple core program areas addressing critical needs in Somaliland.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold">10</div>
                <div className="text-blue-200">Core Programs</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">22K+</div>
                <div className="text-blue-200">Lives Impacted</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold">15+</div>
                <div className="text-blue-200">Years of Service</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Programs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each program is designed to address specific challenges facing communities in Somaliland, creating sustainable solutions and lasting impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <div className="h-48 md:h-full overflow-hidden">
                      <img 
                        src={program.image} 
                        alt={program.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <program.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{program.description}</p>
                    <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 text-sm">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/6647002/pexels-photo-6647002.jpeg?auto=compress&cs=tinysrgb&w=1200')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="absolute inset-0 bg-blue-600/85"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Support Our Programs</h2>
            <p className="text-xl mb-8 opacity-90">
              Your contribution can help us expand these vital programs and reach even more communities in need across Somaliland.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="#" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition whitespace-nowrap">
                Donate Now
              </a>
              <a href="#" className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition whitespace-nowrap">
                Become a Partner
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OurPrograms;