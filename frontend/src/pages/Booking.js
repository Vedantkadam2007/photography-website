import React, { useState } from 'react';
import { ArrowLeft, Mail, Phone, Calendar, Camera, Send, CheckCircle } from 'lucide-react';
import Notification from '../components/Notification';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    packageName: '',
    date: '',
    time: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notification, setNotification] = useState(null);

  // Get URL parameters to pre-fill service/package info
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    const packageName = urlParams.get('package');
    
    if (service) setFormData(prev => ({ ...prev, serviceType: service }));
    if (packageName) setFormData(prev => ({ ...prev, packageName: packageName }));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailData = {
      to: 'vedantkadam875@gmail.com',
      subject: `📸 New Booking Request - ${formData.serviceType || 'General Inquiry'}`,
      body: `NEW BOOKING REQUEST

CLIENT INFORMATION:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

BOOKING DETAILS:
Service Type: ${formData.serviceType || 'Not specified'}
Package: ${formData.packageName || 'Not specified'}
Preferred Date: ${formData.date || 'Not specified'}
Preferred Time: ${formData.time || 'Not specified'}

CLIENT MESSAGE:
${formData.message || 'No additional message provided'}

---
This booking was submitted from LUXE Photography Website
Date: ${new Date().toLocaleString()}
Client IP: ${window.location.hostname}

Next Steps:
1. Contact client within 24 hours
2. Confirm availability for requested date
3. Discuss specific requirements
4. Send booking confirmation and payment details

Contact Information:
Email: ${formData.email}
Phone: ${formData.phone}`
    };

    try {
      // Send email
      window.location.href = `mailto:vedantkadam875@gmail.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
      
      setNotification({
        type: 'success',
        message: '📧 Booking email opened! Please send to complete your booking.'
      });
      
      setSubmitted(true);
      setIsSubmitting(false);
      
      setTimeout(() => setNotification(null), 5000);
    } catch (error) {
      setNotification({
        type: 'error',
        message: '❌ Failed to open email. Please try again.'
      });
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center px-6">
        <div className="premium-card p-12 rounded-3xl max-w-md w-full text-center expensive-card-bg">
          <div className="w-20 h-20 bg-accent bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-accent" />
          </div>
          <h2 className="text-3xl font-bold heading-display text-gradient mb-4">Booking Initiated!</h2>
          <p className="text-gray-300 mb-6">
            Your booking request has been prepared. Please send the email to complete your booking.
          </p>
          <p className="text-gray-400 text-sm mb-8">
            We'll contact you within 24 hours to confirm your photography session.
          </p>
          <button
            onClick={() => window.history.back()}
            className="btn-premium px-6 py-3 bg-accent text-black rounded-full hover:bg-accent-dark transition-all duration-300"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen luxury-pattern premium-overlay">
      {/* Notification */}
      {notification && (
        <Notification
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-accent mb-6 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Services</span>
          </button>
          <h1 className="text-5xl md:text-6xl font-bold heading-display text-gradient mb-4">Book Your Session</h1>
          <p className="text-xl text-gray-400 heading-luxury">
            Fill in your details below to book your premium photography session
          </p>
        </div>

        {/* Booking Form */}
        <div className="premium-card p-8 rounded-3xl expensive-card-bg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Client Information */}
            <div>
              <h2 className="text-2xl font-bold heading-luxury mb-6 text-accent">Client Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-accent">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="premium-input w-full"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-accent">Email Address *</label>
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
              <div className="mt-6">
                <label className="block text-sm font-medium mb-2 text-accent">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="premium-input w-full"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            {/* Booking Details */}
            <div>
              <h2 className="text-2xl font-bold heading-luxury mb-6 text-accent">Booking Details</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-accent">Service Type</label>
                  <input
                    type="text"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="premium-input w-full"
                    placeholder="e.g., Portrait Photography"
                    readOnly={!!formData.serviceType}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-accent">Package</label>
                  <input
                    type="text"
                    name="packageName"
                    value={formData.packageName}
                    onChange={handleChange}
                    className="premium-input w-full"
                    placeholder="e.g., Premium Package"
                    readOnly={!!formData.packageName}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-6">
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
                  <label className="block text-sm font-medium mb-2 text-accent">Preferred Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="premium-input w-full"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-2 text-accent">Additional Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="premium-input w-full"
                placeholder="Tell us about your vision, special requirements, or any questions you have..."
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-accent text-black font-semibold rounded-full hover:bg-accent-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>Send Booking Request</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Contact Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-6 text-gray-400">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>vedantkadam875@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
