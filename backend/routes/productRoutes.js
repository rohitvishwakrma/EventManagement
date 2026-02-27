const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { isVendor } = require("../middleware/roleMiddleware");
const { updateProduct } = require("../controller/productController");
const{getVendorProducts}=require("../controller/productController")
const {
  addProduct,
  getProducts,
  deleteProduct
} = require("../controller/productController");

router.post("/add", authMiddleware, isVendor, addProduct);

router.delete("/:id", authMiddleware, isVendor, deleteProduct);

router.get("/", getProducts);
router.put("/:id", authMiddleware, isVendor, updateProduct);
router.get("/vendor", authMiddleware, isVendor, getVendorProducts);
module.exports = router;