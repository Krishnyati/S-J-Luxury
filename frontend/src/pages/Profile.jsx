// Import React Hooks
import { useEffect, useState } from "react";

// Import Link for navigation
import { Link } from "react-router-dom";

// Import Profile CSS
import "./Profile.css";

// PROFILE COMPONENT

function Profile() {

    // Store logged-in user's profile
    const [user, setUser] = useState(null);

    // Store loading status
    const [loading, setLoading] = useState(true);

    // Store error message
    const [message, setMessage] = useState("");


    // ================= FETCH USER PROFILE =================

    useEffect(() => {

        const fetchProfile = async () => {

            // Get login token
            const token = localStorage.getItem("token");

            // Check login
            if (!token) {

                setMessage(
                    "Please login to view your profile."
                );

                setLoading(false);

                return;
            }

            try {

                // Get logged-in user's profile
                const response = await fetch(
                    "http://localhost:5000/api/auth/profile",
                    {
                        method: "GET",

                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Convert response into JSON
                const data = await response.json();

                // Check successful response
                if (response.ok) {

                    setUser(data.user);

                } else {

                    setMessage(
                        data.message ||
                        "Unable to fetch profile."
                    );
                }

            } catch (error) {

                // Display error in console
                console.error(
                    "Profile Error:",
                    error
                );

                setMessage(
                    "Unable to connect to server."
                );

            } finally {

                // Stop loading
                setLoading(false);
            }
        };

        fetchProfile();

    }, []);


    // ================= LOADING SCREEN =================

    if (loading) {

        return (
            <div className="profile-page">

                <h2>
                    Loading Profile...
                </h2>

            </div>
        );
    }


    // ================= LOGIN REQUIRED =================

    if (message || !user) {

        return (
            <div className="profile-page empty-profile">

                <p className="profile-label">
                    S&J LUXURY
                </p>

                <h1>
                    My Profile
                </h1>

                <p>
                    {message ||
                        "Unable to load profile."}
                </p>

                <Link to="/login">
                    LOGIN
                </Link>

            </div>
        );
    }


    // ================= PROFILE UI =================

    return (

        <div className="profile-page">

            {/* ================= PROFILE HEADER ================= */}

            <div className="profile-header">

                <p>
                    S&J LUXURY
                </p>

                <h1>
                    My Profile
                </h1>

                <span>
                    Your personal account information.
                </span>

            </div>


            {/* ================= PROFILE CARD ================= */}

            <div className="profile-card">

                {/* ================= PROFILE ICON ================= */}

                <div className="profile-avatar">
                    👤
                </div>


                {/* ================= USER INFORMATION ================= */}

                <div className="profile-information">


                    {/* NAME */}

                    <div className="profile-field">

                        <span>
                            Full Name
                        </span>

                        <strong>
                            {user.name}
                        </strong>

                    </div>


                    {/* EMAIL */}

                    <div className="profile-field">

                        <span>
                            Email Address
                        </span>

                        <strong>
                            {user.email}
                        </strong>

                    </div>


                    {/* PHONE */}

                    <div className="profile-field">

                        <span>
                            Phone Number
                        </span>

                        <strong>
                            {user.phone}
                        </strong>

                    </div>

                </div>


                {/* ================= BACK TO DASHBOARD ================= */}

                <div className="profile-actions">

                    {/* Edit Profile */}
                    <Link to="/edit-profile">
                        EDIT PROFILE
                    </Link>

                    {/* Back To Dashboard */}
                    <Link to="/dashboard">
                        BACK TO DASHBOARD
                    </Link>
                </div>
            </div>
        </div>
    );
}

// EXPORT PROFILE COMPONENT

export default Profile;