import React, { useState } from 'react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && agreed) {
      console.log('Newsletter subscription:', { email, agreed });
      // Handle newsletter subscription here
    }
  };

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
          <p className="text-lg text-gray-600 mb-8">
            Subscribe to our newsletter to receive updates on our projects, impact stories, and ways to get involved.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 text-gray-700"
              required
            />
            <button 
              type="submit" 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          
          <div className="mt-6">
            <label className="custom-checkbox text-gray-600 text-sm">
              <input 
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
              />
              <span className="checkmark"></span>
              I agree to receive email updates from Khadija Foundation. You can unsubscribe at any time.
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;