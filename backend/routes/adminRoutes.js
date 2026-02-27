const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { isAdmin } = require("../middleware/roleMiddleware");

const {
  getAllUsers,
  getAllVendors,
  assignMembership,
  updateMembership
} = require("../controller/adminController");

router.get("/users", authMiddleware, isAdmin, getAllUsers);

router.get("/vendors", authMiddleware, isAdmin, getAllVendors);

router.post("/membership", authMiddleware, isAdmin, assignMembership);

router.put("/membership/:id", authMiddleware, isAdmin, updateMembership);

module.exports = router;