// Import React hook
import { useState } from "react";

// Import navigation
import { Link, useNavigate } from "react-router-dom";

// Import CSS
import "./Register.css";

function Register() {

  // ================= NAVIGATION =================
  const navigate = useNavigate();

  // ================= FORM DATA =================
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  // ================= PASSWORD VISIBILITY =================
  const [showPassword, setShowPassword] = useState(false);

  // ================= MESSAGE =================
  const [message, setMessage] = useState("");

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= REGISTER =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {

        // Save email for OTP verification
        localStorage.setItem(
          "verificationEmail",
          formData.email
        );

        // Go to verification page
        navigate("/verify-email");

      } else {

        setMessage(
          data.message ||
          "Registration Failed. Please try again."
        );

      }

    } catch (error) {

      console.error(
        "Registration Error:",
        error
      );

      setMessage(
        "Unable To Connect With Server. Please Try Again Later."
      );
    }
  };

  return (
    <div className="register-page">

      {/* ================= BACKGROUND ORBS ================= */}

      <div className="register-orb register-orb-one"></div>

      <div className="register-orb register-orb-two"></div>


      {/* ================= REGISTER CARD ================= */}

      <div className="register-scene">

        <div className="register-card">

          {/* ================= LOGO ================= */}

          <img
            src="/logo.jpeg"
            alt="S&J Luxury"
            className="register-logo"
          />


          {/* ================= BRAND ================= */}

          <span className="register-brand">
            S & J LUXURY
          </span>


          {/* ================= HEADING ================= */}

          <h1>
            CREATE ACCOUNT
          </h1>


          <p className="register-subtitle">
            Join us and discover luxury that defines you
          </p>


          {/* ================= REGISTER FORM ================= */}

          <form
            className="register-form"
            onSubmit={handleSubmit}
          >

            {/* ================= NAME ================= */}

            <div className="register-field">

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                required
              />

              <label>
                Full Name
              </label>

            </div>


            {/* ================= EMAIL ================= */}

            <div className="register-field">

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
              />

              <label>
                Email Address
              </label>

            </div>


            {/* ================= PHONE ================= */}

            <div className="register-field">

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder=" "
                required
              />

              <label>
                Phone Number
              </label>

            </div>


            {/* ================= PASSWORD ================= */}

            <div className="register-field">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=" "
                required
              />

              <label>
                Password
              </label>


              {/* SHOW / HIDE */}

              <button
                type="button"
                className="register-password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>

            </div>


            {/* ================= REGISTER BUTTON ================= */}

            <button
              type="submit"
              className="register-submit"
            >
              REGISTER
            </button>

          </form>


          {/* ================= MESSAGE ================= */}

          {message && (
            <p className="register-message">
              {message}
            </p>
          )}


          {/* ================= LOGIN ================= */}

          <p className="register-switch">

            Already have an account?{" "}

            <Link
              to="/login"
              className="register-switch-link"
            >
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;