// Importing Mongoose
const mongoose = require("mongoose");

// Cart Item Schema
const cartItemSchema = new mongoose.Schema(
  {
    // Product ID
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    // Product Quantity
    quantity: {
      type: Number,
      required: true,
      min: 1
    }
  }
);

// Cart Schema
const cartSchema = new mongoose.Schema(
  {
    // User who owns the cart
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    // Products inside cart
    items: [cartItemSchema]
  },
  {
    timestamps: true
  }
);

// Create Cart Model
const Cart = mongoose.model("Cart", cartSchema);

// Export Cart Model
module.exports = Cart;