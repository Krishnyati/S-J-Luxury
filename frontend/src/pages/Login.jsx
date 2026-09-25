// Import React hooks
import { useEffect, useRef, useState } from "react";

// Import navigation tools
import { Link, useNavigate } from "react-router-dom";

// Import CSS
import "./Login.css";

function Login() {
  // ================= NAVIGATION =================
  const navigate = useNavigate();

  // ================= FORM DATA =================
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ================= PASSWORD VISIBILITY =================
  const [showPassword, setShowPassword] = useState(false);

  // ================= MESSAGE =================
  const [message, setMessage] = useState("");

  // ================= GOOGLE LOGIN =================
  const googleButtonRef = useRef(null);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= NORMAL LOGIN =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
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
        // Save token
        localStorage.setItem("token", data.token);

        // Create current user object
        const currentUser = {
          id: data.user?._id || data.user?.id,
          name: data.user?.name,
          email: data.user?.email,
          phone: data.user?.phone,
        };

        // Save user
        localStorage.setItem(
          "user",
          JSON.stringify(currentUser)
        );

        // Go to home page
        navigate("/");
      } else {
        setMessage(
          data.message || "Unable to Login. Please try again."
        );
      }
    } catch (error) {
      console.error("Login Error:", error);

      setMessage(
        "Unable To Connect With Server. Please Try Again Later."
      );
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async (response) => {
    try {
      setMessage("");

      const result = await fetch(
        "http://localhost:5000/api/auth/google-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: response.credential,
          }),
        }
      );

      const data = await result.json();

      if (result.ok) {
        // Save token
        localStorage.setItem("token", data.token);

        // Create current user
        const currentUser = {
          id: data.user?._id || data.user?.id,
          name: data.user?.name,
          email: data.user?.email,
          phone: data.user?.phone,
        };

        // Save user
        localStorage.setItem(
          "user",
          JSON.stringify(currentUser)
        );

        // Go to home page
        navigate("/");
      } else {
        setMessage(
          data.message || "Google Login Failed."
        );
      }
    } catch (error) {
      console.error("Google Login Error:", error);

      setMessage(
        "Unable To Connect With Server."
      );
    }
  };

  // ================= GOOGLE BUTTON =================
  useEffect(() => {
    if (
      window.google &&
      googleButtonRef.current &&
      import.meta.env.VITE_GOOGLE_CLIENT_ID
    ) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });

      window.google.accounts.id.renderButton(
        googleButtonRef.current,
        {
          theme: "outline",
          size: "large",
          width: 320,
          text: "continue_with",
          shape: "pill",
        }
      );
    }
  }, []);

  return (
    <div className="login-page">

      {/* ================= BACKGROUND ORBS ================= */}
      <div className="login-orb login-orb-one"></div>
      <div className="login-orb login-orb-two"></div>

      {/* ================= LOGIN CARD ================= */}
      <div className="login-scene">

        <div className="login-card">

          {/* ================= LOGO ================= */}
          <img
            src="/logo.jpeg"
            alt="S&J Luxury"
            className="login-logo"
          />

          {/* ================= BRAND ================= */}
          <span className="login-brand">
            S & J LUXURY
          </span>

          {/* ================= HEADING ================= */}
          <h1>WELCOME BACK</h1>

          <p className="login-subtitle">
            Sign in to continue to your account
          </p>

          {/* ================= LOGIN FORM ================= */}
          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            {/* EMAIL */}
            <div className="login-field">
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

            {/* PASSWORD */}
            <div className="login-field password-field">

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

              {/* SHOW / HIDE PASSWORD */}
              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>

            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="login-submit"
            >
              LOGIN
            </button>

          </form>

          {/* ================= OR ================= */}
          <div className="login-divider">
            <span>OR</span>
          </div>

          {/* ================= GOOGLE LOGIN ================= */}
          <div
            ref={googleButtonRef}
            className="google-login"
          ></div>

          {/* ================= MESSAGE ================= */}
          {message && (
            <p className="login-message">
              {message}
            </p>
          )}

          {/* ================= REGISTER ================= */}
          <p className="login-switch">
            Don't have an account?{" "}

            <Link
              to="/register"
              className="login-switch-link"
            >
              Create one
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;