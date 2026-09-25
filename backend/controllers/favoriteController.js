// Import Favorite Model
const Favorite = require("../models/Favorite");

// Import Product Model
const Product = require("../models/Product");


// ================= ADD TO FAVORITES =================

const addToFavorites = async (req, res) => {

    try {

        // Get Product ID
        const { productId } = req.body;

        // Check Product ID
        if (!productId) {

            return res.status(400).json({
                message: "Product ID is required"
            });

        }

        // Check If Product Exists
        const product = await Product.findById(productId);

        if (!product) {

            return res.status(404).json({
                message: "Your Product Not Found"
            });

        }

        // Check If Product Is Already In Favorites
        const existingFavorite = await Favorite.findOne({
            user: req.userId,
            product: productId
        });

        if (existingFavorite) {

            return res.status(400).json({
                message: "Your Product is already in Favorites"
            });

        }

        // Create Favorite
        const favorite = await Favorite.create({
            user: req.userId,
            product: productId
        });

        // Get Favorite With Product Details
        const savedFavorite = await Favorite
            .findById(favorite._id)
            .populate("product");

        // Send Response
        res.status(201).json({
            message: "Your Product Added To Favorites Successfully",
            favorite: savedFavorite
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// ================= GET FAVORITES =================

const getFavorites = async (req, res) => {

    try {

        // Find User Favorites
        const favorites = await Favorite.find({
            user: req.userId
        }).populate("product");

        // Send Favorites
        res.status(200).json({
            message: "Favorites Fetched Successfully",
            favorites
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// ================= REMOVE FROM FAVORITES =================

const removeFromFavorites = async (req, res) => {

    try {

        // Get Product ID
        const { productId } = req.body;

        // Check Product ID
        if (!productId) {

            return res.status(400).json({
                message: "Product ID is required"
            });

        }

        // Find And Delete Favorite
        const favorite = await Favorite.findOneAndDelete({
            user: req.userId,
            product: productId
        });

        // Check Favorite
        if (!favorite) {

            return res.status(404).json({
                message: "Product is not in your Favorites"
            });

        }

        // Send Response
        res.status(200).json({
            message: "Product Removed From Favorites Successfully"
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// ================= CLEAR FAVORITES =================

const clearFavorites = async (req, res) => {

    try {

        // Remove All Favorites Of Logged In User
        await Favorite.deleteMany({
            user: req.userId
        });

        // Send Response
        res.status(200).json({
            message: "Favorites Cleared Successfully"
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

};


// ================= EXPORT =================

module.exports = {
    addToFavorites,
    getFavorites,
    removeFromFavorites,
    clearFavorites
};