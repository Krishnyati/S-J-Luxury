// Import Mongoose
const mongoose = require("mongoose");

// Load Product Model
require("../models/productModel");

// Get Product Model
const Product = mongoose.model("Product");

// ================= PRODUCT CONTROLLERS =================

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json(products);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// GET SINGLE PRODUCT BY ID
const getProductById = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product Not Found"
            });
        }

        res.status(200).json(product);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};


// CREATE NEW PRODUCT
const createProduct = async (req, res) => {
    try {

        const product = new Product(req.body);

        await product.save();

        res.status(201).json(product);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {
    try {

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Your Product Does Not Exist Here"
            });
        }

        res.status(200).json(product);

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {

        const product = await Product.findByIdAndDelete(
            req.params.id
        );

        if (!product) {
            return res.status(404).json({
                message: "Your Product Does Not Exist Here"
            });
        }

        res.status(200).json({
            message: "Product Deleted Successfully"
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};


// ================= EXPORT =================

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};