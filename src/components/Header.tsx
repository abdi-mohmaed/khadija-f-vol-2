import React, { useState } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (page: string) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'programs', label: 'Our Programs' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center flex-shrink-0">
            <button onClick={() => handleNavClick('home')} className="flex items-center">
              <img
                src={`${import.meta.env.BASE_URL}logo-small@2x.png`}
                alt="Khadija Foundation Logo"
                className="h-10 md:h-16 object-contain"
              />
            </button>
          </div>

          <nav className="hidden lg:flex space-x-8 flex-1 justify-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-medium transition-colors ${currentPage === item.id
                  ? 'text-blue-600'
                  : 'text-gray-800 hover:text-blue-600'
                  }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="language-selector hidden md:block">
              <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                <Globe className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">EN</span>
                <ChevronDown className="w-4 h-4 ml-1" />
              </button>
              <div className="language-dropdown">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600">English</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-blue-600">Somali</a>
              </div>
            </div>

            <button
              onClick={() => handleNavClick('contact')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors whitespace-nowrap text-sm"
            >
              Donate Now
            </button>

            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-md transition-colors ${currentPage === item.id
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="px-3 py-2">
                  <button className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">Language: EN</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
