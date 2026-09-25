// Import Category Products page
import CategoryProducts from "./pages/CategoryProducts";

// Import Dashboard page
import Dashboard from "./pages/Dashboard";

// Import Header component
import Header from "./components/Header";

// Import React Hooks
import { useEffect, useState } from "react";

// Import Product Card component
import ProductCard from "./components/ProductCard";

// Import App CSS
import "./App.css";

// Import Hero component
import Hero from "./components/Hero";

// Import Categories component
import Categories from "./components/Categories";

// Import React Router
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

// Import Register page
import Register from "./pages/Register";

// Import Login page
import Login from "./pages/Login";

// Import Email Verification page
import VerifyEmail from "./pages/VerifyEmail";

// Import Product Details page
import ProductDetails from "./pages/ProductDetails";

// Import Profile page
import Profile from "./pages/Profile";

// Import Edit Profile page
import EditProfile from "./pages/EditProfile";

// Import Cart page
import Cart from "./pages/Cart";

// Import Favorites page
import Favorites from "./pages/Favorites";

// ================= HOME PAGE =================

function Home() {

    // Store all products
    const [products, setProducts] = useState([]);

    // Store search text
    const [searchTerm, setSearchTerm] = useState("");

    // Store current product page
    const [currentPage, setCurrentPage] = useState(1);

    // Number of products per page
    const productsPerPage = 10;


    // ================= FETCH PRODUCTS =================

    useEffect(() => {

        fetch("http://localhost:5000/api/products")
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.log(
                    "Error fetching products:",
                    error
                );
            });

    }, []);


    // ================= SEARCH PRODUCTS =================

    const filteredProducts = products.filter(
        (product) => {

            const search = searchTerm.toLowerCase();

            return (
                product.name
                    ?.toLowerCase()
                    .includes(search) ||

                product.category
                    ?.toLowerCase()
                    .includes(search) ||

                product.description
                    ?.toLowerCase()
                    .includes(search)
            );
        }
    );


    // ================= PAGINATION =================

    const totalPages = Math.ceil(
        filteredProducts.length / productsPerPage
    );

    const startIndex =
        (currentPage - 1) * productsPerPage;

    const currentProducts =
        filteredProducts.slice(
            startIndex,
            startIndex + productsPerPage
        );


    // ================= HOME PAGE UI =================

    return (

        <div
            className="app"
            id="home"
        >

            {/* ================= HEADER ================= */}

            <Header />


            {/* ================= HERO ================= */}

            <Hero />


            {/* ================= CATEGORIES ================= */}

            <Categories />


            {/* ================= INTRO ================= */}

            <section className="intro-section">

                <p className="gold-text">
                    S&J LUXURY
                </p>

                <h2>
                    Designed for the woman
                    <br />
                    who defines her own style.
                </h2>

                <p className="intro-text">
                    Discover elegant ladies handbags
                    and accessories created
                    for modern luxury and timeless
                    sophistication.
                </p>

            </section>


            {/* ================= PRODUCTS SECTION ================= */}

            <section
                className="products-section"
                id="shop"
            >

                <div className="products-heading">

                    <p>
                        DISCOVER
                    </p>

                    <h2>
                        Ladies Collection
                    </h2>

                </div>


                {/* ================= SEARCH ================= */}

                <div className="product-search">

                    <input
                        id="product-search"
                        type="text"
                        placeholder="Search Products..."
                        value={searchTerm}
                        onChange={(e) => {

                            setSearchTerm(
                                e.target.value
                            );

                            setCurrentPage(1);

                        }}
                    />

                    <span>
                        ⌕
                    </span>

                </div>


                {/* ================= PRODUCT COUNT ================= */}

                <p className="product-count">

                    Showing{" "}

                    {filteredProducts.length === 0
                        ? 0
                        : startIndex + 1
                    }

                    -

                    {Math.min(
                        startIndex + productsPerPage,
                        filteredProducts.length
                    )}

                    {" "}of{" "}

                    {filteredProducts.length}

                    {" "}products

                </p>


                {/* ================= PRODUCT GRID ================= */}

                <div className="products-grid">

                    {currentProducts.map(
                        (product) => (

                            <ProductCard
                                key={product._id}
                                product={product}
                            />

                        )
                    )}

                </div>


                {/* ================= PAGINATION ================= */}

                {totalPages > 1 && (

                    <div className="pagination">

                        <button
                            type="button"
                            onClick={() =>
                                setCurrentPage(
                                    currentPage - 1
                                )
                            }
                            disabled={currentPage === 1}
                        >
                            ← Previous
                        </button>


                        {Array.from(
                            {
                                length: totalPages
                            },
                            (_, index) => index + 1

                        ).map(
                            (pageNumber) => (

                                <button
                                    type="button"
                                    key={pageNumber}
                                    className={
                                        currentPage === pageNumber
                                            ? "active-page"
                                            : ""
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            pageNumber
                                        )
                                    }
                                >
                                    {pageNumber}
                                </button>

                            )
                        )}


                        <button
                            type="button"
                            onClick={() =>
                                setCurrentPage(
                                    currentPage + 1
                                )
                            }
                            disabled={
                                currentPage === totalPages
                            }
                        >
                            Next →
                        </button>

                    </div>

                )}


                {/* ================= NO PRODUCTS ================= */}

                {filteredProducts.length === 0 && (

                    <div className="no-products">

                        <h3>
                            No Products Found
                        </h3>

                        <p>
                            Try searching with another
                            product name or category.
                        </p>

                    </div>

                )}

            </section>


            {/* ================= S&J SIGNATURE ================= */}

            <section className="feature-section">

                <div className="feature-image">

                    <div className="feature-image-overlay"></div>

                </div>

                <div className="feature-content">

                    <p className="gold-text">
                        THE S&J SIGNATURE
                    </p>

                    <h2>
                        Luxury that
                        <br />
                        lasts beyond seasons.
                    </h2>

                    <p>
                        Carefully selected materials,
                        elegant designs and timeless
                        details come together to create
                        a collection made for every
                        special moment.
                    </p>

                    <button
                        type="button"
                        className="outline-button"
                    >
                        DISCOVER S&J
                    </button>

                </div>

            </section>


            {/* ================= ABOUT SECTION ================= */}

            <section
                className="about-section"
                id="about"
            >

                <p className="gold-text">
                    ABOUT US
                </p>

                <h2>
                    Elegance. Quality. Confidence.
                </h2>

                <p>
                    S&J Luxury brings together modern
                    fashion and timeless elegance through
                    a carefully selected collection of
                    ladies luxury products.
                </p>

            </section>


            {/* ================= FOOTER ================= */}

            <footer id="contact">

                <div className="footer-container">

                    {/* Brand column */}

                    <div className="footer-column footer-brand">

                        <div className="footer-logo">
                            S&J LUXURY
                        </div>

                        <p>
                            Luxury. Elegance. Timeless.
                        </p>

                    </div>


                    {/* Contact column */}

                    <div className="footer-column footer-contact">

                        <h3>
                            FOR FURTHER INQUIRIES
                        </h3>

                        <a
                            href="mailto:sjtheartofluxury@gmail.com"
                        >
                            ✉ sjtheartofluxury@gmail.com
                        </a>

                        <a
                            href="tel:+918797717529"
                        >
                            ☎ +91 87977 17529
                        </a>

                    </div>


                    {/* Quick Links column */}

                    <div className="footer-column">

                        <h3>
                            QUICK LINKS
                        </h3>

                        <div className="footer-links">

                            <a href="#home">
                                Home
                            </a>

                            <a href="#shop">
                                Shop
                            </a>

                            <a href="#about">
                                About
                            </a>

                            <a href="#contact">
                                Contact
                            </a>

                        </div>

                    </div>


                    {/* Instagram column */}

                    <div className="footer-column">

                        <h3>
                            FOLLOW US
                        </h3>

                        <a
                            className="instagram-link"
                            href="https://www.instagram.com/sj_luxury/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span className="instagram-icon">
                                ◎
                            </span>

                            @sjluxury2
                        </a>

                    </div>

                </div>


                {/* Footer copyright */}

                <div className="footer-bottom">

                    <p className="copyright">
                        © 2026 S&J Luxury. All Rights Reserved.
                    </p>

                    <p className="footer-tagline">
                        Luxury for Every You.
                    </p>

                </div>

            </footer>

        </div>
    );
}


// ================= MAIN APP =================

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/product/:id"
                    element={<ProductDetails />}
                />

                <Route
                    path="/category/:category"
                    element={<CategoryProducts />}
                />

                <Route
                    path="/profile"
                    element={<Profile />}
                />

                <Route
                    path="/verify-email"
                    element={<VerifyEmail />}
                />

                <Route
                    path="/edit-profile"
                    element={<EditProfile />}
                />

                <Route
                    path="/cart"
                    element={<Cart />}
                />
                
                <Route
                    path="/favorites" 
                    element={<Favorites />}
                />
                
            </Routes>

        </BrowserRouter>
    );
}

export default App;