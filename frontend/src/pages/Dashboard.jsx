// Import React Hooks
import { useEffect, useState } from "react";

// Import Navigation
import { useNavigate } from "react-router-dom";

// Import Dashboard CSS
import "./Dashboard.css";

// Dashboard Component
function Dashboard() {

    // Navigation function
    const navigate = useNavigate();

    // Store logged-in user's name
    const [userName, setUserName] = useState("User");


    // Get User Name
    useEffect(() => {

        // Get saved user name from localStorage
        const savedUserName =
            localStorage.getItem("userName");

        // Display saved user name
        if (savedUserName) {
            setUserName(savedUserName);
        }

    }, []);


    // Profile Navigation
    const handleProfile = () => {
        navigate("/profile");
    };


    // Logout
    const handleLogout = () => {

        // Remove login token
        localStorage.removeItem("token");

        // Remove saved user name
        localStorage.removeItem("userName");

        // Go back to Home page
        navigate("/");
    };


    // Dashboard UI
    return (
        <div className="dashboard-page">

            {/* Dashboard Header */}

            <div className="dashboard-header">

                <div>

                    {/* S&J Luxury Label */}

                    <p className="dashboard-label">
                        S&J LUXURY
                    </p>


                    {/* User Greeting */}

                    <h1>
                        Hello, {userName} 👋
                    </h1>


                    {/* Dashboard Subtitle */}

                    <p className="dashboard-subtitle">
                        Welcome to your personal luxury collection.
                    </p>

                </div>


                {/* Logout Button */}

                <button
                    type="button"
                    className="dashboard-logout"
                    onClick={handleLogout}
                >
                    LOGOUT
                </button>

            </div>


            {/* Dashboard Cards */}

            <div className="dashboard-grid">

                {/* Profile Card */}

                <div
                    className="dashboard-card"
                    onClick={handleProfile}
                >

                    <div className="dashboard-icon">
                        👤
                    </div>


                    <div>

                        <h2>
                            My Profile
                        </h2>

                        <p>
                            View and manage your personal information.
                        </p>

                    </div>


                    <span className="dashboard-arrow">
                        →
                    </span>

                </div>

            </div>


            {/* Continue Shopping */}

            <div className="dashboard-shopping">

                <div>

                    <p>
                        DISCOVER MORE
                    </p>

                    <h2>
                        Explore Our Luxury Collection
                    </h2>

                    <span>
                        Find something beautiful for every occasion.
                    </span>

                </div>


                {/* Continue Shopping Button */}

                <button
                    type="button"
                    onClick={() => navigate("/")}
                >
                    CONTINUE SHOPPING
                </button>

            </div>

        </div>
    );
}


// Export Dashboard Component
export default Dashboard;