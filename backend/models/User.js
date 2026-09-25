// Import Mongoose
const mongoose = require("mongoose");

// Creating User Schema
const userSchema = new mongoose.Schema(
    {
        // User Full Name
        name: {
            type: String,
            required: true
        },

        // User Email ID
        email: {
            type: String,
            required: true,
            unique: true
        },

        // User Phone Number
        // Optional for Google users
        phone: {
            type: String,
            unique: true,
            sparse: true
        },

        // User Password
        // Optional for Google users
        password: {
            type: String
        },

        // Google Account ID
        // This will be used for Google Login
        googleId: {
            type: String,
            unique: true,
            sparse: true
        },

        // OTP - We will use this for Email Verification
        otp: {
            type: String
        },

        // OTP Expiration Time
        otpExpire: {
            type: Date
        },

        // Email Verification Status
        isVerified: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

// Create User Model
const User = mongoose.model("User", userSchema);

// Export User Model
module.exports = User;