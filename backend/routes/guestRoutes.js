const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
addGuest,
getGuests,
deleteGuest
} = require("../controller/guestController");

router.post("/", authMiddleware, addGuest);

router.get("/", authMiddleware, getGuests);

router.delete("/:id", authMiddleware, deleteGuest);

module.exports = router;