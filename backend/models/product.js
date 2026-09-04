// Import mongoose
const mongoose = require("mongoose");

// Create Product Schema / database
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

    // Product stock
    stock: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

// Create Product Model
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

// Export Product Model
module.exports = Product;