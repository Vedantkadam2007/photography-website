import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, Calendar, Camera } from 'lucide-react';
import EmailService from '../components/EmailService';
import Notification from '../components/Notification';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'portrait',
    date: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send email using EmailService
      const result = await EmailService.sendBookingEmail(formData);
      
      if (result.success) {
        // Add to booking history
        EmailService.addToHistory(formData);
        
        // Show success notification
        setNotification({
          type: 'success',
          message: result.message || '📧 Booking request sent successfully to vedantkadam875@gmail.com!'
        });
        
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'portrait',
          date: '',
          message: '',
        });
      } else {
        // Show error notification
        setNotification({
          type: 'error',
          message: result.message || 'Failed to send booking request'
        });
        
        if (result.fallback) {
          setTimeout(() => {
            setNotification({
              type: 'info',
              message: result.fallback
            });
          }, 2000);
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setNotification({
        type: 'error',
        message: '❌ Failed to send booking. Please try again or contact directly at vedantkadam875@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    { value: 'portrait', label: 'Portrait Photography', price: 'From 500' },
    { value: 'event', label: 'Event Coverage', price: 'From 1,500' },
    { value: 'commercial', label: 'Commercial Photography', price: 'From 2,000' },
    { value: 'wedding', label: 'Wedding Photography', price: 'From 3,000' },
  ];

  return (
    <div className="pt-20 min-h-screen silk-gradient premium-overlay">
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
          <h1 className="text-5xl md:text-6xl font-bold heading-display text-gradient mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-400 heading-luxury max-w-2xl mx-auto">
            Let's create something extraordinary together. Contact us to discuss your photography needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold heading-luxury mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent bg-opacity-20 rounded-full">
                    <Phone className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Phone</h3>
                    <p className="text-gray-400">8262958953</p>
                    <p className="text-gray-500 text-sm">Mon-Fri: 9AM-6PM</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent bg-opacity-20 rounded-full">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-gray-400">contact@luxephotography.com</p>
                    <p className="text-gray-500 text-sm">24/7 Response</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent bg-opacity-20 rounded-full">
                    <MapPin className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Studio Location</h3>
                    <p className="text-gray-400">123 Luxury Avenue</p>
                    <p className="text-gray-500">New York, NY 10001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-accent bg-opacity-20 rounded-full">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Business Hours</h3>
                    <p className="text-gray-400">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-gray-400">Saturday: 10AM - 4PM</p>
                    <p className="text-gray-400">Sunday: By Appointment</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Features */}
            <div className="premium-card p-8 rounded-2xl expensive-card-bg">
              <h3 className="text-2xl font-bold heading-luxury mb-4 text-gradient">Why Choose LUXE?</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-gray-300">Award-winning photographers</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-gray-300">State-of-the-art equipment</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-gray-300">Luxury studio experience</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-gray-300">Quick turnaround time</span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-gray-300">Personalized service</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Booking Form */}
          <div>
            <div className="premium-card p-8 rounded-2xl expensive-card-bg">
              <h2 className="text-3xl font-bold heading-luxury mb-6">Book Your Session</h2>
              
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="h-10 w-10 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-gradient mb-4">Thank You!</h3>
                  <p className="text-gray-400 mb-6">
                    We've received your booking request and will contact you within 24 hours to confirm your session.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-premium px-6 py-3 bg-accent text-black rounded-full hover:bg-accent-dark transition-all duration-300"
                  >
                    Book Another Session
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-accent">Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="premium-input w-full"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-accent">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="premium-input w-full"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-accent">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="premium-input w-full"
                        placeholder=" "
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-accent">Service Type *</label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="premium-input w-full"
                        required
                      >
                        {services.map(service => (
                          <option key={service.value} value={service.value}>
                            {service.label} - {service.price}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-accent">Preferred Date</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="premium-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-accent">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="premium-input w-full"
                      placeholder="Tell us about your vision, requirements, or any questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-premium w-full py-4 bg-accent text-black font-semibold rounded-full hover:bg-accent-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center space-x-2">
                        <Calendar className="h-5 w-5" />
                        <span>Book Session</span>
                      </span>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
