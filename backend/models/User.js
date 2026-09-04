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
    phone: {
      type: String,
      required: true,
      unique: true
    },

    // User Password
    password: {
      type: String,
      required: true
    },

    // OTP - We will use this at the end of the project
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