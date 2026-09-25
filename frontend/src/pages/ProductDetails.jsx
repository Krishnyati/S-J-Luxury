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

    // Quantity State
    const [quantity, setQuantity] = useState(1);

    // Add To Cart Loading State
    const [addingToCart, setAddingToCart] = useState(false);

    // Add To Favorites Loading State
    const [addingToFavorites, setAddingToFavorites] = useState(false);

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


    // ================= INCREASE QUANTITY =================

    const increaseQuantity = () => {

        setQuantity(quantity + 1);
    };


    // ================= DECREASE QUANTITY =================

    const decreaseQuantity = () => {

        if (quantity > 1) {

            setQuantity(quantity - 1);
        }
    };


    // ================= ADD TO CART =================

    const handleAddToCart = async () => {

        // Get Login Token
        const token = localStorage.getItem("token");

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

            // Clear Previous Message
            setMessage("");

            // Add Product To Cart
            const response = await fetch(
                "http://localhost:5000/api/cart/add",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },

                    body: JSON.stringify({
                        productId: product._id,
                        quantity: quantity,
                    }),
                }
            );

            // Get Response Data
            const data = await response.json();

            // Check Response
            if (response.ok) {

                setMessage(
                    "Product added to cart successfully"
                );

            } else {

                setMessage(
                    data.message || "Unable to add product to cart"
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

    //=====ADD TO FAVORITES YOUR PRODUCT==============
    const handleAddToFavorites = async() => {
        //GET LOGIN TOKEN FIRST
        const token = localStorage.getItem("token");

        //CHECK LOGIN IF NOT LOGIN THEN SHOW MESSAGE
        if(!token){
            setMessage("Please login to add product to favorites");
            return;
        }

        try{
            //Start Loading
            setAddingToFavorites(true);

            //Clear Previous Message
            setMessage("");

            //Add Product To Favorites
            const response = await fetch( "http://localhost:5000/api/favorites/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify({
                    productId: product._id,
                }),
            });

            //GET RESPONSE DATA FROM FRONTED 
            const data = await response.json();

            //CHECK RESPONSE
            if(response.ok){
                setMessage("Product added to favorites successfully");
            }
            else{
                setMessage(data.message || "Unable to add product to favorites");
            }
        }
        catch(error){
            console.error("Add To Favorites Error:", error);

           setMessage("Unable to connect with server");
        }
        finally{
            //Stop Loading
            setAddingToFavorites(false);
        }
    };
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


                    {/* ================= STOCK ================= */}

                    <p className="stock-info">
                        In Stock
                    </p>


                    {/* ================= QUANTITY ================= */}

                    <div className="quantity-section">

                        <p>
                            Quantity
                        </p>

                        <div className="quantity-control">

                            {/* DECREASE */}

                            <button
                                type="button"
                                onClick={decreaseQuantity}
                                disabled={quantity === 1}
                            >
                                −
                            </button>


                            {/* QUANTITY */}

                            <span>
                                {quantity}
                            </span>


                            {/* INCREASE */}

                            <button
                                type="button"
                                onClick={increaseQuantity}
                            >
                                +
                            </button>

                        </div>

                    </div>


                    {/* ================= ADD TO CART ================= */}

                    <button
                        type="button"
                        className="details-cart-button"
                        onClick={handleAddToCart}
                        disabled={addingToCart}
                    >

                        {addingToCart
                            ? "ADDING TO CART..."
                            : "ADD TO CART"
                        }

                    </button>

                    {/* ================= ADD TO FAVORITES ================= */}
                    <button
                        type="button" 
                        className="details-favorite-button"
                        onClick={handleAddToFavorites}
                        disabled={addingToFavorites}
                    >
                        {addingToFavorites
                            ? "ADDING TO FAVORITES..."
                            : "ADD TO FAVORITES"
                        }
                    </button>

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