import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, ComputerDesktopIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900">
        <div className="absolute inset-0">
          <img
            className="h-full w-full object-cover opacity-50"
            src="https://images.unsplash.com/photo-1550439062-609e1531270e"
            alt="Tech background"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            GSM Toure Tech Company
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-3xl">
            Your one-stop destination for premium mobile phones, accessories, and professional repair services.
          </p>
          <div className="mt-10">
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              Our Services
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need for your mobile devices
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Mobile Phones */}
              <div className="relative group">
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                    alt="Mobile Phones"
                    className="object-cover object-center group-hover:opacity-75"
                  />
                  <div className="flex items-end p-4">
                    <div className="w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md">
                      <div className="flex items-center">
                        <PhoneIcon className="h-6 w-6 text-indigo-600" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900">
                          Latest Phones
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Browse our collection of premium smartphones
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Accessories */}
              <div className="relative group">
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1491933382434-500287f9b54b"
                    alt="Accessories"
                    className="object-cover object-center group-hover:opacity-75"
                  />
                  <div className="flex items-end p-4">
                    <div className="w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md">
                      <div className="flex items-center">
                        <ComputerDesktopIcon className="h-6 w-6 text-indigo-600" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900">
                          Accessories
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Find the perfect accessories for your devices
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Repair Services */}
              <div className="relative group">
                <div className="aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea"
                    alt="Repair Services"
                    className="object-cover object-center group-hover:opacity-75"
                  />
                  <div className="flex items-end p-4">
                    <div className="w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md">
                      <div className="flex items-center">
                        <WrenchScrewdriverIcon className="h-6 w-6 text-indigo-600" />
                        <h3 className="ml-2 text-lg font-medium text-gray-900">
                          Repair Services
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        Professional repair services for all devices
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;