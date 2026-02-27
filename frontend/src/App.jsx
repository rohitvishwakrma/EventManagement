import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Loader from './components/common/Loader';
import ErrorBoundary from './components/common/ErrorBoundary';

// Auth Components (New ones from screenshots)
import AdminLogin from './components/auth/AdminLogin';
import VendorLogin from './components/auth/VendorLogin';
import UserLogin from './components/auth/UserLogin';
import AdminSignup from './components/auth/AdminSignup';
import VendorSignup from './components/auth/VendorSignup';
import UserSignup from './components/auth/UserSignup';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Layouts
import AdminLayout from './components/layout/AdminLayout';
import VendorLayout from './components/layout/VendorLayout';
import UserLayout from './components/layout/UserLayout';

// User Components
import Products from './components/user/Products';
import ProductDetails from './components/user/ProductDetails';
import Cart from './components/user/Cart';
import Checkout from './components/user/Checkout';
import OrderStatus from './components/user/OrderStatus';
import UserDashboard from './components/user/UserDashboard';
import UserRequests from './components/user/UserRequests';
import ViewProduct from './components/user/ViewProduct';
import GuestList from './components/user/GuestList';

// Vendor Components
import VendorDashboard from './components/vendor/VendorDashboard';
import VendorProducts from './components/vendor/VendorProducts';
import AddProduct from './components/vendor/AddProduct';
import EditProduct from './components/vendor/EditProduct';
import VendorOrders from './components/vendor/VendorOrders';
import VendorTransactions from './components/vendor/VendorTransactions';
import VendorMembership from './components/vendor/VendorMembership';

// Admin Components
import AdminDashboard from './components/admin/AdminDashboard';
import ManageUsers from './components/admin/ManageUsers';
import ManageVendors from './components/admin/ManageVendors';
import Memberships from './components/admin/Memberships';
import ProductStatusAdmin from './components/admin/ProductStatus';
import Requests from './components/admin/Requests';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <Loader fullScreen={true} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    // Redirect to appropriate dashboard based on role
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    } else if (user?.role === 'vendor') {
      return <Navigate to="/vendor/dashboard" />;
    } else {
      return <Navigate to="/user/dashboard" />;
    }
  }

  return children;
};

// Public Route Component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    if (user?.role === 'admin') {
      return <Navigate to="/admin/dashboard" />;
    } else if (user?.role === 'vendor') {
      return <Navigate to="/vendor/dashboard" />;
    } else {
      return <Navigate to="/user/dashboard" />;
    }
  }

  return children;
};

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <Loader fullScreen={true} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <ErrorBoundary>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Auth Routes - Separate Login/Signup for each role */}
            <Route path="/admin/login" element={
              <PublicRoute>
                <AdminLogin />
              </PublicRoute>
            } />
            <Route path="/vendor/login" element={
              <PublicRoute>
                <VendorLogin />
              </PublicRoute>
            } />
            <Route path="/user/login" element={
              <PublicRoute>
                <UserLogin />
              </PublicRoute>
            } />
            
            <Route path="/admin/signup" element={
              <PublicRoute>
                <AdminSignup />
              </PublicRoute>
            } />
            <Route path="/vendor/signup" element={
              <PublicRoute>
                <VendorSignup />
              </PublicRoute>
            } />
            <Route path="/user/signup" element={
              <PublicRoute>
                <UserSignup />
              </PublicRoute>
            } />

            {/* Public Product Routes */}
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/view-product" element={<ViewProduct />} />
            
            {/* User Routes */}
            <Route path="/user/dashboard" element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/user/requests" element={
              <ProtectedRoute allowedRoles={['user']}>
                <UserRequests />
              </ProtectedRoute>
            } />
            <Route path="/guest-list" element={
              <ProtectedRoute allowedRoles={['user']}>
                <GuestList />
              </ProtectedRoute>
            } />

            {/* Cart & Checkout Routes (User only) */}
            <Route path="/cart" element={
              <ProtectedRoute allowedRoles={['user']}>
                <Cart />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute allowedRoles={['user']}>
                <Checkout />
              </ProtectedRoute>
            } />
            <Route path="/order-status" element={
              <ProtectedRoute allowedRoles={['user']}>
                <OrderStatus />
              </ProtectedRoute>
            } />

            {/* Vendor Routes */}
            <Route path="/vendor/dashboard" element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/vendor/products" element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorProducts />
              </ProtectedRoute>
            } />
            <Route path="/vendor/products/add" element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <AddProduct />
              </ProtectedRoute>
            } />
            <Route path="/vendor/products/edit/:id" element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <EditProduct />
              </ProtectedRoute>
            } />
            <Route path="/vendor/orders" element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorOrders />
              </ProtectedRoute>
            } />
            <Route path="/vendor/transactions" element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorTransactions />
              </ProtectedRoute>
            } />
            <Route path="/vendor/membership" element={
              <ProtectedRoute allowedRoles={['vendor']}>
                <VendorMembership />
              </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/vendors" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ManageVendors />
              </ProtectedRoute>
            } />
            <Route path="/admin/memberships" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Memberships />
              </ProtectedRoute>
            } />
            <Route path="/admin/products/status" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <ProductStatusAdmin />
              </ProtectedRoute>
            } />
            <Route path="/admin/requests" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Requests />
              </ProtectedRoute>
            } />

            {/* 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;