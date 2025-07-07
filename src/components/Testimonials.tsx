import React from 'react';
import { Quote, User } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "The new school built by Khadija Foundation has changed everything for our children. Now they have a safe place to learn and dream of a better future. My daughter wants to become a doctor now.",
      name: "Amina Hassan",
      location: "Parent, Hargeisa"
    },
    {
      quote: "The water well project has transformed our village. Women no longer have to walk for hours to fetch water. Our children are healthier, and we can grow vegetables again.",
      name: "Ibrahim Abdi",
      location: "Community Elder, Burao"
    },
    {
      quote: "The digital skills program gave me hope and a future. I now work as a web developer and can support my family. This opportunity changed my life completely.",
      name: "Fartun Mohamed",
      location: "Program Graduate, Hargeisa"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Voices of Impact</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear from the communities and individuals whose lives have been transformed through our programs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8">
              <div className="text-blue-600 mb-4">
                <Quote className="w-10 h-10" />
              </div>
              <p className="text-gray-700 mb-6">{testimonial.quote}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;