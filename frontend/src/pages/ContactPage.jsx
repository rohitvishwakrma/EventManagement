import React, { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <FiMail className="h-6 w-6" />,
      title: 'Email',
      details: 'support@techevent.com',
      description: 'Get in touch via email'
    },
    {
      icon: <FiPhone className="h-6 w-6" />,
      title: 'Phone',
      details: '+91 1234567890',
      description: 'Mon-Fri 9am to 6pm'
    },
    {
      icon: <FiMapPin className="h-6 w-6" />,
      title: 'Office',
      details: 'Mumbai, India',
      description: 'Visit our office'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl p-12">
        <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-xl opacity-90 max-w-2xl">
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactInfo.map((info, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition">
            <div className="inline-block p-3 bg-primary-50 rounded-full text-primary-600 mb-4">
              {info.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
            <p className="text-gray-900 font-medium mb-1">{info.details}</p>
            <p className="text-sm text-gray-500">{info.description}</p>
          </div>
        ))}
      </section>

      {/* Contact Form */}
      <section className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input-field"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="input-field"
              placeholder="What is this regarding?"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="input-field"
              placeholder="Write your message here..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn-primary inline-flex items-center"
          >
            <FiSend className="mr-2" />
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>

      {/* Map Section */}
      <section className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Find Us</h2>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.116099033!2d72.74109995!3d19.0821978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1645564623456!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Office Location"
            className="rounded-lg"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;