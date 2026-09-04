// Import React Hooks
import { useEffect, useState } from "react";

// Import Link for navigation
import { Link } from "react-router-dom";

// Import Orders CSS
import "./Orders.css";

// ORDERS COMPONENT

function Orders() {

    // Store user's orders
    const [orders, setOrders] = useState([]);

    // Store loading status
    const [loading, setLoading] = useState(true);

    // Store error message
    const [message, setMessage] = useState("");


    // FETCH USER ORDERS

    useEffect(() => {

        const fetchOrders = async () => {

            // Get login token
            const token = localStorage.getItem("token");

            // Check login
            if (!token) {
                setMessage("Please login to view your orders.");
                setLoading(false);
                return;
            }

            try {

                // Get logged-in user's orders from backend
                const response = await fetch(
                    "http://localhost:5000/api/orders/my-orders",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Convert response into JSON
                const data = await response.json();

                // Check successful response
                if (response.ok) {

                    setOrders(data.orders || []);

                } else {

                    setMessage(
                        data.message || "Unable to fetch orders."
                    );
                }

            } catch (error) {

                // Display error in console
                console.error("Orders Error:", error);

                setMessage(
                    "Unable to connect to server."
                );

            } finally {

                // Stop loading
                setLoading(false);
            }
        };

        fetchOrders();

    }, []);


    // LOADING SCREEN

    if (loading) {

        return (
            <div className="orders-page">

                <h2>
                    Loading Orders...
                </h2>

            </div>
        );
    }


    // ERROR MESSAGE

    if (message) {

        return (
            <div className="orders-page empty-orders">

                <h1>
                    My Orders
                </h1>

                <p>
                    {message}
                </p>

                <Link to="/login">
                    Login
                </Link>

            </div>
        );
    }


    // EMPTY ORDERS

    if (orders.length === 0) {

        return (
            <div className="orders-page empty-orders">

                <p className="orders-label">
                    S&J LUXURY
                </p>

                <h1>
                    No Orders Yet
                </h1>

                <p>
                    You have not placed any orders yet.
                </p>

                <Link to="/">
                    Continue Shopping
                </Link>

            </div>
        );
    }

    // ORDERS UI

    return (

        <div className="orders-page">

            {/* ================================
                ORDERS HEADER
            ================================= */}

            <div className="orders-header">

                <p>
                    S&J LUXURY
                </p>

                <h1>
                    My Orders
                </h1>

                <span>
                    View your previous luxury purchases.
                </span>

            </div>


            {/* ORDERS LIST  */}

            <div className="orders-list">

                {orders.map((order) => (

                    <div
                        className="order-card"
                        key={order._id}
                    >

                        {/* ORDER HEADER*/}

                        <div className="order-card-header">

                            <div>

                                <p>
                                    ORDER ID
                                </p>

                                <strong>
                                    #{order._id}
                                </strong>

                            </div>

                            <div>

                                <p>
                                    ORDER DATE
                                </p>

                                <strong>
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </strong>

                            </div>

                        </div>


                        {/* ORDER STATUS */}

                        <div className="order-status">

                            <span>
                                Order Status
                            </span>

                            <strong>
                                {order.orderStatus}
                            </strong>

                        </div>


                        {/* PRODUCTS */}

                        <div className="order-products">

                            <h2>
                                Products
                            </h2>

                            {order.products.map(
                                (item, index) => (

                                    <div
                                        className="order-product"
                                        key={index}
                                    >

                                        <div>

                                            <h3>
                                                {item.name}
                                            </h3>

                                            <p>
                                                Quantity:{" "}
                                                {item.quantity}
                                            </p>

                                        </div>

                                        <strong>
                                            ₹
                                            {(
                                                Number(
                                                    item.price
                                                ) *
                                                item.quantity
                                            ).toLocaleString()}
                                        </strong>

                                    </div>

                                )
                            )}

                        </div>


                        {/* ORDER TOTAL */}

                        <div className="order-total">

                            <span>
                                Total Amount
                            </span>

                            <strong>
                                ₹
                                {Number(
                                    order.totalAmount
                                ).toLocaleString()}
                            </strong>

                        </div>


                        {/* PAYMENT STATUS */}

                        <div className="payment-status">

                            <span>
                                Payment Status
                            </span>

                            <strong>
                                {order.paymentStatus ||
                                    order.paymnetStatus ||
                                    "Pending"}
                            </strong>

                        </div>


                        {/* SHIPPING INFORMATION*/}

                        <div className="shipping-information">

                            <h2>
                                Shipping Information
                            </h2>

                            <p>
                                {order.customerName ||
                                    order.customererName}
                            </p>

                            <p>
                                {order.phone}
                            </p>

                            <p>
                                {order.city},{" "}
                                {order.country}
                            </p>

                            <p>
                                {order.shippingAddress}
                            </p>

                        </div>

                    </div>

                ))}

            </div>


            {/* CONTINUE SHOPPING*/}

            <div className="orders-shopping">

                <Link to="/">
                    CONTINUE SHOPPING
                </Link>

            </div>

        </div>
    );
}


// EXPORT ORDERS COMPONENT

export default Orders;