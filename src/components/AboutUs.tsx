import React from 'react';
import { Heart, Users, Target, Award, Calendar, MapPin, Mail, Phone } from 'lucide-react';
import ImageSlideshow from './ImageSlideshow';

const AboutUs = () => {
  // Image collections for each section
  const heroImages = [
    "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6647003/pexels-photo-6647003.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6646919/pexels-photo-6646919.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6647120/pexels-photo-6647120.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6646866/pexels-photo-6646866.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const missionImages = [
    "https://images.pexels.com/photos/8363028/pexels-photo-8363028.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8363102/pexels-photo-8363102.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8363103/pexels-photo-8363103.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8363104/pexels-photo-8363104.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8363105/pexels-photo-8363105.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const storyImages = [
    "https://images.pexels.com/photos/8613313/pexels-photo-8613313.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8613315/pexels-photo-8613315.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8613316/pexels-photo-8613316.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8613317/pexels-photo-8613317.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const timelineImages = [
    "https://images.pexels.com/photos/8923671/pexels-photo-8923671.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8923672/pexels-photo-8923672.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8923673/pexels-photo-8923673.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8923674/pexels-photo-8923674.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8923675/pexels-photo-8923675.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const valuesImages = [
    "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6647000/pexels-photo-6647000.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6647001/pexels-photo-6647001.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6647002/pexels-photo-6647002.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6647004/pexels-photo-6647004.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const teamImages = [
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
    "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400"
  ];

  const contactImages = [
    "https://images.pexels.com/photos/8363106/pexels-photo-8363106.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8363107/pexels-photo-8363107.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8363108/pexels-photo-8363108.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8363109/pexels-photo-8363109.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8363110/pexels-photo-8363110.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const teamMembers = [
    {
      name: "Dr. Amina Khadija",
      role: "Founder & Executive Director",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Dr. Amina founded Khadija Foundation in 2010 with a vision to transform lives across Somaliland. With over 15 years of experience in humanitarian work."
    },
    {
      name: "Mohamed Hassan",
      role: "Program Director",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Mohamed oversees all our program implementations and ensures quality delivery of services to communities across Somaliland."
    },
    {
      name: "Fatima Ahmed",
      role: "Education Coordinator",
      image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Fatima leads our education initiatives and has been instrumental in establishing schools and educational programs for orphaned children."
    },
    {
      name: "Ibrahim Abdi",
      role: "Community Outreach Manager",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Ibrahim manages our community relationships and ensures our programs reach the most vulnerable populations in remote areas."
    }
  ];

  const milestones = [
    {
      year: "2010",
      title: "Foundation Established",
      description: "Khadija Foundation was founded with a mission to support orphaned children and vulnerable families in Somaliland."
    },
    {
      year: "2012",
      title: "First School Built",
      description: "Opened our first school in Hargeisa, providing education to 200 orphaned and underprivileged children."
    },
    {
      year: "2015",
      title: "Water Projects Launched",
      description: "Began our water access initiatives, drilling wells and providing clean water to rural communities."
    },
    {
      year: "2018",
      title: "Youth Employment Program",
      description: "Launched vocational training and job placement programs to address youth unemployment."
    },
    {
      year: "2020",
      title: "COVID-19 Response",
      description: "Provided emergency relief and healthcare support during the pandemic, reaching over 5,000 families."
    },
    {
      year: "2024",
      title: "Expanded Operations",
      description: "Now operating across all major cities in Somaliland, supporting over 14,000 orphans and 8,000 families."
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every situation with empathy and understanding, treating each person with dignity and respect."
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in the power of community and work collaboratively with local leaders and families."
    },
    {
      icon: Target,
      title: "Impact",
      description: "We focus on sustainable solutions that create lasting positive change in people's lives."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in all our programs and maintain transparency in our operations."
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-16 md:pb-24 relative overflow-hidden">
        {/* Somaliland Map Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/4854568689_b1d736d15b_b.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="absolute inset-0 bg-blue-600/85"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Khadija Foundation</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Empowering communities across Somaliland through sustainable development and humanitarian aid since 2010
              </p>
              <div className="flex flex-wrap gap-8 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold">15+</div>
                  <div className="text-blue-200">Years of Service</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold">22K+</div>
                  <div className="text-blue-200">Lives Impacted</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold">2,765</div>
                  <div className="text-blue-200">Projects Completed</div>
                </div>
              </div>
            </div>
            <div>
              <ImageSlideshow 
                images={heroImages} 
                height="h-96"
                className="shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                Our mission is to uplift and support orphans, vulnerable children, youth, and low-income families who are struggling with hunger, lack of clean water, education, and the devastating impact of drought. We believe that these lives—so often overlooked—carry the hope and promise of our nation's future. Every child deserves a chance to dream, every family deserves dignity, and no one should be left behind.
              </p>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-700">
                We envision a world where no child goes to bed hungry, no family suffers in silence, and every young person—no matter their background—has the opportunity to learn, grow, and thrive. At Khadija Foundation, we dream of a future where orphans are embraced with love, where communities burdened by poverty and drought are lifted with dignity, and where hope replaces hardship. Our vision is to build a stronger, more compassionate nation—one life at a time.
              </p>
            </div>
            <div>
              <ImageSlideshow 
                images={missionImages} 
                height="h-96"
                className="shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming one of Somaliland's most trusted humanitarian organizations
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ImageSlideshow 
                images={storyImages} 
                height="h-80"
                className="shadow-lg"
              />
            </div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <p className="text-lg text-gray-700 mb-6">
                Khadija Foundation was born from a simple yet powerful belief: that every child deserves a chance to 
                thrive, regardless of their circumstances. Founded in 2010 by Dr. Amina Khadija, our organization 
                began as a small initiative to support orphaned children in Hargeisa.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                What started as providing basic necessities to a handful of children has grown into a comprehensive 
                network of programs serving thousands across Somaliland. We've learned that sustainable change requires 
                more than just immediate relief – it requires education, community engagement, and long-term solutions.
              </p>
              <p className="text-lg text-gray-700">
                Today, we're proud to be a trusted partner to communities throughout Somaliland, working hand-in-hand 
                with local leaders, families, and other organizations to create lasting positive change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Key milestones in our mission to transform lives across Somaliland
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <ImageSlideshow 
                images={timelineImages} 
                height="h-96"
                className="shadow-lg sticky top-8"
              />
            </div>
            <div>
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
                
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start mb-12 last:mb-0">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                      {milestone.year}
                    </div>
                    <div className="ml-8 bg-white rounded-lg shadow-md p-6 flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                      <p className="text-gray-700">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <ImageSlideshow 
                images={valuesImages} 
                height="h-80"
                className="shadow-lg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the dedicated individuals leading our mission to transform lives
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <ImageSlideshow 
                images={teamImages} 
                height="h-80"
                className="shadow-lg"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-2 text-sm">{member.role}</p>
                    <p className="text-gray-600 text-xs">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Somaliland Map Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/4854568689_b1d736d15b_b.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="absolute inset-0 bg-blue-600/85"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Get in Touch</h2>
              <p className="text-xl mb-8 opacity-90">
                Ready to join us in making a difference? We'd love to hear from you.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Visit Us</h3>
                    <p className="opacity-90">Airport road, Masalaha, Hargeisa, Somaliland</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Call Us</h3>
                    <p className="opacity-90">+252 63 478 3176</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Email Us</h3>
                    <p className="opacity-90">info@khadijafoundation.org</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition whitespace-nowrap text-center">
                  Donate Now
                </a>
                <a href="#" className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition whitespace-nowrap text-center">
                  Become a Volunteer
                </a>
              </div>
            </div>
            <div>
              <ImageSlideshow 
                images={contactImages} 
                height="h-96"
                className="shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;