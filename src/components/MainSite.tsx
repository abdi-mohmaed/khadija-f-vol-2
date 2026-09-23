import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import ImageSlideshow from './ImageSlideshow';
import Impact from './Impact';
import RecentProjects from './RecentProjects';
import OurPrograms from './OurPrograms';
import AboutUs from './AboutUs';
import Contact from './Contact';
import Newsletter from './Newsletter';
import CallToAction from './CallToAction';
import Footer from './Footer';

const MainSite: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'about':
        return <AboutUs setCurrentPage={setCurrentPage} />;
      case 'programs':
        return <OurPrograms setCurrentPage={setCurrentPage} />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <ImageSlideshow />
            <Impact />
            <RecentProjects setCurrentPage={setCurrentPage} />
            <OurPrograms setCurrentPage={setCurrentPage} />
            <Newsletter />
            <CallToAction setCurrentPage={setCurrentPage} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default MainSite;
