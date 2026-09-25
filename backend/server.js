// Load Environment Variables
require("dotenv").config();

// Import Express
const express = require("express");

// Import CORS
const cors = require("cors");

// Import Authentication Middleware
const protect = require("./middleware/authMiddleware");

// Import Authentication Routes
const authRoutes = require("./routes/authRoutes");

// Import Database Connection
const connectDB = require("./config/database");

// Import Product Routes
const productRoutes = require("./routes/productRoutes");

// Import Cart Routes
const cartRoutes = require("./routes/cartRoutes");

// Import Favorite Routes
const favoriteRoutes = require("./routes/favoriteRoutes");


// Create Express Application
const app = express();


// Enable CORS
app.use(cors());


// Allow JSON Data
app.use(express.json());


// Connect To Database
connectDB();


// Product API Routes
app.use("/api/products", productRoutes);


// Authentication Routes
app.use("/api/auth", authRoutes);


// Cart API Routes
app.use("/api/cart", cartRoutes);


// Favorite API Routes
app.use("/api/favorites", favoriteRoutes);


// Test API Route
app.get("/", (req, res) => {

    res.json({
        message: "S&J Luxury API is running successfully!"
    });

});


// Temporary Protected Route
app.get("/api/protected", protect, (req, res) => {

    res.json({
        message: "You are authenticated!",
        userId: req.userId
    });

});


// Server Port
const PORT = process.env.PORT || 5000;


// Start Server
app.listen(PORT, () => {

    console.log(
        `Server running on http://localhost:${PORT}`
    );

});