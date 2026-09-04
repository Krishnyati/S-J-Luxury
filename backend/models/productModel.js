// Import mongoose
const mongoose = require("mongoose");

// Create product schema
const productSchema = new mongoose.Schema({

    // Product name
    name: {
        type: String,
        required: true
    },

    // Product category
    category: {
        type: String,
        required: true
    },

    // Product price
    price: {
        type: Number,
        required: true
    },

    // Discount
    discount: {
        type: Number,
        default: 0
    },

    // Product description
    description: {
        type: String
    },

    // Product image
    image: {
        type: String
    },

    // Product color
    color: {
        type: String
    },

    // Product material
    material: {
        type: String
    },

    // Product style
    style: {
        type: String
    },

    // Bag type
    bag_type: {
        type: String
    },

    // Closure type
    closure: {
        type: String
    },

    // Handle
    handle: {
        type: String
    },

    // Strap
    strap: {
        type: String
    },

    // Occasion
    occasion: {
        type: String
    },

    // Gender
    gender: {
        type: String
    },

    // Pattern
    pattern: {
        type: String
    },

    // Hardware
    hardware: {
        type: String
    },

    // Surface work
    surface_work: {
        type: String
    },

    // Product shape
    shape: {
        type: String
    },

    // Brand
    brand: {
        type: String
    }

}, {
    timestamps: true
});

// Create model
mongoose.model("Product", productSchema);