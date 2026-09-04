// Import React Hooks
import { useEffect, useState } from "react";

// Import Link for navigation
import { Link } from "react-router-dom";

// Import Checkout CSS
import "./Checkout.css";

// CHECKOUT COMPONENT
function Checkout() {

    // Store cart information
    const [cart, setCart] = useState(null);

    // Store loading status
    const [loading, setLoading] = useState(true);

    // Store customer information
    const [customerInfo, setCustomerInfo] = useState({
        customerName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        shippingAddress: "",
    });

    // Store checkout messages
    const [message, setMessage] = useState("");


    // FETCH CART
    useEffect(() => {

        const fetchCart = async () => {

            // Get login token
            const token = localStorage.getItem("token");

            // Check login
            if (!token) {
                setLoading(false);
                return;
            }

            try {

                // Get cart from backend
                const response = await fetch(
                    "http://localhost:5000/api/cart",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Convert response to JSON
                const data = await response.json();

                // Store cart
                if (response.ok) {
                    setCart(data.cart);
                } else {
                    setMessage(
                        data.message || "Unable to fetch cart."
                    );
                }

            } catch (error) {

                // Display error in console
                console.error(
                    "Checkout Cart Error:",
                    error
                );

                setMessage(
                    "Unable to connect with server."
                );

            } finally {

                // Stop loading
                setLoading(false);
            }
        };

        fetchCart();

    }, []);


    // HANDLE CUSTOMER INPUT
    const handleInputChange = (event) => {

        const { name, value } = event.target;

        setCustomerInfo((previousInfo) => ({
            ...previousInfo,
            [name]: value
        }));
    };


    // PLACE ORDER
    const handlePlaceOrder = async () => {

        // Get login token
        const token = localStorage.getItem("token");

        // Check login
        if (!token) {

            setMessage(
                "Please Login Before Placing an Order."
            );

            return;
        }

        // Check customer information
        if (
            !customerInfo.customerName ||
            !customerInfo.email ||
            !customerInfo.phone ||
            !customerInfo.country ||
            !customerInfo.city ||
            !customerInfo.shippingAddress
        ) {

            setMessage(
                "Please Fill All Customer and Shipping Details."
            );

            return;
        }

        try {

            // Send order request to backend
            const response = await fetch(
                "http://localhost:5000/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify(customerInfo),
                }
            );

            // Convert response into JSON
            const data = await response.json();

            // Check successful order
            if (response.ok) {

                setMessage(
                    "Congratulations! Your Order Placed Successfully."
                );

                // Clear local cart state
                setCart({
                    items: []
                });

            } else {

                setMessage(
                    data.message ||
                    "Unable to Place Order. Please Try Again Later."
                );
            }

        } catch (error) {

            // Display error in console
            console.error(
                "Place Order Error:",
                error
            );

            setMessage(
                "Unable to connect with server. Please Try Again Later."
            );
        }
    };

    // LOADING SCREEN
    if (loading) {

        return (
            <div className="checkout-page">

                <h2>
                    Loading Checkout...
                </h2>

            </div>
        );
    }


    // CHECK CART
    if (
        !cart ||
        !cart.items ||
        cart.items.length === 0
    ) {

        return (
            <div className="checkout-page empty-checkout">

                <h1>
                    Your Cart is Empty
                </h1>

                <p>
                    Please add products to your cart before checkout.
                </p>

                <Link to="/">
                    Continue Shopping
                </Link>

            </div>
        );
    }

    // CHECKOUT UI
    return (

        <div className="checkout-page">

            <div className="checkout-header">

                <p>
                    S&J LUXURY
                </p>

                <h1>
                    Checkout
                </h1>

                <span>
                    Complete your order details below.
                </span>

            </div>


            {message && (
                <p className="checkout-message">
                    {message}
                </p>
            )}


            <div className="checkout-container">

                {/* CUSTOMER INFORMATION */}
                <div className="checkout-form">

                    <h2>
                        Customer Information
                    </h2>


                    <input
                        type="text"
                        name="customerName"
                        placeholder="Full Name"
                        value={customerInfo.customerName}
                        onChange={handleInputChange}
                    />


                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                    />


                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                    />


                    <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={customerInfo.country}
                        onChange={handleInputChange}
                    />


                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={customerInfo.city}
                        onChange={handleInputChange}
                    />


                    <textarea
                        name="shippingAddress"
                        placeholder="Shipping Address"
                        rows="4"
                        value={customerInfo.shippingAddress}
                        onChange={handleInputChange}
                    ></textarea>

                </div>


                {/* ORDER SUMMARY */}
                <div className="checkout-summary">

                    <p>
                        ORDER SUMMARY
                    </p>

                    <h2>
                        Your Order
                    </h2>


                    {cart.items.map((item) => (

                        <div
                            className="checkout-item"
                            key={item._id}
                        >

                            <span>
                                {item.product.name}
                                {" "}× {item.quantity}
                            </span>

                            <strong>
                                ₹
                                {(
                                    Number(item.product.price) *
                                    item.quantity
                                ).toLocaleString()}
                            </strong>

                        </div>

                    ))}


                    <div className="checkout-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹
                            {cart.items.reduce(
                                (total, item) =>
                                    total +
                                    Number(item.product.price) *
                                    item.quantity,
                                0
                            ).toLocaleString()}
                        </strong>

                    </div>


                    {/* PLACE ORDER BUTTON */}
                    <button
                        type="button"
                        className="place-order-button"
                        onClick={handlePlaceOrder}
                    >
                        PLACE ORDER
                    </button>


                    {/* BACK TO CART */}
                    <Link
                        to="/cart"
                        className="back-to-cart"
                    >
                        ← Back to Cart
                    </Link>

                </div>

            </div>

        </div>
    );
}

// EXPORT CHECKOUT COMPONENT
export default Checkout;