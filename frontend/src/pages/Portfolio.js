import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Award, Briefcase, Users, Heart, ArrowRight, Play, Camera } from 'lucide-react';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'portrait', label: 'Portrait' },
    { id: 'fashion', label: 'Fashion' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'events', label: 'Events' },
  ];

  const portfolioItems = [
    {
      id: 1,
      title: 'Elegant Portraits',
      category: 'portrait',
      description: 'Sophisticated portrait series for luxury brand campaign',
      image: '/api/placeholder/600/400',
      featured: true,
      client: 'LUXE Fashion House',
      year: '2024',
      award: 'Best Photography 2024'
    },
    {
      id: 2,
      title: 'Fashion Week',
      category: 'fashion',
      description: 'Runway coverage for Paris Fashion Week',
      image: '/api/placeholder/600/400',
      featured: true,
      client: 'Fashion Magazine',
      year: '2024'
    },
    {
      id: 3,
      title: 'Product Campaign',
      category: 'commercial',
      description: 'High-end product photography for luxury watches',
      image: '/api/placeholder/600/400',
      client: 'Swiss Watch Co.',
      year: '2024'
    },
    {
      id: 4,
      title: 'Royal Wedding',
      category: 'wedding',
      description: 'Exclusive wedding photography for royal family',
      image: '/api/placeholder/600/400',
      featured: true,
      client: 'Private Client',
      year: '2023',
      award: 'Wedding Photographer of the Year'
    },
    {
      id: 5,
      title: 'Corporate Gala',
      category: 'events',
      description: 'Annual corporate gala documentation',
      image: '/api/placeholder/600/400',
      client: 'Fortune 500 Company',
      year: '2024'
    },
    {
      id: 6,
      title: 'Beauty Campaign',
      category: 'fashion',
      description: 'Cosmetics campaign for international brand',
      image: '/api/placeholder/600/400',
      client: 'Beauty Global',
      year: '2023'
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="pt-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold heading-display text-gradient mb-6">Portfolio</h1>
          <p className="text-xl text-gray-400 heading-luxury max-w-3xl mx-auto">
            A curated collection of our most prestigious work, showcasing excellence in every frame
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="text-center p-6 bg-dark-card rounded-2xl border border-accent border-opacity-20">
            <div className="text-3xl font-bold text-gradient mb-2">500+</div>
            <div className="text-gray-400">Projects Completed</div>
          </div>
          <div className="text-center p-6 bg-dark-card rounded-2xl border border-accent border-opacity-20">
            <div className="text-3xl font-bold text-gradient mb-2">50+</div>
            <div className="text-gray-400">Awards Won</div>
          </div>
          <div className="text-center p-6 bg-dark-card rounded-2xl border border-accent border-opacity-20">
            <div className="text-3xl font-bold text-gradient mb-2">100+</div>
            <div className="text-gray-400">Happy Clients</div>
          </div>
          <div className="text-center p-6 bg-dark-card rounded-2xl border border-accent border-opacity-20">
            <div className="text-3xl font-bold text-gradient mb-2">15+</div>
            <div className="text-gray-400">Years Experience</div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`btn-premium px-8 py-3 rounded-full transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-accent text-black'
                  : 'bg-dark-card text-gray-300 hover:bg-accent hover:text-black'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="premium-card group relative overflow-hidden rounded-2xl bg-dark-card border border-accent border-opacity-20 hover:border-opacity-40 transition-all duration-500"
              style={{
                animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {/* Image Placeholder */}
              <div className="relative h-64 bg-gradient-to-br from-accent to-accent-dark opacity-20">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Camera className="h-16 w-16 text-accent opacity-50" />
                </div>
                {item.featured && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-black text-xs font-bold rounded-full">
                    FEATURED
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold heading-luxury mb-2">{item.title}</h3>
                <p className="text-gray-400 mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-sm text-gray-500">Client</div>
                    <div className="font-semibold">{item.client}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Year</div>
                    <div className="font-semibold">{item.year}</div>
                  </div>
                </div>

                {/* Awards */}
                {item.award && (
                  <div className="flex items-center space-x-2 mb-4">
                    <Award className="h-4 w-4 text-accent" />
                    <span className="text-sm text-accent">{item.award}</span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to={`/portfolio/${item.id}`}
                    className="flex-1 text-center py-2 bg-accent text-black rounded-lg hover:bg-accent-dark transition-all duration-300"
                  >
                    View Details
                  </Link>
                  <button className="p-2 border border-accent text-accent rounded-lg hover:bg-accent hover:text-black transition-all duration-300">
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="premium-card p-12 rounded-3xl bg-gradient-to-br from-dark-card to-dark-surface border border-accent border-opacity-30">
            <h2 className="text-4xl font-bold heading-display text-gradient mb-6">
              Ready to Create Something Amazing?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss your next project and bring your vision to life with our premium photography services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-premium group flex items-center justify-center space-x-3 bg-accent text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-dark transition-all duration-300"
              >
                <Briefcase className="h-6 w-6" />
                <span>Start Your Project</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/gallery"
                className="btn-premium group flex items-center justify-center space-x-3 border-2 border-accent text-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent hover:text-black transition-all duration-300"
              >
                <Play className="h-6 w-6" />
                <span>View More Work</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
