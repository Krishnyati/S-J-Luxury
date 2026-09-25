//Import Express
const express = require("express");

//Importing Cart Controller
const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart
}=require("../controllers/cartController");

//Importing Authentication MiddleWare
const protect = require("../middleware/authMiddleware");

//Create Route
const router = express.Router();

//POST Add To Product to Cart
router.post("/add",protect, addToCart);

//Get Product From Existing Cart
router.get("/",protect, getCart);

//Updqting Product From Existing Cart
router.put("/update", protect, updateCart);

//Removing Product From Existing Cart 
router.delete("/remove",protect,removeFromCart);

//Delete- Clear Entire Cart
router.delete("/clear",protect,clearCart);

//Export Router
module.exports = router;