import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";


function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const navigate = useNavigate();


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();


            if (response.ok) {

                // Save current login token
                localStorage.setItem(
                    "token",
                    data.token
                );

                /*
                   Remove the previous user's saved details.
                   This prevents Bhargav's name from appearing
                   when another user logs in.
                */
                localStorage.removeItem("user");
                localStorage.removeItem("userName");


                // Get the current user's real display name
                const displayName =
                    data.user?.displayName ||
                    data.user?.fullName ||
                    data.user?.name ||
                    data.displayName ||
                    data.fullName ||
                    data.name ||
                    data.username ||
                    formData.email.split("@")[0];


                // Save current logged-in user for Header.jsx
                const currentUser = {
                    ...(data.user || {}),
                    displayName: displayName,
                    name: displayName,
                    email:
                        data.user?.email ||
                        data.email ||
                        formData.email
                };

                localStorage.setItem(
                    "user",
                    JSON.stringify(currentUser)
                );


                setMessage("Login successful.");

                setTimeout(() => {
                    navigate("/");
                }, 500);

            } else {

                setMessage(
                    data.message ||
                    "Invalid email or password."
                );

            }

        } catch (error) {

            console.error("Login Error:", error);

            setMessage(
                "Unable to connect with server."
            );

        }

    };


    return (

        <div className="login-page">

            <div className="login-box">

                <img
                    src="/logo.jpeg"
                    alt="S&J Luxury Logo"
                    className="auth-logo"
                />

                <h1>
                    Welcome Back
                </h1>

                <p>
                    Login to S&J Luxury
                </p>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">
                        Login
                    </button>

                </form>


                {message && (

                    <p className="login-message">
                        {message}
                    </p>

                )}


                <p className="register-link">

                    Don't Have an Account?{" "}

                    <Link to="/register">
                        Create Your Account
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Login;