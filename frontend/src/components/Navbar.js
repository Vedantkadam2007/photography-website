import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="navbar fixed top-0 w-full z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Camera className="h-8 w-8 text-accent" />
          <span className="text-xl font-bold">PhotoPortfolio</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-accent transition-colors">Home</Link>
          <Link to="/gallery" className="hover:text-accent transition-colors">Gallery</Link>
          <Link to="/upload" className="hover:text-accent transition-colors">Upload</Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <Link to="/" className="block py-2 hover:text-accent transition-colors">Home</Link>
          <Link to="/gallery" className="block py-2 hover:text-accent transition-colors">Gallery</Link>
          <Link to="/upload" className="block py-2 hover:text-accent transition-colors">Upload</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
