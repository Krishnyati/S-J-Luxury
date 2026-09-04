// Import React
import React, { useState } from "react";

// Import Navigation
import { useNavigate } from "react-router-dom";

// Import Register CSS
import "./Register.css";

// Register Component
function Register() {

    // Navigation function
    const navigate = useNavigate();

    // Registration Form State
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
    });

    // Message State
    const [message, setMessage] = useState("");

    // Handle Input Changes
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    // Handle Registration
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // Send Registration Request
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                    },

                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        phone: formData.phone,
                        password: formData.password,
                    }),
                }
            );

            // Convert Response To JSON
            const data = await response.json();

            // Check Registration
            if (response.ok) {

                // Save Email For OTP Verification
                localStorage.setItem(
                    "verificationEmail",
                    formData.email
                );

                // Show Success Message
                setMessage(
                    "Registration successful. OTP sent to your email."
                );

                // Go To OTP Verification Page
                setTimeout(() => {
                    navigate("/verify-email");
                }, 1000);

            } else {

                // Show Backend Error
                setMessage(
                    data.message ||
                    "Registration failed"
                );

            }

        } catch (error) {

            // Display Error In Console
            console.error(
                "Registration Error:",
                error
            );

            // Show Connection Error
            setMessage(
                "Unable to connect to server"
            );

        }

    };

    // Register Page UI
    return (

        <div className="register-page">

            <div className="register-box">

                {/* S&J Luxury Logo */}

                <img
                    src="/logo.jpeg"
                    alt="S&J Luxury Logo"
                    className="auth-logo"
                />

                {/* Register Heading */}

                <h1>
                    Create Account
                </h1>

                <p>
                    Join S&J Luxury
                </p>

                {/* Registration Form */}

                <form onSubmit={handleSubmit}>

                    {/* Name */}

                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Full Name Here"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    {/* Email */}

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Your Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    {/* Password */}

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Your Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    {/* Phone */}

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter Your Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    {/* Create Account Button */}

                    <button type="submit">
                        Create Account
                    </button>

                </form>

                {/* Registration Message */}

                {message && (
                    <p className="register-message">
                        {message}
                    </p>
                )}

            </div>

        </div>

    );
}

// Export Register Component
export default Register;