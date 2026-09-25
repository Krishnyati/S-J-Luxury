// Import React hooks
import { useEffect, useState } from "react";

// Import Link for navigation
import { Link, useNavigate } from "react-router-dom";

// Import Cart CSS
import "./Cart.css";

// Import Header
import Header from "../components/Header";

// Cart component
function Cart() {

    // Checkout Navigation
    const navigate = useNavigate();

    // Cart state
    const [cart, setCart] = useState(null);

    // Message state
    const [message, setMessage] = useState("");

    // Loading state
    const [loading, setLoading] = useState(true);

    // Store product waiting for remove confirmation
    const [confirmRemoveProduct, setConfirmRemoveProduct] = useState(null);


    // ================= FETCH CART =================

    const fetchCart = async () => {

        const token = localStorage.getItem("token");

        // Check login
        if (!token) {
            setMessage("Please login to view your cart");
            setLoading(false);
            return;
        }

        try {

            const response = await fetch(
                "http://localhost:5000/api/cart",
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            // Check response
            if (response.ok) {

                setCart(data.cart);

            } else {

                setMessage(
                    data.message || "Unable to fetch cart"
                );
            }

        } catch (error) {

            console.error("Cart Error:", error);

            setMessage(
                "Unable to connect to server"
            );

        } finally {

            setLoading(false);
        }
    };


    // ================= LOAD CART =================

    useEffect(() => {

        fetchCart();

    }, []);


    // ================= CALCULATE FINAL PRICE =================

    const calculateFinalPrice = (product) => {

        const price = Number(product.price);

        const discount = Number(
            product.discount || 0
        );

        return price - (price * discount) / 100;
    };


    // ================= CALCULATE ITEM SUBTOTAL =================

    const calculateSubtotal = (item) => {

        return (
            calculateFinalPrice(item.product) *
            item.quantity
        );
    };


    // ================= CALCULATE CART TOTAL =================

    const calculateTotal = () => {

        if (!cart || !cart.items) {
            return 0;
        }

        return cart.items.reduce(
            (total, item) => {

                return (
                    total +
                    calculateSubtotal(item)
                );

            },
            0
        );
    };


    // ================= DECREASE QUANTITY =================

    const handleDecreaseQuantity = (item) => {

        // Decrease quantity if it is greater than 1
        if (item.quantity > 1) {

            updateQuantity(
                item.product._id,
                item.quantity - 1
            );

            return;
        }

        // Ask confirmation when quantity is 1
        setConfirmRemoveProduct(item.product);
    };


    // ================= UPDATE QUANTITY =================

    const updateQuantity = async (
        productId,
        quantity
    ) => {

        // Prevent quantity below 1
        if (quantity < 1) {
            return;
        }

        const token =
            localStorage.getItem("token");

        try {

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
                        productId,
                        quantity,
                    }),
                }
            );

            const data =
                await response.json();

            // Check response
            if (response.ok) {

                setCart(data.cart);

            } else {

                setMessage(
                    data.message ||
                    "Unable to update quantity"
                );
            }

        } catch (error) {

            console.error(
                "Update Cart Error:",
                error
            );

            setMessage(
                "Unable to update cart"
            );
        }
    };


    // ================= REMOVE PRODUCT =================

    const removeItem = async (productId) => {

        const token =
            localStorage.getItem("token");

        try {

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
                        productId,
                    }),
                }
            );

            const data =
                await response.json();

            // Check response
            if (response.ok) {

                setCart(data.cart);

                setMessage(
                    "Product removed from cart"
                );

                return true;

            } else {

                setMessage(
                    data.message ||
                    "Unable to remove product"
                );

                return false;
            }

        } catch (error) {

            console.error(
                "Remove Cart Error:",
                error
            );

            setMessage(
                "Unable to remove product"
            );

            return false;
        }
    };


    // ================= CONFIRM REMOVE =================

    const handleConfirmRemove = async () => {

        // Check selected product
        if (!confirmRemoveProduct) {
            return;
        }

        const removed =
            await removeItem(
                confirmRemoveProduct._id
            );

        // Close popup after successful removal
        if (removed) {

            setConfirmRemoveProduct(null);
        }
    };


    // ================= CANCEL REMOVE =================

    const handleCancelRemove = () => {

        setConfirmRemoveProduct(null);
    };


    // ================= CLEAR CART =================

    const clearCart = async () => {

        const token =
            localStorage.getItem("token");

        try {

            const response = await fetch(
                "http://localhost:5000/api/cart/clear",
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

                setCart({
                    items: [],
                });

                setMessage(
                    "Cart cleared successfully"
                );

            } else {

                setMessage(
                    data.message ||
                    "Unable to clear cart"
                );
            }

        } catch (error) {

            console.error(
                "Clear Cart Error:",
                error
            );

            setMessage(
                "Unable to clear cart"
            );
        }
    };


    // ================= LOADING =================

    if (loading) {

        return (
            <>
                {/* ================= HEADER ================= */}

                <Header />

                {/* ================= LOADING ================= */}

                <div className="cart-page">

                    <h2>
                        Loading Cart...
                    </h2>

                </div>
            </>
        );
    }


    // ================= LOGIN REQUIRED =================

    if (message && !cart) {

        return (
            <>
                {/* ================= HEADER ================= */}

                <Header />

                {/* ================= LOGIN REQUIRED ================= */}

                <div className="cart-page">

                    <h2>
                        {message}
                    </h2>

                    <Link to="/login">
                        Login
                    </Link>

                </div>
            </>
        );
    }


    // ================= EMPTY CART =================

    if (
        !cart ||
        !cart.items ||
        cart.items.length === 0
    ) {

        return (
            <>
                {/* ================= HEADER ================= */}

                <Header />

                {/* ================= EMPTY CART ================= */}

                <div className="cart-page empty-cart">

                    <h1>
                        Your Cart
                    </h1>

                    <p>
                        Your cart is currently empty.
                    </p>

                    <Link to="/">
                        Continue Shopping
                    </Link>

                </div>
            </>
        );
    }


    // ================= CART PAGE =================

    return (
        <>
            {/* ================= HEADER ================= */}

            <Header />

            {/* ================= CART PAGE ================= */}

            <div className="cart-page">

                {/* ================= CART HEADER ================= */}

                <div className="cart-header">

                    <p>
                        S&J LUXURY
                    </p>

                    <h1>
                        Your Shopping Cart
                    </h1>

                </div>


                {/* ================= CART MESSAGE ================= */}

                {message && (

                    <p className="cart-message">
                        {message}
                    </p>

                )}


                {/* ================= CART CONTAINER ================= */}

                <div className="cart-container">


                    {/* ================= CART ITEMS ================= */}

                    <div className="cart-items">

                        {cart.items.map((item) => {

                            const product =
                                item.product;

                            const finalPrice =
                                calculateFinalPrice(
                                    product
                                );

                            const subtotal =
                                calculateSubtotal(
                                    item
                                );

                            return (

                                <div
                                    className="cart-item"
                                    key={item._id}
                                >


                                    {/* PRODUCT IMAGE */}

                                    <div className="cart-product-image">

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                        />

                                    </div>


                                    {/* PRODUCT INFORMATION */}

                                    <div className="cart-product-info">

                                        <p>
                                            {product.category}
                                        </p>

                                        <h2>
                                            {product.name}
                                        </h2>

                                        <span>
                                            ₹
                                            {finalPrice.toLocaleString()}
                                        </span>

                                    </div>


                                    {/* QUANTITY CONTROL */}

                                    <div className="quantity-control">

                                        {/* MINUS BUTTON */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDecreaseQuantity(
                                                    item
                                                )
                                            }
                                        >
                                            −
                                        </button>


                                        {/* QUANTITY */}

                                        <span>
                                            {item.quantity}
                                        </span>


                                        {/* PLUS BUTTON */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateQuantity(
                                                    product._id,
                                                    item.quantity + 1
                                                )
                                            }
                                        >
                                            +
                                        </button>

                                    </div>


                                    {/* SUBTOTAL */}

                                    <div className="cart-subtotal">

                                        <p>
                                            Subtotal
                                        </p>

                                        <strong>
                                            ₹
                                            {subtotal.toLocaleString()}
                                        </strong>

                                    </div>


                                    {/* REMOVE BUTTON */}

                                    <button
                                        type="button"
                                        className="remove-button"
                                        onClick={() =>
                                            removeItem(
                                                product._id
                                            )
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>
                            );
                        })}


                        {/* ================= CLEAR CART ================= */}

                        <button
                            type="button"
                            className="clear-cart-button"
                            onClick={clearCart}
                        >
                            Clear Cart
                        </button>

                    </div>


                    {/* ================= CART SUMMARY ================= */}

                    <div className="cart-summary">

                        <p>
                            ORDER SUMMARY
                        </p>

                        <h2>
                            Cart Total
                        </h2>


                        {/* ITEMS COUNT */}

                        <div className="summary-row">

                            <span>
                                Items
                            </span>

                            <span>
                                {cart.items.reduce(
                                    (total, item) =>
                                        total +
                                        item.quantity,
                                    0
                                )}
                            </span>

                        </div>


                        {/* TOTAL */}

                        <div className="summary-row total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹
                                {calculateTotal().toLocaleString()}
                            </strong>

                        </div>


                        {/* CHECKOUT */}

                        <button
                            type="button"
                            className="checkout-button"
                            onClick={() =>
                                navigate("/checkout")
                            }
                        >
                            Proceed to Checkout
                        </button>


                        {/* CONTINUE SHOPPING */}

                        <Link
                            to="/"
                            className="continue-shopping"
                        >
                            Continue Shopping
                        </Link>

                    </div>

                </div>


                {/* ================= REMOVE CONFIRMATION POPUP ================= */}

                {confirmRemoveProduct && (

                    <div className="remove-confirm-overlay">

                        {/* CONFIRMATION BOX */}

                        <div className="remove-confirm-box">

                            {/* POPUP TITLE */}

                            <p className="remove-confirm-label">
                                S&J LUXURY
                            </p>

                            <h2>
                                Remove Product?
                            </h2>


                            {/* POPUP MESSAGE */}

                            <p className="remove-confirm-message">

                                Are you sure you want to remove{" "}

                                <strong>
                                    {confirmRemoveProduct.name}
                                </strong>

                                {" "}from your cart?

                            </p>


                            {/* POPUP BUTTONS */}

                            <div className="remove-confirm-actions">

                                {/* CANCEL BUTTON */}

                                <button
                                    type="button"
                                    className="cancel-remove-button"
                                    onClick={
                                        handleCancelRemove
                                    }
                                >
                                    CANCEL
                                </button>


                                {/* REMOVE BUTTON */}

                                <button
                                    type="button"
                                    className="confirm-remove-button"
                                    onClick={
                                        handleConfirmRemove
                                    }
                                >
                                    REMOVE
                                </button>

                            </div>

                        </div>

                    </div>
                )}

            </div>
        </>
    );
}


// Export Cart component
export default Cart;