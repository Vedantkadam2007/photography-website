import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera, Menu, X, Phone, Mail, MapPin } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' },
    { path: '/upload', label: 'Upload' },
  ];

  return (
    <>
      <nav className={`navbar px-6 py-4 transition-all duration-300 ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Camera className="h-10 w-10 text-accent transform transition-transform duration-300 group-hover:rotate-12" />
                <div className="absolute -inset-1 bg-accent opacity-20 rounded-full blur-md group-hover:opacity-30 transition-opacity"></div>
              </div>
              <div>
                <span className="text-2xl font-bold heading-display text-gradient">LUXE</span>
                <span className="text-xs text-gray-400 block">Photography Studio</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm font-medium transition-all duration-300 hover:text-accent ${
                    location.pathname === link.path ? 'text-accent' : 'text-gray-300'
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-100"></span>
                  )}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 transition-transform duration-300 hover:scale-x-100"></span>
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-accent hover:bg-opacity-10 transition-all duration-300">
                <Phone className="h-4 w-4 text-accent" />
              </button>
              <button className="p-2 rounded-full hover:bg-accent hover:bg-opacity-10 transition-all duration-300">
                <Mail className="h-4 w-4 text-accent" />
              </button>
              <Link
                to="/contact"
                className="btn-premium px-6 py-2 bg-accent text-black font-semibold rounded-full hover:bg-accent-dark transition-all duration-300"
              >
                Book Now
              </Link>
            </div>

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-accent hover:bg-opacity-10 transition-all duration-300"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6 text-accent" /> : <Menu className="h-6 w-6 text-accent" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-95 z-40 lg:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-2xl font-medium transition-all duration-300 hover:text-accent ${
                  location.pathname === link.path ? 'text-accent' : 'text-gray-300'
                }`}
                style={{
                  animation: `slideInUp 0.5s ease-out ${index * 0.1}s both`,
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex space-x-4 pt-8">
              <button className="p-3 rounded-full border border-accent text-accent hover:bg-accent hover:text-black transition-all duration-300">
                <Phone className="h-5 w-5" />
              </button>
              <button className="p-3 rounded-full border border-accent text-accent hover:bg-accent hover:text-black transition-all duration-300">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
