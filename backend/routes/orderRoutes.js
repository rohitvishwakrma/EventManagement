const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createOrder,
  getUserOrders,
  updateOrderStatus
} = require("../controller/orderController");
const { cancelOrder } = require("../controller/orderController");
router.post("/create", authMiddleware, createOrder);

router.get("/:user", authMiddleware, getUserOrders);

router.put("/:id", authMiddleware, updateOrderStatus);
router.delete("/:id", authMiddleware, cancelOrder);
module.exports = router;