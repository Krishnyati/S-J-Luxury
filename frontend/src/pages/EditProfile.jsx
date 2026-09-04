// Import React Hooks
import { useEffect, useState } from "react";

// Import Navigation
import { Link, useNavigate } from "react-router-dom";

// Import CSS
import "./EditProfile.css";


// ================= EDIT PROFILE COMPONENT =================

function EditProfile() {

    // Navigation
    const navigate = useNavigate();


    // Store User Information
    const [formData, setFormData] = useState({

        name: "",
        email: "",
        phone: ""

    });


    // Store Message
    const [message, setMessage] = useState("");


    // Store Loading Status
    const [loading, setLoading] = useState(true);


    // Store Saving Status
    const [saving, setSaving] = useState(false);


    // ================= FETCH PROFILE =================

    useEffect(() => {

        const fetchProfile = async () => {

            // Get Login Token
            const token =
                localStorage.getItem("token");


            // Check Login
            if (!token) {

                navigate("/login");

                return;

            }


            try {

                // Fetch Profile
                const response = await fetch(
                    "http://localhost:5000/api/auth/profile",
                    {
                        method: "GET",

                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );


                // Convert Response
                const data =
                    await response.json();


                // Check Response
                if (response.ok) {

                    setFormData({

                        name: data.user.name || "",

                        email: data.user.email || "",

                        phone: data.user.phone || ""

                    });

                } else {

                    setMessage(
                        data.message ||
                        "Unable to fetch profile."
                    );

                }

            } catch (error) {

                console.error(
                    "Edit Profile Fetch Error:",
                    error
                );

                setMessage(
                    "Unable to connect to server."
                );

            } finally {

                setLoading(false);

            }

        };


        fetchProfile();

    }, [navigate]);


    // ================= HANDLE INPUT =================

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };


    // ================= SAVE PROFILE =================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Clear Previous Message
        setMessage("");


        // Get Login Token
        const token =
            localStorage.getItem("token");


        // Check Login
        if (!token) {

            navigate("/login");

            return;

        }


        try {

            // Start Saving
            setSaving(true);


            // Update Profile
            const response = await fetch(
                "http://localhost:5000/api/auth/profile",
                {
                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        name: formData.name,

                        email: formData.email,

                        phone: formData.phone

                    })

                }
            );


            // Convert Response
            const data =
                await response.json();


            // Check Response
            if (response.ok) {

                // Update Stored User Name
                localStorage.setItem(
                    "userName",
                    data.user.name
                );


                // Show Success Message
                setMessage(
                    "Profile Updated Successfully."
                );


                // Go To Profile
                setTimeout(() => {

                    navigate("/profile");

                }, 1000);

            } else {

                // Show Backend Error
                setMessage(
                    data.message ||
                    "Unable to update profile."
                );

            }

        } catch (error) {

            console.error(
                "Update Profile Error:",
                error
            );

            setMessage(
                "Unable to connect to server."
            );

        } finally {

            setSaving(false);

        }

    };


    // ================= LOADING =================

    if (loading) {

        return (

            <div className="edit-profile-page">

                <h2>
                    Loading Profile...
                </h2>

            </div>

        );

    }


    // ================= EDIT PROFILE UI =================

    return (

        <div className="edit-profile-page">


            {/* ================= HEADER ================= */}

            <div className="edit-profile-header">

                <p>
                    S&J LUXURY
                </p>

                <h1>
                    Edit Profile
                </h1>

                <span>
                    Update your personal account information.
                </span>

            </div>


            {/* ================= EDIT PROFILE CARD ================= */}

            <div className="edit-profile-card">


                {/* ================= PROFILE ICON ================= */}

                <div className="edit-profile-avatar">
                    👤
                </div>


                {/* ================= FORM ================= */}

                <form
                    onSubmit={handleSubmit}
                    className="edit-profile-form"
                >


                    {/* NAME */}

                    <div className="edit-profile-field">

                        <label>
                            FULL NAME
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter Your Full Name"
                            required
                        />

                    </div>


                    {/* EMAIL */}

                    <div className="edit-profile-field">

                        <label>
                            EMAIL ADDRESS
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter Your Email Address"
                            required
                        />

                    </div>


                    {/* PHONE */}

                    <div className="edit-profile-field">

                        <label>
                            PHONE NUMBER
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Enter Your Phone Number"
                            required
                        />

                    </div>


                    {/* MESSAGE */}

                    {message && (

                        <p className="edit-profile-message">
                            {message}
                        </p>

                    )}


                    {/* ================= ACTION BUTTONS ================= */}

                    <div className="edit-profile-actions">

                        <button
                            type="submit"
                            disabled={saving}
                        >
                            {saving
                                ? "SAVING..."
                                : "SAVE CHANGES"
                            }
                        </button>


                        <Link to="/profile">
                            CANCEL
                        </Link>

                    </div>


                </form>

            </div>

        </div>

    );

}


// Export Component
export default EditProfile;