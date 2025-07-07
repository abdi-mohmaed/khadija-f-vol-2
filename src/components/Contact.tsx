import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, User, Building } from 'lucide-react';
import ImageSlideshow from './ImageSlideshow';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  // Image collections for slideshow
  const contactImages = [
    "https://images.pexels.com/photos/8363106/pexels-photo-8363106.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8363107/pexels-photo-8363107.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8363108/pexels-photo-8363108.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8363109/pexels-photo-8363109.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/8363110/pexels-photo-8363110.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const officeImages = [
    "https://images.pexels.com/photos/6647000/pexels-photo-6647000.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6647001/pexels-photo-6647001.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6647002/pexels-photo-6647002.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6647004/pexels-photo-6647004.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=800"
  ];

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: "Airport road, Masalaha, Hargeisa, Somaliland",
      description: "Our main office is open Monday through Friday. Visitors are welcome during business hours."
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+252 63 478 3176",
      description: "Speak directly with our team. Available during business hours for immediate assistance."
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "info@khadijafoundation.org",
      description: "Send us a detailed message and we'll respond within 24 hours."
    },
    {
      icon: Clock,
      title: "Office Hours",
      details: "Sunday - Thursday: 8:00 AM - 5:00 PM",
      description: "Friday: 8:00 AM - 12:00 PM. Closed on Saturdays."
    }
  ];

  const departments = [
    {
      name: "General Inquiries",
      email: "info@khadijafoundation.org",
      description: "For general questions about our organization and programs"
    },
    {
      name: "Donations & Partnerships",
      email: "donations@khadijafoundation.org",
      description: "For donation inquiries and partnership opportunities"
    },
    {
      name: "Volunteer Programs",
      email: "volunteer@khadijafoundation.org",
      description: "For volunteering opportunities and community involvement"
    },
    {
      name: "Media & Press",
      email: "media@khadijafoundation.org",
      description: "For media inquiries and press-related matters"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 md:pt-24 pb-16 md:pb-24 relative overflow-hidden">
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
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                We're here to help and answer any questions you might have. We look forward to hearing from you.
              </p>
              <div className="flex flex-wrap gap-8 text-center">
                <div>
                  <div className="text-3xl md:text-4xl font-bold">24hrs</div>
                  <div className="text-blue-200">Response Time</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold">15+</div>
                  <div className="text-blue-200">Years of Service</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold">100%</div>
                  <div className="text-blue-200">Transparency</div>
                </div>
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

      {/* Contact Information */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Multiple ways to reach us. Choose the method that works best for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-blue-600 font-medium mb-2">{info.details}</p>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Office Info */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                      placeholder="+252 XX XXX XXXX"
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="donation">Donation</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="partnership">Partnership</option>
                      <option value="media">Media</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    placeholder="Brief subject of your message"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Office Information */}
            <div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Office</h3>
                <ImageSlideshow 
                  images={officeImages} 
                  height="h-64"
                  className="shadow-lg mb-6"
                />
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Khadija Foundation Headquarters</h4>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Address</p>
                        <p className="text-gray-600">Airport road, Masalaha, Hargeisa, Somaliland</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Office Hours</p>
                        <p className="text-gray-600">Sunday - Thursday: 8:00 AM - 5:00 PM</p>
                        <p className="text-gray-600">Friday: 8:00 AM - 12:00 PM</p>
                        <p className="text-gray-600">Saturday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Department Contacts */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Department Contacts</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Reach out to specific departments for faster, more targeted assistance.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Building className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{dept.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{dept.email}</p>
                    <p className="text-gray-600 text-sm">{dept.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 md:py-24 relative overflow-hidden">
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
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Emergency Contact</h2>
            <p className="text-xl mb-8 opacity-90">
              For urgent humanitarian assistance or emergency situations, please contact us immediately.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="tel:+252638555577" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition whitespace-nowrap flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Emergency Hotline: +252 63 855 5577
              </a>
              <a href="mailto:emergency@khadijafoundation.org" className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition whitespace-nowrap flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" />
                Emergency Email
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;