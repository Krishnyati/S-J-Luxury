// Import User Model
const User = require("../models/User");

// Import Bcrypt for Password Hashing
const bcrypt = require("bcryptjs");

// Import JWT
const jwt = require("jsonwebtoken");

// Import Nodemailer
const nodemailer = require("nodemailer");

// Import Google Authentication
const { OAuth2Client } = require("google-auth-library");

// Create Google OAuth Client
const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

// Create Email Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});


// Generate Email OTP of 6 Digits
const generateOTP = () => {

    return Math.floor(
        100000 + Math.random() * 900000
    ).toString();

};


// ================= REGISTER USER =================

const registerUser = async (req, res) => {

    try {

        // Get User Details From Request
        const {
            name,
            email,
            phone,
            password
        } = req.body;


        // Check Required Fields
        if (!name || !email || !phone || !password) {

            return res.status(400).json({
                message: "Please fill all required fields"
            });

        }


        // Check if User Email Already Exists
        const existingUser = await User.findOne({
            email
        });


        if (existingUser) {

            return res.status(400).json({
                message: "User Already Exists"
            });

        }


        // Check if Phone Number Already Exists
        const existingPhone = await User.findOne({
            phone
        });


        if (existingPhone) {

            return res.status(400).json({
                message: "Phone Number Already Registered"
            });

        }


        // Hash Password Before Saving
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Generate OTP
        const otp = generateOTP();


        // OTP Expires After 10 Minutes
        const otpExpire = new Date(
            Date.now() + 10 * 60 * 1000
        );


        // Create New User
        const user = await User.create({

            name,
            email,
            phone,
            password: hashedPassword,
            otp,
            otpExpire,
            isVerified: false

        });


        // Send OTP Email
        await transporter.sendMail({

            from: process.env.EMAIL_USER,

            to: email,

            subject: "S&J Luxury - Email Verification",

            html: `
                <h2>S&J LUXURY</h2>

                <p>Hello ${name},</p>

                <p>
                    Thank you for registering with
                    S&J Luxury.
                </p>

                <p>
                    Your email verification OTP is:
                </p>

                <h1>${otp}</h1>

                <p>
                    This OTP will expire in 10 minutes.
                </p>

                <p>
                    Regards,<br />
                    S&J Luxury Team
                </p>
            `

        });


        // Send Response
        res.status(201).json({

            message:
                "User Registered Successfully. OTP Sent To Your Registered Email.",

            userId: user._id

        });

    } catch (error) {

        // Display Error
        console.error(
            "Register User Error:",
            error
        );

        res.status(500).json({

            message:
                error.message

        });

    }

};


// ================= VERIFY EMAIL OTP =================

const verifyEmail = async (req, res) => {

    try {

        // Get Email And OTP
        const {
            email,
            otp
        } = req.body;


        // Check Required Fields
        if (!email || !otp) {

            return res.status(400).json({

                message:
                    "Email and OTP are required"

            });

        }


        // Find User
        const user = await User.findOne({
            email
        });


        // Check User
        if (!user) {

            return res.status(404).json({

                message:
                    "User Not Found"

            });

        }


        // Check Already Verified
        if (user.isVerified) {

            return res.status(400).json({

                message:
                    "Email Is Already Verified"

            });

        }


        // Check OTP Expiration
        if (
            !user.otpExpire ||
            user.otpExpire < new Date()
        ) {

            return res.status(400).json({

                message:
                    "OTP Has Expired. Please Register Again."

            });

        }


        // Check OTP
        if (user.otp !== otp) {

            return res.status(400).json({

                message:
                    "Invalid OTP. Please Re-enter OTP."

            });

        }


        // Verify Email
        user.isVerified = true;


        // Remove OTP
        user.otp = undefined;

        user.otpExpire = undefined;


        // Save User
        await user.save();


        // Send Response
        res.status(200).json({

            message:
                "Email Verified Successfully. You Can Now Login."

        });

    } catch (error) {

        // Display Error
        console.error(
            "Verify Email Error:",
            error
        );

        res.status(500).json({

            message:
                "Unable To Verify Email"

        });

    }

};


// ================= LOGIN USER =================

const loginUser = async (req, res) => {

    try {

        // Get Login Details
        const {
            email,
            password
        } = req.body;


        // Check Email And Password
        if (!email || !password) {

            return res.status(400).json({

                message:
                    "Email and Password are required"

            });

        }


        // Find User By Email
        const user = await User.findOne({
            email
        });


        // Check User
        if (!user) {

            return res.status(400).json({

                message:
                    "Invalid Email or Password"

            });

        }


        // Check Email Verification
        if (!user.isVerified) {

            return res.status(403).json({

                message:
                    "Please Verify Your Email Before Login"

            });

        }


        // Check If User Uses Google Login
        if (!user.password) {

            return res.status(400).json({

                message:
                    "This account uses Google Login. Please login with Google."

            });

        }


        // Compare Password
        const isPasswordCorrect =
            await bcrypt.compare(
                password,
                user.password
            );


        // Check Password
        if (!isPasswordCorrect) {

            return res.status(400).json({

                message:
                    "Invalid Email or Password"

            });

        }


        // Create JWT Token
        const token = jwt.sign(

            {
                userId: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );


        // Send Login Response
        res.status(200).json({

            message:
                "User Login Successfully",

            token,

            name: user.name

        });

    } catch (error) {

        // Display Login Error
        console.error(
            "Login User Error:",
            error
        );

        res.status(500).json({

            message:
                error.message

        });

    }

};


// ================= GET USER PROFILE =================

const getProfile = async (req, res) => {

    try {

        // Find Logged-In User
        const user = await User
            .findById(req.userId)
            .select("-password");


        // Check User
        if (!user) {

            return res.status(404).json({

                message:
                    "User not found"

            });

        }


        // Send User Profile
        res.status(200).json({

            user

        });

    } catch (error) {

        // Display Error
        console.error(
            "Get Profile Error:",
            error
        );

        res.status(500).json({

            message:
                "Unable to fetch profile"

        });

    }

};


// ================= UPDATE USER PROFILE =================

const updateProfile = async (req, res) => {

    try {

        // Get Updated Details
        const {
            name,
            email,
            phone
        } = req.body;


        // Check Required Fields
        if (!name || !email || !phone) {

            return res.status(400).json({

                message:
                    "Name, Email and Phone are required"

            });

        }


        // Find Logged-In User
        const user = await User.findById(
            req.userId
        );


        // Check User
        if (!user) {

            return res.status(404).json({

                message:
                    "User not found"

            });

        }


        // Check Email Already Used By Another User
        const existingEmail = await User.findOne({

            email,

            _id: {
                $ne: req.userId
            }

        });


        if (existingEmail) {

            return res.status(400).json({

                message:
                    "Email is already registered"

            });

        }


        // Check Phone Already Used By Another User
        const existingPhone = await User.findOne({

            phone,

            _id: {
                $ne: req.userId
            }

        });


        if (existingPhone) {

            return res.status(400).json({

                message:
                    "Phone number is already registered"

            });

        }


        // Update User Information
        user.name = name;
        user.email = email;
        user.phone = phone;


        // Save Updated User
        await user.save();


        // Send Updated User Without Password
        const updatedUser = await User
            .findById(req.userId)
            .select("-password");


        // Send Response
        res.status(200).json({

            message:
                "Profile Updated Successfully",

            user: updatedUser

        });

    } catch (error) {

        // Display Error
        console.error(
            "Update Profile Error:",
            error
        );

        res.status(500).json({

            message:
                "Unable to update profile"

        });

    }

};


// ================= GOOGLE LOGIN =================

const googleLogin = async (req, res) => {

    try {

        // Get Google Credential From Request
        const {
            credential
        } = req.body;


        // Check Credential
        if (!credential) {

            return res.status(400).json({

                message:
                    "Google Credential is Required"

            });

        }


        // Verify Google ID Token
        const ticket = await googleClient.verifyIdToken({

            idToken: credential,

            audience:
                process.env.GOOGLE_CLIENT_ID

        });


        // Get Google User Information
        const payload = ticket.getPayload();


        // Get Important Google Details
        const {
            sub,
            email,
            name,
            email_verified
        } = payload;


        // Check Google Email Verification
        if (!email_verified) {

            return res.status(400).json({

                message:
                    "Google Email is Not Verified"

            });

        }


        // Find User Using Google ID
        let user = await User.findOne({

            googleId: sub

        });


        // If User Is Not Found By Google ID
        if (!user) {

            // Check Whether Email Already Exists
            user = await User.findOne({

                email: email

            });


            // If Email User Exists
            if (user) {

                // Connect Google Account
                user.googleId = sub;

                // Google Already Verified This Email
                user.isVerified = true;

                await user.save();

            }

            // If New Google User
            else {

                user = await User.create({

                    name:
                        name || "Google User",

                    email:
                        email,

                    googleId:
                        sub,

                    isVerified:
                        true

                });

            }

        }


        // Create Our Application JWT
        const token = jwt.sign(

            {
                userId: user._id
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );


        // Send Login Response
        res.status(200).json({

            message:
                "Google Login Successfully",

            token,

            name:
                user.name,

            email:
                user.email

        });

    } catch (error) {

        // Display Google Login Error
        console.error(
            "Google Login Error:",
            error
        );


        // Send Error Response
        res.status(500).json({

            message:
                "Unable To Login With Your Google Account. Please Try Again Later."

        });

    }

};


// ================= EXPORT =================

module.exports = {
    registerUser,
    verifyEmail,
    loginUser,
    getProfile,
    updateProfile,
    googleLogin
};