import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, Image as ImageIcon } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-20">
      <section className="hero px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Capture Life's
            <span className="block text-accent">Beautiful Moments</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Professional photography portfolio showcasing stunning visuals and artistic compositions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/gallery"
              className="flex items-center justify-center space-x-2 bg-accent hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              <ImageIcon className="h-5 w-5" />
              <span>View Gallery</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/upload"
              className="flex items-center justify-center space-x-2 border border-white hover:bg-white hover:text-black px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              <Camera className="h-5 w-5" />
              <span>Upload Photo</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Featured Categories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-dark-card p-8 rounded-xl text-center hover:transform hover:scale-105 transition-transform">
              <Camera className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Portrait</h3>
              <p className="text-gray-400">Professional portraits capturing personality and emotion</p>
            </div>
            <div className="bg-dark-card p-8 rounded-xl text-center hover:transform hover:scale-105 transition-transform">
              <ImageIcon className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Landscape</h3>
              <p className="text-gray-400">Breathtaking landscapes from around the world</p>
            </div>
            <div className="bg-dark-card p-8 rounded-xl text-center hover:transform hover:scale-105 transition-transform">
              <Camera className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-3">Street</h3>
              <p className="text-gray-400">Urban photography capturing city life and culture</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
