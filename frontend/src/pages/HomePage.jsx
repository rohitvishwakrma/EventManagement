import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiShoppingBag, 
  FiUsers, 
  FiTrendingUp, 
  FiArrowRight 
} from 'react-icons/fi';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <FiShoppingBag className="h-8 w-8 text-primary-600" />,
      title: 'Browse Products',
      description: 'Explore a wide range of products from verified vendors.'
    },
    {
      icon: <FiUsers className="h-8 w-8 text-primary-600" />,
      title: 'Vendor Management',
      description: 'Manage vendor onboarding and management system.'
    },
    {
      icon: <FiTrendingUp className="h-8 w-8 text-primary-600" />,
      title: 'Track Orders',
      description: 'Real-time order tracking and status updates.'
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const supportLinks = [
    { name: 'FAQ', path: '/faq' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome to Technical Event Management
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Our one-stop platform for managing technical events, products, and vendor relationships.
            </p>
            
            {/* Start Sign In Button */}
            {!isAuthenticated && (
              <Link
                to="/login"
                className="inline-flex items-center bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
              >
                Start Sign In <FiArrowRight className="ml-2" />
              </Link>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition">
                  <div className="inline-block p-4 bg-primary-50 rounded-full mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="py-16 bg-primary-600">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
              <p className="text-xl text-white opacity-90 mb-8">
                Join thousands of users and vendors on our platform.
              </p>
              <Link
                to="/signup"
                className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
              >
                Create Account
              </Link>
            </div>
          </section>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About Us */}
            <div>
              <h3 className="text-lg font-semibold mb-4">About Us</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Technical Event Management platform for vendors and customers to connect and manage events seamlessly.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-white transition text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-400 hover:text-white transition text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Email: support@techevent.com</li>
                <li>Phone: +91 1234567890</li>
                <li>Address: Mumbai, India</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Technical Event Management. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;