import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingBag, 
  FiDollarSign,
  FiAward
} from 'react-icons/fi';

const VendorLayout = () => {
const menuItems = [
  { path: '/vendor/dashboard', icon: FiHome, label: 'Dashboard' },
  { path: '/vendor/products', icon: FiPackage, label: 'My Products' },
  { path: '/vendor/products/add', icon: FiShoppingBag, label: 'Add Product' },
  { path: '/vendor/orders', icon: FiTruck, label: 'Orders' },        // Add this
  { path: '/vendor/transactions', icon: FiDollarSign, label: 'Transactions' },
  { path: '/vendor/membership', icon: FiAward, label: 'Membership' },
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

export default VendorLayout;