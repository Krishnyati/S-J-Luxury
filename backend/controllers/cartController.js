// Import Cart Model
const Cart = require("../models/Cart");

// Import Product Model
const Product = require("../models/Product");

// ================= CRUD OPERATIONS =================


// ================= ADD PRODUCT TO CART =================

// Add Product To Cart
const addToCart = async (req, res) => {
  try {

    // Get Product ID and Quantity
    const { productId, quantity = 1 } = req.body;

    // Validate Product ID and Quantity
    if (!productId || quantity < 1) {
      return res.status(400).json({
        message: "Product ID and valid quantity are required"
      });
    }

    // Check if Product Exists
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Your Product Not Found Here"
      });
    }

    // Find User Cart
    let cart = await Cart.findOne({
      user: req.userId
    });

    // Create Cart if User Does Not Have One
    if (!cart) {

      cart = await Cart.create({
        user: req.userId,
        items: [
          {
            product: productId,
            quantity: quantity
          }
        ]
      });

      // Get Updated Cart With Product Details
      const updatedCart = await Cart.findOne({
        user: req.userId
      }).populate("items.product");

      return res.status(201).json({
        message: "Your Product Added to the Cart",
        cart: updatedCart
      });
    }

    // Check if Product Already Exists in Cart
    const existingItem = cart.items.find(
      (item) =>
        item.product.toString() === productId
    );

    // If Product Already Exists
    if (existingItem) {

      existingItem.quantity += quantity;

    } else {

      // Add New Product To Cart
      cart.items.push({
        product: productId,
        quantity: quantity
      });
    }

    // Save Cart
    await cart.save();

    // Get Updated Cart With Product Details
    const updatedCart = await Cart.findOne({
      user: req.userId
    }).populate("items.product");

    // Send Response
    res.status(200).json({
      message: "Product Added to Cart Successfully",
      cart: updatedCart
    });

  } catch (error) {

    // Send Error
    res.status(400).json({
      message: error.message
    });
  }
};


// ================= GET USER CART =================

// Get User Cart
const getCart = async (req, res) => {
  try {

    // Find User Cart
    const cart = await Cart.findOne({
      user: req.userId
    }).populate("items.product");

    // Check Cart
    if (!cart) {

      // Return Empty Cart
      return res.status(200).json({
        message: "Cart is Empty",
        cart: {
          items: []
        }
      });
    }

    // Send Cart
    res.status(200).json({
      message: "Cart Fetched Here Successfully.....",
      cart
    });

  } catch (error) {

    // Send Error
    res.status(400).json({
      message: error.message
    });
  }
};


// ================= UPDATE CART QUANTITY =================

// Update Cart Quantity
const updateCart = async (req, res) => {
  try {

    // Get Product ID and Quantity
    const {
      productId,
      quantity
    } = req.body;

    // Validate Product ID and Quantity
    if (!productId || !quantity || quantity < 1) {
      return res.status(400).json({
        message: "Product Id and Valid quantity are required...."
      });
    }

    // Find User Cart
    const cart = await Cart.findOne({
      user: req.userId
    });

    // Check Cart
    if (!cart) {
      return res.status(404).json({
        message: "Cart Not Found Here"
      });
    }

    // Find Product in Cart
    const item = cart.items.find(
      (item) =>
        item.product.toString() === productId
    );

    // Check Product
    if (!item) {
      return res.status(404).json({
        message: "Your Product is not in your Cart..."
      });
    }

    // Update Quantity
    item.quantity = quantity;

    // Save Cart
    await cart.save();

    // Get Updated Cart With Product Details
    const updatedCart = await Cart.findOne({
      user: req.userId
    }).populate("items.product");

    // Send Response
    res.status(200).json({
      message: "Cart Quantity Updated Successfully....",
      cart: updatedCart
    });

  } catch (error) {

    // Send Error
    res.status(400).json({
      message: error.message
    });
  }
};


// ================= REMOVE PRODUCT FROM CART =================

// Remove Product From Cart
const removeFromCart = async (req, res) => {
  try {

    // Get Product ID
    const { productId } = req.body;

    // Find User Cart
    const cart = await Cart.findOne({
      user: req.userId
    });

    // Check Cart
    if (!cart) {
      return res.status(404).json({
        message: "Your Cart Not Found...."
      });
    }

    // Remove Product From Cart
    cart.items = cart.items.filter(
      (item) =>
        item.product.toString() !== productId
    );

    // Save Cart
    await cart.save();

    // Get Updated Cart With Product Details
    const updatedCart = await Cart.findOne({
      user: req.userId
    }).populate("items.product");

    // Send Response
    res.status(200).json({
      message: "Your Product From Cart Is Removed Successfully....",
      cart: updatedCart
    });

  } catch (error) {

    // Send Error
    res.status(400).json({
      message: error.message
    });
  }
};


// ================= CLEAR USER CART =================

// Clear User Cart
const clearCart = async (req, res) => {
  try {

    // Find User Cart
    const cart = await Cart.findOne({
      user: req.userId
    });

    // Check Cart
    if (!cart) {
      return res.status(404).json({
        message: "Your Cart Not Found Here...."
      });
    }

    // Remove All Products
    cart.items = [];

    // Save Cart
    await cart.save();

    // Send Response
    res.status(200).json({
      message: "Cart Cleared Successfully...."
    });

  } catch (error) {

    // Send Error
    res.status(400).json({
      message: error.message
    });
  }
};


// ================= EXPORT CART CONTROLLERS =================

// Export Cart Controllers
module.exports = {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
  clearCart
};