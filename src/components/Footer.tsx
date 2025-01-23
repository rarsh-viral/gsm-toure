import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold">GSM Toure Tech</h2>
            <p className="mt-2 text-sm">Your one-stop destination for premium mobile phones, accessories, and professional repair services.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <nav className="flex space-x-4">
              <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              <Link to="/shop" className="text-gray-300 hover:text-white">Shop</Link>
             
            </nav>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} GSM Toure Tech. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;