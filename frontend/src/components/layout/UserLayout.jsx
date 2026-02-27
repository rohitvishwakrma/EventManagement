import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingCart, 
  FiClipboard,
  FiUser
} from 'react-icons/fi';

const UserLayout = () => {
  const menuItems = [
    { path: '/user/dashboard', icon: FiHome, label: 'Dashboard' },
    { path: '/products', icon: FiPackage, label: 'Products' },
    { path: '/cart', icon: FiShoppingCart, label: 'Cart' },
    { path: '/user/requests', icon: FiClipboard, label: 'My Requests' },
    { path: '/profile', icon: FiUser, label: 'Profile' },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg min-h-screen">
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <item.icon className="mr-3" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;