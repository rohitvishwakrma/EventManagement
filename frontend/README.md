technical-event-management/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Vendor.js
│   │   │   ├── Product.js
│   │   │   ├── Order.js
│   │   │   ├── Cart.js
│   │   │   ├── Request.js
│   │   │   └── ProductStatus.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── adminController.js
│   │   │   ├── vendorController.js
│   │   │   ├── userController.js
│   │   │   ├── productController.js
│   │   │   ├── orderController.js
│   │   │   └── cartController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── adminRoutes.js
│   │   │   ├── vendorRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── productRoutes.js
│   │   │   └── orderRoutes.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── upload.js
│   │   └── utils/
│   │       └── helpers.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   └── ErrorBoundary.jsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   ├── Signup.jsx
│   │   │   │   └── ForgotPassword.jsx
│   │   │   ├── admin/
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── ManageUsers.jsx
│   │   │   │   ├── ManageVendors.jsx
│   │   │   │   ├── ProductStatus.jsx
│   │   │   │   └── Requests.jsx
│   │   │   ├── vendor/
│   │   │   │   ├── VendorDashboard.jsx
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── EditProduct.jsx
│   │   │   │   ├── VendorProducts.jsx
│   │   │   │   └── VendorOrders.jsx
│   │   │   ├── user/
│   │   │   │   ├── UserDashboard.jsx
│   │   │   │   ├── Products.jsx
│   │   │   │   ├── ProductDetails.jsx
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── Checkout.jsx
│   │   │   │   └── OrderStatus.jsx
│   │   │   └── layout/
│   │   │       ├── AdminLayout.jsx
│   │   │       ├── VendorLayout.jsx
│   │   │       └── UserLayout.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   └── NotFoundPage.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   ├── vendorService.js
│   │   │   └── adminService.js
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   ├── CartContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useCart.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   └── validators.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   ├── package.json
│   ├── tailwind.config.js
│   └── README.md
│
├── .gitignore
└── README.md
## Step 1: Backend Setup
1.1 Initialize Backend
  mkdir technical-event-management
  cd technical-event-management
  mkdir backend
  cd backend
  npm init -y

1.2 Install Dependencies
 npm install express mongoose bcryptjs jsonwebtoken cors dotenv multer express-validator
 npm install -D nodemon

