import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, Users, Briefcase, Heart, Star, Clock, CheckCircle, ArrowRight, Sparkles, Mail, Calendar } from 'lucide-react';
import Notification from '../components/Notification';

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [notification, setNotification] = useState(null);

  const goToBooking = (service, pkg) => {
    const params = new URLSearchParams();
    params.append('service', service.title);
    if (pkg) {
      params.append('package', pkg.name);
    }
    window.location.href = `/booking?${params.toString()}`;
  };

  const services = [
    {
      id: 'portrait',
      title: 'Portrait Photography',
      description: 'Professional portraits that capture your unique personality and essence with artistic vision.',
      price: 'From $500',
      duration: '2-3 hours',
      features: [
        'Professional lighting setup',
        'Wardrobe consultation',
        'Retouching included',
        '20+ edited photos',
        'Private studio session'
      ],
      icon: Camera,
      popular: true
    },
    {
      id: 'fashion',
      title: 'Fashion Photography',
      description: 'High-end fashion photography for brands, magazines, and modeling portfolios.',
      price: 'From $1,500',
      duration: '4-6 hours',
      features: [
        'Runway and editorial style',
        'Professional models available',
        'Studio and location options',
        '50+ edited photos',
        'Commercial licensing'
      ],
      icon: Heart,
      popular: true
    },
    {
      id: 'commercial',
      title: 'Commercial Photography',
      description: 'Premium commercial photography for products, brands, and corporate campaigns.',
      price: 'From $2,000',
      duration: 'Full day',
      features: [
        'Product and brand photography',
        'Corporate headshots',
        'Marketing materials',
        'Unlimited usage rights',
        'Fast turnaround'
      ],
      icon: Briefcase,
      popular: false
    },
    {
      id: 'wedding',
      title: 'Wedding Photography',
      description: 'Complete wedding coverage capturing every precious moment of your special day.',
      price: 'From $3,000',
      duration: 'Full day',
      features: [
        '8+ hours coverage',
        'Second photographer',
        'Engagement session included',
        '500+ edited photos',
        'Premium album package'
      ],
      icon: Heart,
      popular: true
    },
    {
      id: 'event',
      title: 'Event Photography',
      description: 'Professional event coverage for corporate functions, parties, and special occasions.',
      price: 'From $1,000',
      duration: '4-8 hours',
      features: [
        'On-site printing available',
        'Social media ready photos',
        'Candid and posed shots',
        '100+ edited photos',
        'Same-day preview'
      ],
      icon: Users,
      popular: false
    },
    {
      id: 'headshot',
      title: 'Professional Headshots',
      description: 'Corporate and professional headshots for LinkedIn, websites, and business profiles.',
      price: 'From $300',
      duration: '1 hour',
      features: [
        'Multiple outfit changes',
        'Background options',
        'Quick turnaround',
        '10+ edited photos',
        'Business licensing'
      ],
      icon: Camera,
      popular: false
    }
  ];

  const packages = [
    {
      name: 'Essential',
      price: '$300',
      duration: '1 Hour',
      features: [
        'Professional consultation',
        '10 edited photos',
        'Basic retouching',
        'Online gallery',
        'Digital delivery'
      ],
      recommended: false
    },
    {
      name: 'Premium',
      price: '$800',
      duration: '3 Hours',
      features: [
        'Extended session',
        '30 edited photos',
        'Advanced retouching',
        'Private gallery',
        'Print release',
        'Wardrobe guidance'
      ],
      recommended: true
    },
    {
      name: 'Luxury',
      price: '$2,500',
      duration: 'Full Day',
      features: [
        'Unlimited coverage',
        '100+ edited photos',
        'Premium retouching',
        'Priority delivery',
        'Album included',
        'Second photographer',
        'Location options'
      ],
      recommended: false
    }
  ];

  return (
    <div className="pt-20 min-h-screen">
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold heading-display text-gradient mb-6">Services</h1>
          <p className="text-xl text-gray-400 heading-luxury max-w-3xl mx-auto">
            Premium photography services tailored to your unique needs and vision
          </p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`premium-card relative p-8 rounded-2xl bg-dark-card border transition-all duration-500 ${
                service.popular 
                  ? 'border-accent border-opacity-40 hover:border-opacity-60' 
                  : 'border-accent border-opacity-20 hover:border-opacity-40'
              }`}
              style={{
                animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              {service.popular && (
                <div className="absolute -top-3 -right-3 px-4 py-1 bg-accent text-black text-sm font-bold rounded-full">
                  POPULAR
                </div>
              )}

              <div className="flex items-center mb-6">
                <div className="p-3 bg-accent bg-opacity-20 rounded-full mr-4">
                  <service.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold heading-luxury">{service.title}</h3>
                  <div className="text-accent font-semibold">{service.price}</div>
                </div>
              </div>

              <p className="text-gray-400 mb-6">{service.description}</p>

              <div className="flex items-center text-sm text-gray-500 mb-6">
                <Clock className="h-4 w-4 mr-2" />
                <span>{service.duration}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="space-y-3">
                <button
                  onClick={() => goToBooking(service)}
                  className="w-full py-3 bg-accent text-black rounded-lg hover:bg-accent-dark transition-all duration-300"
                >
                  View Details
                </button>
                <button
                  onClick={() => goToBooking(service)}
                  className="w-full py-3 border border-accent text-accent rounded-lg hover:bg-accent hover:text-black transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Book This Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Packages Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold heading-display text-gradient mb-4">Packages</h2>
            <p className="text-xl text-gray-400 heading-luxury">
              Flexible packages designed to meet different needs and budgets
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={pkg.name}
                className={`premium-card p-8 rounded-2xl bg-dark-card border transition-all duration-500 ${
                  pkg.recommended
                    ? 'border-accent border-opacity-40 scale-105'
                    : 'border-accent border-opacity-20'
                }`}
                style={{
                  animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {pkg.recommended && (
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent bg-opacity-20 rounded-full">
                      <Sparkles className="h-4 w-4 text-accent" />
                      <span className="text-accent font-semibold">RECOMMENDED</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold heading-luxury mb-2">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-gradient mb-2">{pkg.price}</div>
                  <div className="text-gray-500">{pkg.duration}</div>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => goToBooking(services[index], pkg)}
                  className={`w-full text-center py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    pkg.recommended
                      ? 'bg-accent text-black hover:bg-accent-dark'
                      : 'border border-accent text-accent hover:bg-accent hover:text-black'
                  }`}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Book This Package</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Process Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold heading-display text-gradient mb-4">Our Process</h2>
            <p className="text-xl text-gray-400 heading-luxury">
              A seamless experience from consultation to final delivery
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Consultation', description: 'We discuss your vision and requirements' },
              { step: '02', title: 'Planning', description: 'Detailed planning and preparation' },
              { step: '03', title: 'Photoshoot', description: 'Professional execution of your session' },
              { step: '04', title: 'Delivery', description: 'Carefully edited photos delivered' }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-accent">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold heading-luxury mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="premium-card p-12 rounded-3xl bg-gradient-to-br from-dark-card to-dark-surface border border-accent border-opacity-30">
            <h2 className="text-4xl font-bold heading-display text-gradient mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and let's create something extraordinary together.
            </p>
            <Link
              to="/contact"
              className="btn-premium group inline-flex items-center space-x-3 bg-accent text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent-dark transition-all duration-300"
            >
              <Star className="h-6 w-6" />
              <span>Free Consultation</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-6">
          <div className="bg-dark-card rounded-3xl max-w-2xl w-full p-8 border border-accent border-opacity-30">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold heading-luxury">{selectedService.title}</h3>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-lg hover:bg-accent hover:bg-opacity-20 transition-all duration-300"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <div className="text-3xl font-bold text-gradient mb-2">{selectedService.price}</div>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-2" />
                <span>{selectedService.duration}</span>
              </div>
            </div>

            <p className="text-gray-300 mb-6">{selectedService.description}</p>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4">What's Included:</h4>
              <ul className="space-y-3">
                {selectedService.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex space-x-4">
              <Link
                to="/contact"
                className="flex-1 text-center py-3 bg-accent text-black rounded-lg hover:bg-accent-dark transition-all duration-300"
                onClick={() => setSelectedService(null)}
              >
                Book This Service
              </Link>
              <button
                onClick={() => setSelectedService(null)}
                className="flex-1 py-3 border border-accent text-accent rounded-lg hover:bg-accent hover:text-black transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
