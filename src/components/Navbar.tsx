import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <svg className="h-10 w-10" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="25" cy="25" r="23" stroke="#6366F1" strokeWidth="4"/>
                <path d="M15 25C15 20 20 15 25 15C30 15 35 20 35 25" stroke="#6366F1" strokeWidth="4" strokeLinecap="round"/>
                <circle cx="25" cy="25" r="5" fill="#6366F1"/>
                <path d="M25 30V40" stroke="#6366F1" strokeWidth="4" strokeLinecap="round"/>
              </svg>
              <div className="ml-3">
                <span className="text-white text-xl font-bold">GSM Toure</span>
                <span className="text-indigo-400 text-xl font-bold">Tech</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-gray-300 hover:text-white px-3 py-2">
              Shop
            </Link>
            <Link to="/phones" className="text-gray-300 hover:text-white px-3 py-2">
              Phones
            </Link>
            <Link to="/accessories" className="text-gray-300 hover:text-white px-3 py-2">
              Accessories
            </Link>
            <Link to="/repairs" className="text-gray-300 hover:text-white px-3 py-2">
              Repairs
            </Link>
           
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/shop"
                className="text-gray-300 hover:text-white block px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/phones"
                className="text-gray-300 hover:text-white block px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Phones
              </Link>
              <Link
                to="/accessories"
                className="text-gray-300 hover:text-white block px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Accessories
              </Link>
              <Link
                to="/repairs"
                className="text-gray-300 hover:text-white block px-3 py-2"
                onClick={() => setIsOpen(false)}
              >
                Repairs
              </Link>
             
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;