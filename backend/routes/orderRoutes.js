const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  createOrder,
  getUserOrders,
  getVendorOrders,
  updateOrderStatus,
  cancelOrder
} = require("../controller/orderController");


// CREATE ORDER
router.post("/create", authMiddleware, createOrder);


// GET ORDERS FOR VENDOR
router.get("/vendor", authMiddleware, getVendorOrders);


// GET ORDERS FOR LOGGED-IN USER
router.get("/user", authMiddleware, getUserOrders);


// UPDATE ORDER STATUS (Vendor updates)
router.put("/:id", authMiddleware, updateOrderStatus);


// CANCEL ORDER (User can cancel)
router.delete("/:id", authMiddleware, cancelOrder);


module.exports = router;