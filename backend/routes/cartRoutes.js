const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { isUser } = require("../middleware/roleMiddleware");
const {
  addToCart,
  getCart,
  removeFromCart
} = require("../controller/cartController");

router.post("/add", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/:id", authMiddleware, removeFromCart);

module.exports = router;