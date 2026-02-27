
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { isUser } = require("../middleware/roleMiddleware");
const {
  addToCart,
  getCart,
  removeFromCart
} = require("../controller/cartController");

router.post("/add", authMiddleware, isUser, addToCart);

router.get("/", authMiddleware, isUser, getCart);

router.delete("/:id", authMiddleware, isUser, removeFromCart);

module.exports = router;
