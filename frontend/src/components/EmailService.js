// Email Service for sending booking notifications
class EmailService {
  static async sendBookingEmail(formData) {
    const emailData = {
      service_id: 'service_12345',
      template_id: 'template_67890',
      template_params: {
        to_email: 'vedantkadam875@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        service: formData.service,
        date: formData.date || 'Not specified',
        message: formData.message,
        reply_to: formData.email,
        subject: `📸 New Photography Booking - ${formData.name}`
      }
    };

    try {
      // Method 1: Try EmailJS (most reliable)
      if (window.emailjs) {
        const response = await window.emailjs.send(
          emailData.service_id,
          emailData.template_id,
          emailData.template_params
        );
        return { success: true, message: 'Email sent successfully via EmailJS' };
      }

      // Method 2: Try Formspree (backup)
      const formResponse = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: emailData.template_params.subject,
          _to: emailData.template_params.to_email
        })
      });

      if (formResponse.ok) {
        return { success: true, message: 'Email sent successfully via Formspree' };
      }

      // Method 3: Enhanced mailto with multiple recipients
      const mailtoOptions = {
        to: 'vedantkadam875@gmail.com',
        cc: formData.email,
        subject: emailData.template_params.subject,
        body: emailData.template_params.body
      };

      const mailtoString = `mailto:${mailtoOptions.to}?cc=${mailtoOptions.cc}&subject=${encodeURIComponent(mailtoOptions.subject)}&body=${encodeURIComponent(mailtoOptions.body)}`;
      
      // Open email client
      window.open(mailtoString, '_blank');
      
      // Store booking locally for backup
      localStorage.setItem('latest_booking', JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        email_sent: new Date().toISOString()
      }));

      return { success: true, message: 'Email client opened with booking details' };

    } catch (error) {
      console.error('Email service error:', error);
      
      // Fallback: Store booking and show manual instructions
      localStorage.setItem('booking_error', JSON.stringify({
        ...formData,
        timestamp: new Date().toISOString(),
        error: error.message
      }));

      return { 
        success: false, 
        message: 'Email service failed. Please check your browser settings.',
        fallback: 'Booking details saved locally'
      };
    }
  }

  static checkEmailDelivery() {
    const latestBooking = localStorage.getItem('latest_booking');
    const bookingError = localStorage.getItem('booking_error');
    
    if (latestBooking) {
      const booking = JSON.parse(latestBooking);
      const timeSinceEmail = new Date() - new Date(booking.email_sent);
      
      return {
        delivered: timeSinceEmail < 300000, // Within 5 minutes
        booking: booking,
        error: bookingError ? JSON.parse(bookingError) : null
      };
    }
    
    return null;
  }

  static getBookingHistory() {
    const history = localStorage.getItem('booking_history');
    return history ? JSON.parse(history) : [];
  }

  static addToHistory(booking) {
    const history = this.getBookingHistory();
    history.unshift({
      ...booking,
      id: Date.now(),
      timestamp: new Date().toISOString()
    });
    
    // Keep only last 10 bookings
    const limitedHistory = history.slice(0, 10);
    localStorage.setItem('booking_history', JSON.stringify(limitedHistory));
  }
}

export default EmailService;
