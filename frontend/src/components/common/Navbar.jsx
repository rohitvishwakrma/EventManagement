import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiUser, FiShoppingCart, FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin, isVendor } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getMenuItems = () => {
    if (isAdmin) {
      return [
        { name: 'Dashboard', path: '/admin/dashboard' },
        { name: 'Users', path: '/admin/users' },
        { name: 'Vendors', path: '/admin/vendors' },
        { name: 'Memberships', path: '/admin/memberships' },
        { name: 'Requests', path: '/admin/requests' },
      ];
    } else if (isVendor) {
      return [
        { name: 'Dashboard', path: '/vendor/dashboard' },
        { name: 'My Products', path: '/vendor/products' },
        { name: 'Add Product', path: '/vendor/products/add' },
        { name: 'Membership', path: '/vendor/membership' },
        { name: 'Transactions', path: '/vendor/transactions' },
      ];
    } else {
      return [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'My Requests', path: '/user/requests' },
      ];
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-primary-600">
            TechEvent
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && getMenuItems().map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="btn-primary text-sm">
                  Login
                </Link>
                <Link to="/signup" className="btn-secondary text-sm">
                  Signup
                </Link>
              </>
            ) : (
              <>
                {!isAdmin && !isVendor && (
                  <Link to="/cart" className="text-gray-600 hover:text-primary-600">
                    <FiShoppingCart size={20} />
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-red-600"
                >
                  <FiLogOut size={20} />
                </button>
                <div className="flex items-center space-x-2">
                  <FiUser className="text-gray-600" />
                  <span className="text-sm text-gray-700">{user?.name}</span>
                </div>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-600"
            >
              <FiMenu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {isAuthenticated && getMenuItems().map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;