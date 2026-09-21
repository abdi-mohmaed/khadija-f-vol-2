import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Programs from './components/Programs';
import Impact from './components/Impact';
import RecentProjects from './components/RecentProjects';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import OurPrograms from './components/OurPrograms';
import Contact from './components/Contact';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutUs />;
      case 'programs':
        return <OurPrograms />;
      case 'contact':
        return <Contact />;
      case 'home':
      default:
        return (
          <>
            <Hero setCurrentPage={setCurrentPage} />
            <RecentProjects />
            <Programs setCurrentPage={setCurrentPage} />
            <Impact />
            <Testimonials />
            <CallToAction setCurrentPage={setCurrentPage} />
            <Newsletter />
          </>
        );
    }
  };

  return (
    <div className="bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default App;