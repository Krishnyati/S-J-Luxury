// Import React hooks
import { useEffect, useState } from "react";

// Import Link for navigation
import { Link } from "react-router-dom";

// Import Favorites CSS
import "./Favorites.css";

// Import Header
import Header from "../components/Header";


// Favorites component
function Favorites() {

    // Favorites state
    const [favorites, setFavorites] = useState([]);

    // Message state
    const [message, setMessage] = useState("");

    // Loading state
    const [loading, setLoading] = useState(true);


    // =====================================================
    // GET FAVORITES
    // =====================================================

    useEffect(() => {

        const fetchFavorites = async () => {

            const token =
                localStorage.getItem("token");


            // Check login
            if (!token) {

                setMessage(
                    "Please Login First to view your Favorites."
                );

                setLoading(false);

                return;
            }


            try {

                const response = await fetch(
                    "http://localhost:5000/api/favorites",
                    {
                        method: "GET",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );


                const data =
                    await response.json();


                // Check response
                if (response.ok) {

                    setFavorites(
                        data.favorites || []
                    );

                } else {

                    setMessage(
                        data.message ||
                        "Unable to fetch Favorites"
                    );
                }


            } catch (error) {

                console.error(
                    "Favorites Error:",
                    error
                );

                setMessage(
                    "Unable to connect with server."
                );


            } finally {

                setLoading(false);
            }
        };


        fetchFavorites();

    }, []);


    // =====================================================
    // REMOVE FAVORITE
    // =====================================================

    const handleRemoveFavorite = async (
        productId
    ) => {

        const token =
            localStorage.getItem("token");


        // Check login
        if (!token) {

            setMessage(
                "Please Login First."
            );

            return;
        }


        try {

            const response = await fetch(
                "http://localhost:5000/api/favorites/remove",
                {
                    method: "DELETE",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        productId:
                            productId,
                    }),
                }
            );


            const data =
                await response.json();


            // Check response
            if (response.ok) {

                setFavorites(
                    (previousFavorites) =>
                        previousFavorites.filter(
                            (favorite) =>
                                favorite.product &&
                                favorite.product._id !==
                                productId
                        )
                );


                setMessage(
                    "Product removed from Favorites."
                );


            } else {

                setMessage(
                    data.message ||
                    "Unable to remove Favorite"
                );
            }


        } catch (error) {

            console.error(
                "Remove Favorite Error:",
                error
            );

            setMessage(
                "Unable to connect with server."
            );
        }
    };


    // =====================================================
    // CLEAR ALL FAVORITES
    // =====================================================

    const handleClearFavorites = async () => {

        const token =
            localStorage.getItem("token");


        // Check login
        if (!token) {

            setMessage(
                "Please Login First."
            );

            return;
        }


        try {

            const response = await fetch(
                "http://localhost:5000/api/favorites/clear",
                {
                    method: "DELETE",

                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


            const data =
                await response.json();


            // Check response
            if (response.ok) {

                setFavorites([]);

                setMessage(
                    "All Favorites Cleared Successfully."
                );


            } else {

                setMessage(
                    data.message ||
                    "Unable to clear Favorites"
                );
            }


        } catch (error) {

            console.error(
                "Clear Favorites Error:",
                error
            );

            setMessage(
                "Unable to connect with server."
            );
        }
    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <>
                {/* ================= HEADER ================= */}

                <Header />


                {/* ================= LOADING ================= */}

                <div className="favorites-page loading-page">

                    <h2>
                        Loading Favorites...
                    </h2>

                </div>
            </>
        );
    }


    // =====================================================
    // NOT LOGGED IN
    // =====================================================

    if (!localStorage.getItem("token")) {

        return (
            <>
                {/* ================= HEADER ================= */}

                <Header />


                {/* ================= LOGIN REQUIRED ================= */}

                <div className="favorites-page empty-favorites">

                    <h2>
                        Please Login First
                    </h2>

                    <p>
                        Login to view your favorite products.
                    </p>

                    <Link
                        to="/login"
                        className="shop-favorites-button"
                    >
                        LOGIN
                    </Link>

                </div>
            </>
        );
    }


    // =====================================================
    // FAVORITES PAGE
    // =====================================================

    return (
        <>
            {/* ================= HEADER ================= */}

            <Header />


            {/* ================= FAVORITES PAGE ================= */}

            <div className="favorites-page">


                {/* =================================================
                    FAVORITES HEADER
                ================================================= */}

                <div className="favorites-header">

                    <div>

                        <p className="favorites-label">
                            S&J LUXURY
                        </p>


                        <h1>
                            My Favorites
                        </h1>


                        <p>
                            Your carefully selected luxury pieces.
                        </p>

                    </div>


                    {/* =================================================
                        HEADER BUTTONS
                    ================================================= */}

                    <div className="favorites-header-actions">

                        <Link
                            to="/"
                            className="continue-shopping-button"
                        >
                            CONTINUE SHOPPING
                        </Link>


                        {favorites.length > 0 && (

                            <button
                                type="button"
                                className="clear-favorites-button"
                                onClick={
                                    handleClearFavorites
                                }
                            >
                                CLEAR FAVORITES
                            </button>

                        )}

                    </div>

                </div>


                {/* =================================================
                    MESSAGE
                ================================================= */}

                {message && (

                    <p className="favorites-message">
                        {message}
                    </p>

                )}


                {/* =================================================
                    EMPTY FAVORITES
                ================================================= */}

                {favorites.length === 0 ? (

                    <div className="empty-favorites">

                        <div className="empty-heart">
                            ♡
                        </div>


                        <h2>
                            Your Favorites List is Empty
                        </h2>


                        <p>
                            Save your favorite luxury products
                            and find them here anytime.
                        </p>


                        <div className="favorites-shop-actions">

                            <Link
                                to="/"
                                className="shop-favorites-button"
                            >
                                CONTINUE SHOPPING
                            </Link>

                        </div>

                    </div>

                ) : (


                    /* =================================================
                       FAVORITES GRID
                    ================================================= */

                    <div className="favorites-grid">

                        {favorites.map((favorite) => {

                            const product =
                                favorite.product;


                            // Safety check
                            if (!product) {
                                return null;
                            }


                            const price =
                                Number(
                                    product.price || 0
                                );


                            return (

                                <div
                                    className="favorite-card"
                                    key={favorite._id}
                                >


                                    {/* =================================================
                                        PRODUCT IMAGE
                                    ================================================= */}

                                    <div className="favorite-image">

                                        <Link
                                            to={`/product/${product._id}`}
                                        >

                                            <img
                                                src={
                                                    product.image
                                                }
                                                alt={
                                                    product.name
                                                }
                                            />

                                        </Link>

                                    </div>


                                    {/* =================================================
                                        PRODUCT INFORMATION
                                    ================================================= */}

                                    <div className="favorite-info">


                                        {/* CATEGORY */}

                                        <p className="favorite-category">
                                            {product.category}
                                        </p>


                                        {/* PRODUCT NAME */}

                                        <Link
                                            to={`/product/${product._id}`}
                                            className="favorite-name"
                                        >

                                            <h3>
                                                {product.name}
                                            </h3>

                                        </Link>


                                        {/* PRICE */}

                                        <div className="favorite-price">

                                            <span>
                                                ₹
                                                {price.toLocaleString()}
                                            </span>

                                        </div>


                                        {/* =================================================
                                            ACTION BUTTONS
                                        ================================================= */}

                                        <div className="favorite-actions">


                                            {/* VIEW PRODUCT */}

                                            <Link
                                                to={`/product/${product._id}`}
                                                className="view-product-button"
                                            >
                                                VIEW PRODUCT
                                            </Link>


                                            {/* REMOVE FAVORITE */}

                                            <button
                                                type="button"
                                                className="remove-favorite-button"
                                                onClick={() =>
                                                    handleRemoveFavorite(
                                                        product._id
                                                    )
                                                }
                                            >
                                                ♡ REMOVE
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            );
                        })}

                    </div>
                )}

            </div>
        </>
    );
}


// Export Favorites component
export default Favorites;