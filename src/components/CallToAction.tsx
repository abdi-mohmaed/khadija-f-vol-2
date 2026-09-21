import React from 'react';

interface CallToActionProps {
  setCurrentPage: (page: string) => void;
}

const CallToAction: React.FC<CallToActionProps> = ({ setCurrentPage }) => {
  return (
    <section className="cta-section py-16 md:py-24 relative">
      <div className="absolute inset-0 bg-blue-600/80"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in Making a Difference</h2>
          <p className="text-xl mb-8">
            Your support can transform lives and communities across Somaliland. Together, we can build a brighter future for those in need.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition whitespace-nowrap"
            >
              Donate Now
            </button>
            <button
              onClick={() => setCurrentPage('contact')}
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-lg font-medium hover:bg-white/10 transition whitespace-nowrap"
            >
              Become a Volunteer
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;