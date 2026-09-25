// Import Mongoose
const mongoose = require("mongoose");

// Create Favorite Schema
const favoriteSchema = new mongoose.Schema(
    {
        // User who added the product
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        // Product added to favorites
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        }
    },
    {
        timestamps: true
    }
);

// Prevent same user from adding same product twice
favoriteSchema.index(
    { user: 1, product: 1 },
    { unique: true }
);

// Create Favorite Model
const Favorite = mongoose.model(
    "Favorite",
    favoriteSchema
);

// Export Favorite Model
module.exports = Favorite;