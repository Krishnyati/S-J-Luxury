//Import Express
const express = require("express");

//Import Favorite controlllers
const {
    addToFavorites,
    getFavorites,
    removeFromFavorites,
    clearFavorites
}=require("../controllers/favoriteController");

//Import Authentication Middleware
const protect = require("../middleware/authMiddleware");

//Craete Router
const router = express.Router();

//Favorite ROUTES

//ADD Product to Favorite
router.post("/add", protect, addToFavorites);

//Get User Favorite
router.get("/",protect, getFavorites);

//Remove Product From Favorite
router.delete("/remove",protect, removeFromFavorites);

//Clear ALL Favorites
router.delete("/clear",protect,clearFavorites);

//Export Router
module.exports = router;