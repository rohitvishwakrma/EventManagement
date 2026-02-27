import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300 text-sm">
              Technical Event Management platform for vendors and customers to connect and manage events seamlessly.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white text-sm">Home</Link></li>
              <li><Link to="/products" className="text-gray-300 hover:text-white text-sm">Products</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white text-sm">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-300 hover:text-white text-sm">FAQ</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white text-sm">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>Email: support@techevent.com</li>
              <li>Phone: +91 1234567890</li>
              <li>Address: Mumbai, India</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-300 text-sm">
          <p>&copy; {new Date().getFullYear()} Technical Event Management. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;