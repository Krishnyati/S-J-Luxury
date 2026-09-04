// Import React
import React from "react";

// Import Link for navigation
import { Link } from "react-router-dom";

// Import Product Card CSS
import "./ProductCard.css";

// Product Card Component
function ProductCard({ product }) {

    // Get product price
    const price = Number(product.price);

    // Get product discount
    const discount = Number(product.discount || 0);

    // Calculate final price
    const finalPrice =
        price - (price * discount) / 100;

    // Product Card UI
    return (
        <div className="product-card">

            {/* Product Image */}
            <div className="product-image">

                <Link
                    to={`/product/${product._id}`}
                    className="product-image-link"
                >
                    <img
                        src={product.image}
                        alt={product.name}
                    />
                </Link>

            </div>

            {/* Product Information */}
            <div className="product-info">

                {/* Product Category */}
                <p>
                    {product.category}
                </p>

                {/* Product Name */}
                <Link
                    to={`/product/${product._id}`}
                    className="product-name-link"
                >
                    <h3>
                        {product.name}
                    </h3>
                </Link>

                {/* Product Price */}
                <div className="price">

                    <span>
                        ₹{finalPrice.toLocaleString()}
                    </span>

                    {/* Original Price */}
                    {discount > 0 && (
                        <del>
                            ₹{price.toLocaleString()}
                        </del>
                    )}

                </div>

                {/* View Product Button */}
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