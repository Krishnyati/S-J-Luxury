import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./Header.css";


function Header() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const isLoggedIn = Boolean(
        localStorage.getItem("token")
    );

    let user = null;

    try {
        const storedUser = localStorage.getItem("user");

        user = storedUser
            ? JSON.parse(storedUser)
            : null;

    } catch (error) {
        console.log("Unable to read user details.");
    }

    const userName =
        user?.displayName ||
        user?.fullName ||
        user?.name ||
        user?.username ||
        "My Account";


    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 40);
        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };

    }, []);


    const closeMenu = () => {
        setMenuOpen(false);
    };


    const handleHomeClick = () => {

        closeMenu();

        navigate("/");
    };


    const handleShopClick = () => {

        closeMenu();

        if (window.location.pathname === "/") {

            document
                .getElementById("shop")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        } else {

            navigate("/");

            setTimeout(() => {

                document
                    .getElementById("shop")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }, 300);
        }
    };


    const handleSearchClick = () => {

        closeMenu();

        if (window.location.pathname === "/") {

            document
                .getElementById("shop")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

            setTimeout(() => {

                document
                    .getElementById("product-search")
                    ?.focus();

            }, 500);

        } else {

            navigate("/");

            setTimeout(() => {

                document
                    .getElementById("shop")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

                document
                    .getElementById("product-search")
                    ?.focus();

            }, 500);
        }
    };


    const handleAboutClick = () => {

        closeMenu();

        if (window.location.pathname === "/") {

            document
                .getElementById("about")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        } else {

            navigate("/");

            setTimeout(() => {

                document
                    .getElementById("about")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }, 300);
        }
    };


    const handleContactClick = () => {

        closeMenu();

        if (window.location.pathname === "/") {

            document
                .getElementById("contact")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

        } else {

            navigate("/");

            setTimeout(() => {

                document
                    .getElementById("contact")
                    ?.scrollIntoView({
                        behavior: "smooth"
                    });

            }, 300);
        }
    };


    const handleCategoryClick = (category) => {

        closeMenu();

        navigate(`/category/${category}`);
    };


    const handleLoginClick = () => {

        closeMenu();

        navigate("/login");
    };


    const handleProfileClick = () => {

        closeMenu();

        navigate("/profile");
    };


    const handleDashboardClick = () => {

        closeMenu();

        navigate("/dashboard");
    };


    return (

        <>

            {/* ================= HEADER ================= */}

            <header
                className={
                    `header ${
                        isScrolled
                            ? "header-scrolled"
                            : ""
                    }`
                }
            >

                {/* Menu button */}

                <button
                    type="button"
                    className="menu-button"
                    onClick={() => setMenuOpen(true)}
                >

                    <span className="menu-lines">
                        <span></span>
                        <span></span>
                        <span></span>
                    </span>

                    <span className="menu-text">
                        MENU
                    </span>

                </button>


                {/* Brand */}

                <div
                    className="brand"
                    onClick={handleHomeClick}
                >

                    <img
                        src="/logo.jpeg"
                        alt="S&J Luxury"
                    />

                    <span>
                        S & J LUXURY
                    </span>

                </div>


                {/* Right-side buttons */}

                <div className="header-icons">

                    <button
                        type="button"
                        onClick={handleSearchClick}
                        title="Search Products"
                        className="header-icon-button"
                    >
                        ⌕
                    </button>


                    {/* Icon and username open Dashboard */}

                    {isLoggedIn ? (

                        <button
                            type="button"
                            onClick={handleDashboardClick}
                            title="Open Dashboard"
                            className="header-user-button"
                        >

                            <span className="header-icon-button">
                                👤
                            </span>

                            <span className="header-user-name">
                                {userName}
                            </span>

                        </button>

                    ) : (

                        <button
                            type="button"
                            onClick={handleLoginClick}
                            title="Login"
                            className="header-icon-button"
                        >
                            👤
                        </button>

                    )}

                </div>

            </header>


            {/* ================= SIDE MENU ================= */}

            {menuOpen && (

                <div
                    className="menu-overlay"
                    onClick={closeMenu}
                >

                    <div
                        className="menu-panel"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="menu-header">

                            <span>
                                S & J LUXURY
                            </span>

                            <button
                                type="button"
                                className="menu-close"
                                onClick={closeMenu}
                            >
                                ×
                            </button>

                        </div>


                        <div className="menu-content">

                            <button
                                type="button"
                                className="menu-item"
                                onClick={handleHomeClick}
                            >
                                <span>HOME</span>
                                <span>›</span>
                            </button>


                            <button
                                type="button"
                                className="menu-item"
                                onClick={handleShopClick}
                            >
                                <span>SHOP</span>
                                <span>›</span>
                            </button>


                            <div className="menu-section-title">
                                SHOP BY CATEGORY
                            </div>


                            <button
                                type="button"
                                className="menu-item"
                                onClick={() =>
                                    handleCategoryClick("Watch")
                                }
                            >
                                <span>WATCH</span>
                                <span>›</span>
                            </button>


                            <button
                                type="button"
                                className="menu-item"
                                onClick={() =>
                                    handleCategoryClick("Purse")
                                }
                            >
                                <span>PURSE</span>
                                <span>›</span>
                            </button>


                            <button
                                type="button"
                                className="menu-item"
                                onClick={() =>
                                    handleCategoryClick("Sunglasses")
                                }
                            >
                                <span>SUNGLASSES</span>
                                <span>›</span>
                            </button>


                            <button
                                type="button"
                                className="menu-item"
                                onClick={() =>
                                    handleCategoryClick("Perfume")
                                }
                            >
                                <span>PERFUME</span>
                                <span>›</span>
                            </button>


                            <div className="menu-space"></div>


                            <button
                                type="button"
                                className="menu-item"
                                onClick={handleAboutClick}
                            >
                                <span>ABOUT S & J LUXURY</span>
                                <span>›</span>
                            </button>


                            <button
                                type="button"
                                className="menu-item"
                                onClick={handleContactClick}
                            >
                                <span>CONTACT</span>
                                <span>›</span>
                            </button>


                            <button
                                type="button"
                                className="menu-item"
                                onClick={handleSearchClick}
                            >
                                <span>SEARCH PRODUCTS</span>
                                <span>⌕</span>
                            </button>


                            {/* My Profile opens Profile page */}

                            {isLoggedIn ? (

                                <button
                                    type="button"
                                    className="menu-item"
                                    onClick={handleProfileClick}
                                >
                                    <span>MY PROFILE</span>
                                    <span>👤</span>
                                </button>

                            ) : (

                                <button
                                    type="button"
                                    className="menu-item"
                                    onClick={handleLoginClick}
                                >
                                    <span>LOGIN</span>
                                    <span>👤</span>
                                </button>

                            )}


                            {/* Dashboard opens Dashboard page */}

                            {isLoggedIn && (

                                <button
                                    type="button"
                                    className="menu-item"
                                    onClick={handleDashboardClick}
                                >
                                    <span>DASHBOARD</span>
                                    <span>›</span>
                                </button>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}

export default Header;