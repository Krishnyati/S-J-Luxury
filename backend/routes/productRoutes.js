// Import Express
const express = require("express");

// Import Product Controllers
const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

// Create Router
const router = express.Router();

// ================= PRODUCT ROUTES =================

// GET ALL PRODUCTS
router.get("/", getProducts);

// GET SINGLE PRODUCT
router.get("/:id", getProductById);

// CREATE PRODUCT
router.post("/", createProduct);

// UPDATE PRODUCT
router.put("/:id", updateProduct);

// DELETE PRODUCT
router.delete("/:id", deleteProduct);

// Export Router
module.exports = router;