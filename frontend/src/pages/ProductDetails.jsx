// Import React Hooks
import { useEffect, useState } from "react";

// Import Navigation
import { Link, useParams } from "react-router-dom";

// Import CSS
import "./ProductDetails.css";

// ================= PRODUCT DETAILS COMPONENT =================

function ProductDetails() {

    // Get Product ID From URL
    const { id } = useParams();

    // Product State
    const [product, setProduct] = useState(null);

    // Message State
    const [message, setMessage] = useState("");

    // Loading State
    const [loading, setLoading] = useState(true);


    // ================= FETCH PRODUCT =================

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                // Fetch Product From Backend
                const response = await fetch(
                    `http://localhost:5000/api/products/${id}`
                );

                const data = await response.json();

                // Check Response
                if (response.ok) {

                    setProduct(data);

                } else {

                    setMessage(
                        data.message || "Product not found"
                    );
                }

            } catch (error) {

                console.error(
                    "Product Error:",
                    error
                );

                setMessage(
                    "Unable to connect with server"
                );

            } finally {

                setLoading(false);
            }
        };

        fetchProduct();

    }, [id]);


    // ================= LOADING =================

    if (loading) {

        return (
            <div className="product-details-page loading-page">

                <h2>
                    Loading Product...
                </h2>

            </div>
        );
    }


    // ================= PRODUCT NOT FOUND =================

    if (!product) {

        return (
            <div className="product-details-page error-page">

                <h2>
                    {message || "Product Not Found"}
                </h2>

                <Link to="/">
                    Back To Shop
                </Link>

            </div>
        );
    }


    // ================= PRICE CALCULATION =================

    const price = Number(product.price);

    const discount = Number(
        product.discount || 0
    );

    const finalPrice =
        price - (price * discount) / 100;


    // ================= PRODUCT DETAILS UI =================

    return (

        <div className="product-details-page">

            <div className="product-details-container">


                {/* ================= PRODUCT IMAGE ================= */}

                <div className="product-details-image">

                    <img
                        src={product.image}
                        alt={product.name}
                    />

                </div>


                {/* ================= PRODUCT INFORMATION ================= */}

                <div className="product-details-info">


                    {/* Product Category */}

                    <p className="product-category">
                        {product.category}
                    </p>


                    {/* Product Name */}

                    <h1>
                        {product.name}
                    </h1>


                    {/* Product Price */}

                    <div className="product-details-price">

                        <span>
                            ₹{finalPrice.toLocaleString()}
                        </span>

                        {discount > 0 && (

                            <del>
                                ₹{price.toLocaleString()}
                            </del>

                        )}

                    </div>


                    {/* Discount */}

                    {discount > 0 && (

                        <p className="discount-text">
                            {discount}% OFF
                        </p>

                    )}


                    {/* Divider */}

                    <div className="product-divider">
                    </div>


                    {/* Product Description */}

                    <p className="product-description">
                        {product.description}
                    </p>


                    {/* ================= MESSAGE ================= */}

                    {message && (

                        <p className="details-message">
                            {message}
                        </p>

                    )}


                    {/* ================= BACK TO SHOP ================= */}

                    <Link
                        to="/"
                        className="back-shop-link"
                    >
                        ← BACK TO SHOP
                    </Link>


                </div>

            </div>

        </div>
    );
}


// Export Component
export default ProductDetails;