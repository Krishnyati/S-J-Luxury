// Import Express
const express = require("express");


// Import Authentication Controllers
const { registerUser, verifyEmail, loginUser, getProfile, updateProfile, googleLogin } = require("../controllers/authControllers");


// Import Authentication Middleware
const protect = require("../middleware/authMiddleware");


// Create Router
const router = express.Router();


// ================= AUTH ROUTES =================

// Register
router.post( "/register", registerUser );

// Verify Email
router.post( "/verify-email", verifyEmail );

// Login
router.post( "/login", loginUser );

//Google Login Route
router.post("/google-login", googleLogin);

// Get Profile
router.get( "/profile", protect, getProfile );

// Update Profile
router.put( "/profile", protect , updateProfile );

// Export Router
module.exports = router;