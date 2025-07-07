import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-['Pacifico'] text-white mb-6">Khadija Foundation</h3>
            <p className="text-gray-400 mb-6">
              Empowering communities across Somaliland through sustainable development and humanitarian aid since 2015.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                <Twitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition">
                <Linkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Our Programs</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">Orphan Care & Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Education Initiatives</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Family Assistance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Drought Relief</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Youth Employment</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Water Access Projects</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Our Impact</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">News & Updates</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Volunteer</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Donate</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Airport road, Masalaha, Hargeisa, Somaliland</span>
              </li>
              <li className="flex items-start">
                <Phone className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">+252 63 478 3176</span>
              </li>
              <li className="flex items-start">
                <Mail className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">info@khadijafoundation.org</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © 2025 Khadija Foundation. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 text-sm hover:text-white transition">Privacy Policy</a>
              <a href="#" className="text-gray-500 text-sm hover:text-white transition">Terms of Service</a>
              <a href="#" className="text-gray-500 text-sm hover:text-white transition">Donation Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;