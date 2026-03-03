import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowRight, Image as ImageIcon, Star, Award, Users, Calendar } from 'lucide-react';

const Home = () => {
  return (
    <div className="pt-20">
      <section className="hero relative">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold heading-display mb-6">
              <span className="text-gradient">LUXE</span>
              <br />
              <span className="text-white">Photography</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-300 heading-luxury max-w-3xl mx-auto">
              Where art meets perfection. Capturing life's most precious moments with unparalleled elegance and sophistication.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/gallery"
                className="btn-premium group flex items-center justify-center space-x-3 bg-accent text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-dark transition-all duration-300 premium-shadow"
              >
                <ImageIcon className="h-6 w-6" />
                <span>Explore Gallery</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="btn-premium group flex items-center justify-center space-x-3 border-2 border-accent text-accent px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent hover:text-black transition-all duration-300"
              >
                <Calendar className="h-6 w-6" />
                <span>Book Session</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent opacity-10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent opacity-5 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 luxury-pattern premium-overlay">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          {[
            { icon: Award, label: 'Awards Won', value: '50+' },
            { icon: Users, label: 'Happy Clients', value: '1000+' },
            { icon: Camera, label: 'Photoshoots', value: '5000+' },
            { icon: Star, label: '5-Star Reviews', value: '200+' },
          ].map((stat, index) => (
            <div key={index} className="premium-card p-6 rounded-2xl expensive-card-bg">
              <stat.icon className="h-8 w-8 text-accent mx-auto mb-4" />
              <div className="text-3xl font-bold text-gradient mb-2">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 gold-dust premium-overlay">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-16 heading-display text-gradient">Premium Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Camera,
                title: 'Portrait Photography',
                description: 'Professional portraits that capture your unique personality and essence.',
                price: 'From $500'
              },
              {
                icon: ImageIcon,
                title: 'Event Coverage',
                description: 'Comprehensive event photography with artistic vision and technical excellence.',
                price: 'From $1,500'
              },
              {
                icon: Star,
                title: 'Commercial Photography',
                description: 'High-end commercial photography for brands and businesses.',
                price: 'From $2,000'
              }
            ].map((service, index) => (
              <div key={index} className="premium-card p-8 rounded-2xl expensive-card-bg">
                <service.icon className="h-12 w-12 text-accent mb-6" />
                <h3 className="text-2xl font-bold mb-4 heading-luxury">{service.title}</h3>
                <p className="text-gray-400 mb-6">{service.description}</p>
                <div className="text-xl font-bold text-accent mb-4">{service.price}</div>
                <Link
                  to="/contact"
                  className="inline-block w-full text-center py-3 border border-accent text-accent rounded-lg hover:bg-accent hover:text-black transition-all duration-300"
                >
                  Inquire Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
