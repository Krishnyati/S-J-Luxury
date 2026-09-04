// Import Product Card
import ProductCard from "../components/ProductCard";

// Import Header
import Header from "../components/Header";

// Import React Hooks
import { useEffect, useState } from "react";

// Import Navigation and URL Parameters
import { Link, useParams } from "react-router-dom";

// Import CSS
import "./CategoryProducts.css";


// ================= CATEGORY PRODUCTS COMPONENT =================

function CategoryProducts() {

    // Get Category From URL
    const { category } = useParams();

    // Store Products
    const [products, setProducts] = useState([]);


    // ================= FETCH PRODUCTS =================

    useEffect(() => {

        const fetchProducts = async () => {

            try {

                // Get All Products From Backend
                const response = await fetch(
                    "http://localhost:5000/api/products"
                );

                const data = await response.json();

                // Convert URL Category To Lowercase
                const selectedCategory =
                    category?.toLowerCase();


                // ================= CATEGORY GROUPS =================

                const categoryGroups = {

                    watch: [
                        "watch",
                        "watches"
                    ],

                    purse: [
                        "purse",
                        "purses",
                        "handbag",
                        "handbags"
                    ],

                    // Handbags show the same products as Purse
                    handbags: [
                        "purse",
                        "purses",
                        "handbag",
                        "handbags"
                    ],

                    sunglasses: [
                        "sunglasses",
                        "sunglass"
                    ],

                    perfume: [
                        "perfume",
                        "perfumes",
                        "fragrance",
                        "fragrances"
                    ]
                };


                // Find Matching Categories
                const matchingCategories =
                    categoryGroups[selectedCategory] || [
                        selectedCategory
                    ];


                // ================= FILTER PRODUCTS =================

                const filteredProducts = data.filter(
                    (product) => {

                        const productCategory =
                            product.category?.toLowerCase();

                        return matchingCategories.includes(
                            productCategory
                        );
                    }
                );


                // Store Filtered Products
                setProducts(filteredProducts);

            } catch (error) {

                console.error(
                    "Error Fetching Category Products:",
                    error
                );
            }

        };

        fetchProducts();

    }, [category]);


    // ================= PAGE =================

    return (

        <div className="category-products-page">

            {/* Header now appears on Category pages */}

            <Header />


            {/* Category Header */}

            <div className="category-products-header">

                <p>
                    S&J Luxury
                </p>

                <h1>
                    {category}
                </h1>

                <span>
                    Discover our {category} collection.
                </span>

            </div>


            {/* Back To Collection */}

            <div className="category-back">

                <Link to="/">
                    ← Back To Collection
                </Link>

            </div>


            {/* Products */}

            <div className="category-products-grid">

                {products.map((product) => (

                    <ProductCard
                        key={product._id}
                        product={product}
                    />

                ))}

            </div>


            {/* No Products Message */}

            {products.length === 0 && (

                <div className="no-category-products">

                    <h2>
                        No Products Found Here
                    </h2>

                    <p>
                        There are currently no products
                        available in this category.
                    </p>

                    <Link to="/">
                        Continue Shopping
                    </Link>

                </div>

            )}

        </div>

    );
}


// Export Component
export default CategoryProducts;