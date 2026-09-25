// Import React Hooks
import React, { useEffect, useState } from "react";

// Import Link for Navigation
import { Link } from "react-router-dom";

// Import Product Card CSS
import "./ProductCard.css";


// ================= PRODUCT CARD COMPONENT =================

function ProductCard({ product }) {

    // ================= PRICE =================

    // Product Price
    const price = Number(product.price);

    // Product Discount
    const discount = Number(
        product.discount || 0
    );

    // Final Product Price
    const finalPrice =
        price - (price * discount) / 100;


    // ================= STATES =================

    // Product Cart Quantity
    const [quantity, setQuantity] = useState(0);

    // Product Favorite Status
    const [isFavorite, setIsFavorite] = useState(false);

    // Message
    const [message, setMessage] = useState("");

    // Add To Cart Loading
    const [addingToCart, setAddingToCart] =
        useState(false);

    // Quantity Updating Loading
    const [updatingQuantity, setUpdatingQuantity] =
        useState(false);

    // Favorite Loading
    const [addingToFavorites, setAddingToFavorites] =
        useState(false);


    // ================= GET CART =================

    useEffect(() => {

        const fetchCartQuantity = async () => {

            // Get Login Token
            const token =
                localStorage.getItem("token");

            // User Is Not Logged In
            if (!token) {

                setQuantity(0);

                return;
            }


            try {

                // Get Cart
                const response = await fetch(
                    "http://localhost:5000/api/cart",
                    {
                        method: "GET",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );


                // Get Response Data
                const data =
                    await response.json();


                // Check Response
                if (response.ok) {

                    // Get Cart Items
                    const cartItems =
                        data.cart?.items || [];


                    // Find Current Product
                    const cartItem =
                        cartItems.find(
                            (item) =>
                                item.product?._id ===
                                product._id
                        );


                    // Set Quantity
                    if (cartItem) {

                        setQuantity(
                            cartItem.quantity
                        );

                    } else {

                        setQuantity(0);
                    }
                }

            } catch (error) {

                console.error(
                    "Fetch Cart Error:",
                    error
                );
            }
        };


        fetchCartQuantity();

    }, [product._id]);


    // ================= GET FAVORITES =================

    useEffect(() => {

        const fetchFavoriteStatus = async () => {

            // Get Login Token
            const token =
                localStorage.getItem("token");

            // User Is Not Logged In
            if (!token) {

                setIsFavorite(false);

                return;
            }


            try {

                // Get Favorites
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


                // Get Response Data
                const data =
                    await response.json();


                // Check Response
                if (response.ok) {

                    // Get Favorites
                    const favorites =
                        data.favorites || [];


                    // Check Current Product
                    const alreadyFavorite =
                        favorites.some(
                            (favorite) =>
                                favorite.product?._id ===
                                product._id
                        );


                    // Set Favorite Status
                    setIsFavorite(
                        alreadyFavorite
                    );
                }

            } catch (error) {

                console.error(
                    "Fetch Favorites Error:",
                    error
                );
            }
        };


        fetchFavoriteStatus();

    }, [product._id]);


    // ================= ADD TO CART =================

    const handleAddToCart = async () => {

        // Get Login Token
        const token =
            localStorage.getItem("token");


        // Check Login
        if (!token) {

            setMessage(
                "Please login to add product to cart"
            );

            return;
        }


        try {

            // Start Loading
            setAddingToCart(true);

            // Clear Message
            setMessage("");


            // Add Product To Cart
            const response = await fetch(
                "http://localhost:5000/api/cart/add",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        productId:
                            product._id,

                        quantity: 1,
                    }),
                }
            );


            // Get Response Data
            const data =
                await response.json();


            // Check Response
            if (response.ok) {

                // Set Quantity To 1
                setQuantity(1);


                // Success Message
                setMessage(
                    "Product added to cart successfully"
                );


                // Notify Header
                window.dispatchEvent(
                    new CustomEvent("cartAdded", {
                        detail: {
                            quantity: 1
                        }
                    })
                );

            } else {

                setMessage(
                    data.message ||
                    "Unable to add product to cart"
                );
            }

        } catch (error) {

            console.error(
                "Add To Cart Error:",
                error
            );

            setMessage(
                "Unable to connect with server"
            );

        } finally {

            // Stop Loading
            setAddingToCart(false);
        }
    };


    // ================= INCREASE QUANTITY =================

    const increaseQuantity = async () => {

        // Get Login Token
        const token =
            localStorage.getItem("token");


        if (!token) {
            return;
        }


        try {

            // Start Loading
            setUpdatingQuantity(true);


            // Clear Message
            setMessage("");


            // New Quantity
            const newQuantity =
                quantity + 1;


            // Update Cart
            const response = await fetch(
                "http://localhost:5000/api/cart/update",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        productId:
                            product._id,

                        quantity:
                            newQuantity,
                    }),
                }
            );


            // Get Response Data
            const data =
                await response.json();


            // Check Response
            if (response.ok) {

                // Update Quantity
                setQuantity(
                    newQuantity
                );


                // Notify Header
                window.dispatchEvent(
                    new CustomEvent("cartAdded", {
                        detail: {
                            quantity: 1
                        }
                    })
                );

            } else {

                setMessage(
                    data.message ||
                    "Unable to increase quantity"
                );
            }

        } catch (error) {

            console.error(
                "Increase Quantity Error:",
                error
            );

            setMessage(
                "Unable to update cart"
            );

        } finally {

            // Stop Loading
            setUpdatingQuantity(false);
        }
    };


    // ================= DECREASE QUANTITY =================

    const decreaseQuantity = async () => {

        // Get Login Token
        const token =
            localStorage.getItem("token");


        if (!token) {
            return;
        }


        // ================= REMOVE PRODUCT =================

        if (quantity === 1) {

            try {

                // Start Loading
                setUpdatingQuantity(true);

                // Clear Message
                setMessage("");


                // Remove Product
                const response = await fetch(
                    "http://localhost:5000/api/cart/remove",
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
                                product._id,
                        }),
                    }
                );


                // Get Response Data
                const data =
                    await response.json();


                // Check Response
                if (response.ok) {

                    // Return To Add To Cart
                    setQuantity(0);


                    // Message
                    setMessage(
                        "Product removed from cart"
                    );

                } else {

                    setMessage(
                        data.message ||
                        "Unable to remove product"
                    );
                }

            } catch (error) {

                console.error(
                    "Remove Cart Error:",
                    error
                );

                setMessage(
                    "Unable to remove product"
                );

            } finally {

                // Stop Loading
                setUpdatingQuantity(false);
            }

            return;
        }


        // ================= DECREASE QUANTITY =================

        try {

            // Start Loading
            setUpdatingQuantity(true);

            // Clear Message
            setMessage("");


            // New Quantity
            const newQuantity =
                quantity - 1;


            // Update Cart
            const response = await fetch(
                "http://localhost:5000/api/cart/update",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        productId:
                            product._id,

                        quantity:
                            newQuantity,
                    }),
                }
            );


            // Get Response Data
            const data =
                await response.json();


            // Check Response
            if (response.ok) {

                // Update Quantity
                setQuantity(
                    newQuantity
                );

            } else {

                setMessage(
                    data.message ||
                    "Unable to decrease quantity"
                );
            }

        } catch (error) {

            console.error(
                "Decrease Quantity Error:",
                error
            );

            setMessage(
                "Unable to update cart"
            );

        } finally {

            // Stop Loading
            setUpdatingQuantity(false);
        }
    };


    // ================= TOGGLE FAVORITES =================

    const handleAddToFavorites = async () => {

        // Get Login Token
        const token =
            localStorage.getItem("token");


        // Check Login
        if (!token) {

            setMessage(
                "Please login to add product to favorites"
            );

            return;
        }


        try {

            // Start Loading
            setAddingToFavorites(true);

            // Clear Previous Message
            setMessage("");


            // =================================================
            // REMOVE FROM FAVORITES
            // =================================================

            if (isFavorite) {

                // Remove Favorite
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
                                product._id,
                        }),
                    }
                );


                // Get Response Data
                const data =
                    await response.json();


                // Check Response
                if (response.ok) {

                    // Change Heart To Empty
                    setIsFavorite(false);


                    // Success Message
                    setMessage(
                        "Product removed from favorites"
                    );

                } else {

                    setMessage(
                        data.message ||
                        "Unable to remove product from favorites"
                    );
                }


                return;
            }


            // =================================================
            // ADD TO FAVORITES
            // =================================================

            const response = await fetch(
                "http://localhost:5000/api/favorites/add",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        productId:
                            product._id,
                    }),
                }
            );


            // Get Response Data
            const data =
                await response.json();


            // Check Response
            if (response.ok) {

                // Change Heart To Filled
                setIsFavorite(true);


                // Success Message
                setMessage(
                    "Product added to favorites successfully"
                );

            } else {

                setMessage(
                    data.message ||
                    "Unable to add product to favorites"
                );
            }

        } catch (error) {

            console.error(
                "Favorites Error:",
                error
            );

            setMessage(
                "Unable to connect with server"
            );

        } finally {

            // Stop Loading
            setAddingToFavorites(false);
        }
    };


    // ================= PRODUCT CARD UI =================

    return (

        <div className="product-card">


            {/* =================================================
                PRODUCT IMAGE
            ================================================= */}

            <div className="product-image">


                {/* Product Image */}

                <Link
                    to={`/product/${product._id}`}
                    className="product-image-link"
                >

                    <img
                        src={product.image}
                        alt={product.name}
                    />

                </Link>


                {/* =================================================
                    FAVORITE HEART
                ================================================= */}

                <button
                    type="button"
                    className={`card-favorite-button ${
                        isFavorite
                            ? "favorite-active"
                            : ""
                    }`}
                    onClick={
                        handleAddToFavorites
                    }
                    disabled={
                        addingToFavorites
                    }
                    title={
                        isFavorite
                            ? "Remove from Favorites"
                            : "Add to Favorites"
                    }
                >

                    {isFavorite
                        ? "♥"
                        : "♡"
                    }

                </button>

            </div>


            {/* =================================================
                PRODUCT INFORMATION
            ================================================= */}

            <div className="product-info">


                {/* CATEGORY */}

                <p>
                    {product.category}
                </p>


                {/* PRODUCT NAME */}

                <Link
                    to={`/product/${product._id}`}
                    className="product-name-link"
                >

                    <h3>
                        {product.name}
                    </h3>

                </Link>


                {/* PRICE */}

                <div className="price">

                    <span>
                        ₹{finalPrice.toLocaleString()}
                    </span>


                    {discount > 0 && (

                        <del>
                            ₹{price.toLocaleString()}
                        </del>

                    )}

                </div>


                {/* =================================================
                    CART
                ================================================= */}

                {quantity === 0 ? (

                    /* ADD TO CART */

                    <button
                        type="button"
                        className="card-cart-button"
                        onClick={
                            handleAddToCart
                        }
                        disabled={
                            addingToCart
                        }
                    >

                        {addingToCart
                            ? "ADDING..."
                            : "ADD TO CART"
                        }

                    </button>

                ) : (

                    /* QUANTITY CONTROL */

                    <div className="card-quantity-control">


                        {/* MINUS */}

                        <button
                            type="button"
                            onClick={
                                decreaseQuantity
                            }
                            disabled={
                                updatingQuantity
                            }
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>


                        {/* QUANTITY */}

                        <span>
                            {quantity}
                        </span>


                        {/* PLUS */}

                        <button
                            type="button"
                            onClick={
                                increaseQuantity
                            }
                            disabled={
                                updatingQuantity
                            }
                            aria-label="Increase quantity"
                        >
                            +
                        </button>

                    </div>

                )}


                {/* =================================================
                    MESSAGE
                ================================================= */}

                {message && (

                    <p className="product-card-message">
                        {message}
                    </p>

                )}


                {/* =================================================
                    VIEW PRODUCT
                ================================================= */}

                <Link
                    to={`/product/${product._id}`}
                    className="view-product-button"
                >
                    VIEW PRODUCT
                </Link>

            </div>

        </div>
    );
}


// Export Product Card
export default ProductCard;