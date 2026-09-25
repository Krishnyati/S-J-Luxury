// Import Navigation
import { useNavigate } from "react-router-dom";

// Import React Hooks
import { useEffect, useState } from "react";

// Import Header CSS
import "./Header.css";

// ================= HEADER ICONS =================

const SearchIcon = () => (
    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle
            cx="11"
            cy="11"
            r="6"
        />
        <line
            x1="16"
            y1="16"
            x2="21"
            y2="21"
        />
    </svg>
);


const CartIcon = () => (
    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="19" cy="20" r="1.5" />

        <path d="M3 4h2l2.5 11h11l2-8H6" />
    </svg>
);


const HeartIcon = () => (
    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <path
            d="M20.8 8.8c0 5.5-8.8 11-8.8 11S3.2 14.3 3.2 8.8C3.2 6 5.2 4 7.8 4c1.6 0 3 .8 4.2 2.1C13.2 4.8 14.6 4 16.2 4c2.6 0 4.6 2 4.6 4.8z"
        />
    </svg>
);


const UserIcon = () => (
    <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
    >
        <circle
            cx="12"
            cy="8"
            r="4"
        />

        <path
            d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"
        />
    </svg>
);


// ================= HEADER COMPONENT =================

function Header() {

    // Navigation
    const navigate = useNavigate();


    // ================= STATES =================

    // Side Menu
    const [menuOpen, setMenuOpen] = useState(false);

    // Header Scroll
    const [isScrolled, setIsScrolled] = useState(false);

    // Cart Notification
    const [cartNotification, setCartNotification] =
        useState(null);


    // ================= LOGIN CHECK =================

    const isLoggedIn = Boolean(
        localStorage.getItem("token")
    );


    // ================= USER DETAILS =================

    let user = null;

    try {

        const storedUser =
            localStorage.getItem("user");

        user = storedUser
            ? JSON.parse(storedUser)
            : null;

    } catch (error) {

        console.log(
            "Unable to read user details."
        );
    }


    // User Name
    const userName =
        user?.displayName ||
        user?.fullName ||
        user?.name ||
        user?.username ||
        "My Account";


    // ================= HEADER SCROLL =================

    useEffect(() => {

        const handleScroll = () => {

            setIsScrolled(
                window.scrollY > 40
            );
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


    // ================= CART NOTIFICATION =================

    useEffect(() => {

        // Handle Cart Added Event
        const handleCartAdded = (event) => {

            // Get Quantity
            const quantity =
                event.detail?.quantity || 1;


            // Show Quantity
            setCartNotification(
                quantity
            );


            // Hide After 2 Seconds
            setTimeout(() => {

                setCartNotification(null);

            }, 2000);
        };


        // Listen For Cart Event
        window.addEventListener(
            "cartAdded",
            handleCartAdded
        );


        // Remove Listener
        return () => {

            window.removeEventListener(
                "cartAdded",
                handleCartAdded
            );
        };

    }, []);


    // ================= CLOSE MENU =================

    const closeMenu = () => {

        setMenuOpen(false);
    };


    // ================= HOME =================

    const handleHomeClick = () => {

        closeMenu();

        navigate("/");
    };


    // ================= SHOP =================

    const handleShopClick = () => {

        closeMenu();


        if (
            window.location.pathname === "/"
        ) {

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


    // ================= SEARCH =================

    const handleSearchClick = () => {

        closeMenu();


        if (
            window.location.pathname === "/"
        ) {

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


    // ================= ABOUT =================

    const handleAboutClick = () => {

        closeMenu();


        if (
            window.location.pathname === "/"
        ) {

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


    // ================= CONTACT =================

    const handleContactClick = () => {

        closeMenu();


        if (
            window.location.pathname === "/"
        ) {

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


    // ================= CATEGORY =================

    const handleCategoryClick = (
        category
    ) => {

        closeMenu();

        navigate(
            `/category/${category}`
        );
    };


    // ================= CART =================

    const handleCartClick = () => {

        closeMenu();

        navigate("/cart");
    };


    // ================= FAVORITES =================

    const handleFavoritesClick = () => {

        closeMenu();

        navigate("/favorites");
    };


    // ================= LOGIN =================

    const handleLoginClick = () => {

        closeMenu();

        navigate("/login");
    };


    // ================= PROFILE =================

    const handleProfileClick = () => {

        closeMenu();

        navigate("/profile");
    };


    // ================= DASHBOARD =================

    const handleDashboardClick = () => {

        closeMenu();

        navigate("/dashboard");
    };


    // ================= HEADER UI =================

    return (

        <>

            {/* =================================================
                HEADER
            ================================================= */}

            <header
                className={
                    `header ${
                        isScrolled
                            ? "header-scrolled"
                            : ""
                    }`
                }
            >

                {/* ================= MENU BUTTON ================= */}

                <button
                    type="button"
                    className="menu-button"
                    onClick={() =>
                        setMenuOpen(true)
                    }
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


                {/* ================= BRAND ================= */}

                <div
                    className="brand"
                    onClick={
                        handleHomeClick
                    }
                >

                    <img
                        src="/logo.jpeg"
                        alt="S&J Luxury"
                    />


                    <span>
                        S & J LUXURY
                    </span>

                </div>


                {/* ================= RIGHT SIDE ================= */}

                <div className="header-icons">


                    {/* ================= SEARCH ================= */}

                    <button
                        type="button"
                        onClick={
                            handleSearchClick
                        }
                        title="Search Products"
                        className="header-icon-button"
                    >
                        <SearchIcon />
                    </button>


                    {/* ================= CART ================= */}

                    <div className="header-cart-wrapper">

                        {/* Cart Notification */}

                        {cartNotification !== null && (

                            <span className="cart-notification">

                                {cartNotification}

                            </span>

                        )}


                        {/* Cart Button */}

                        <button
                            type="button"
                            onClick={
                                handleCartClick
                            }
                            title="Cart"
                            className="header-icon-button"
                        >
                            <CartIcon />
                        </button>

                    </div>


                    {/* ================= FAVORITES ================= */}

                    <button
                        type="button"
                        onClick={
                            handleFavoritesClick
                        }
                        title="Favorites"
                        className="header-icon-button"
                    >
                        <HeartIcon />
                    </button>


                    {/* ================= USER ================= */}

                    {isLoggedIn ? (

                        <button
                            type="button"
                            onClick={
                                handleDashboardClick
                            }
                            title="Open Dashboard"
                            className="header-user-button"
                        >

                            <span className="header-icon-button">
                                <UserIcon />
                            </span>


                            <span className="header-user-name">
                                {userName}
                            </span>

                        </button>

                    ) : (

                        <button
                            type="button"
                            onClick={
                                handleLoginClick
                            }
                            title="Login"
                            className="header-icon-button"
                        >
                            <UserIcon />
                        </button>

                    )}

                </div>

            </header>


            {/* =================================================
                SIDE MENU
            ================================================= */}

            {menuOpen && (

                <div
                    className="menu-overlay"
                    onClick={closeMenu}
                >

                    <div
                        className="menu-panel"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >


                        {/* ================= MENU HEADER ================= */}

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


                        {/* ================= MENU CONTENT ================= */}

                        <div className="menu-content">


                            {/* ================= HOME ================= */}

                            <button
                                type="button"
                                className="menu-item"
                                onClick={
                                    handleHomeClick
                                }
                            >

                                <span>
                                    HOME
                                </span>

                                <span>
                                    ›
                                </span>

                            </button>


                            {/* ================= SHOP ================= */}

                            <button
                                type="button"
                                className="menu-item"
                                onClick={
                                    handleShopClick
                                }
                            >

                                <span>
                                    SHOP
                                </span>

                                <span>
                                    ›
                                </span>

                            </button>


                            {/* ================= CATEGORY TITLE ================= */}

                            <div className="menu-section-title">

                                SHOP BY CATEGORY

                            </div>


                            {/* ================= WATCH ================= */}

                            <button
                                type="button"
                                className="menu-item"
                                onClick={() =>
                                    handleCategoryClick(
                                        "Watch"
                                    )
                                }
                            >

                                <span>
                                    WATCH
                                </span>

                                <span>
                                    ›
                                </span>

                            </button>


                            {/* ================= PURSE ================= */}

                            <button
                                type="button"
                                className="menu-item"
                                onClick={() =>
                                    handleCategoryClick(
                                        "Purse"
                                    )
                                }
                            >

                                <span>
                                    PURSE
                                </span>

                                <span>
                                    ›
                                </span>

                            </button>


                            {/* ================= SUNGLASSES ================= */}

                            <button
                                type="button"
                                className="menu-item"
                                onClick={() =>
                                    handleCategoryClick(
                                        "Sunglasses"
                                    )
                                }
                            >

                                <span>
                                    SUNGLASSES
                                </span>

                                <span>
                                    ›
                                </span>

                            </button>


                            {/* ================= PERFUME ================= */}

                            <button
                                type="button"
                                className="menu-item"
                                onClick={() =>
                                    handleCategoryClick(
                                        "Perfume"
                                    )
                                }
                            >

                                <span>
                                    PERFUME
                                </span>

                                <span>
                                    ›
                                </span>

                            </button>


                            {/* =================================================
                                CART
                            ================================================= */}

                            <button
                                type="button"
                                className="menu-item"
                                onClick={
                                    handleCartClick
                                }
                            >

                                <span>
                                    CART
                                </span>

                                <span>
                                    ›
                                </span>

                            </button>


                            {/* =================================================
                                FAVORITES
                            ================================================= */}

                            <button
                                type="button"
                                className="menu-item"
                                onClick={
                                    handleFavoritesClick
                                }
                            >

                                <span>
                                    FAVORITES
                                </span>

                                <span>
                                    ›
                                </span>

                            </button>


                            {/* ================= SPACE ================= */}

                            <div className="menu-space"></div>


                            {/* ================= ABOUT ================= */}

                            <button
                                type="button"
                                className="menu-item"
                                onClick={
                                    handleAboutClick
                                }
                            >

                                <span>
                                    ABOUT S & J LUXURY
                                </span>

                                <span>
                                    ›
                                </span>

                            </button>


                            {/* ================= CONTACT ================= */}

                            <button
                                type="button"
                                className="menu-item"
                                onClick={
                                    handleContactClick
                                }
                            >

                                <span>
                                    CONTACT
                                </span>

                                <span>
                                    ›
                                </span>

                            </button>


                            {/* ================= SEARCH ================= */}

                            <button
                                type="button"
                                className="menu-item"
                                onClick={
                                    handleSearchClick
                                }
                            >

                                <span>
                                    SEARCH PRODUCTS
                                </span>

                                <span>
                                    <SearchIcon />
                                </span>

                            </button>


                            {/* ================= PROFILE / LOGIN ================= */}

                            {isLoggedIn ? (

                                <button
                                    type="button"
                                    className="menu-item"
                                    onClick={
                                        handleProfileClick
                                    }
                                >

                                    <span>
                                        MY PROFILE
                                    </span>

                                    <span>
                                         <UserIcon />
                                    </span>

                                </button>

                            ) : (

                                <button
                                    type="button"
                                    className="menu-item"
                                    onClick={
                                        handleLoginClick
                                    }
                                >

                                    <span>
                                        LOGIN
                                    </span>

                                    <span>
                                         <UserIcon />
                                    </span>

                                </button>

                            )}


                            {/* ================= DASHBOARD ================= */}

                            {isLoggedIn && (

                                <button
                                    type="button"
                                    className="menu-item"
                                    onClick={
                                        handleDashboardClick
                                    }
                                >

                                    <span>
                                        DASHBOARD
                                    </span>

                                    <span>
                                        ›
                                    </span>

                                </button>

                            )}

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}


// Export Header
export default Header;