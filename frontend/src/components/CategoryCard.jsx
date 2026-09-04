// Import useNavigate from React Router
import { useNavigate } from "react-router-dom";

// Import CSS
import "./Categories.css";

// ================= CATEGORY CARD =================

function CategoryCard({ name, image, category }) {

    // Create navigation function
    const navigate = useNavigate();

    // ================= EXPLORE BUTTON =================

    const handleExplore = () => {

        // Open selected category page
        navigate(`/category/${category}`);

    };

    // ================= CATEGORY CARD UI =================

    return (

        <div className="category-card">

            {/* ================= CATEGORY IMAGE ================= */}

            <img
                src={image}
                alt={name}
            />

            {/* ================= CATEGORY CONTENT ================= */}

            <div className="category-name">

                {/* Category Name */}

                <h3>
                    {name}
                </h3>

                {/* Explore Button */}

                <button
                    type="button"
                    onClick={handleExplore}
                >
                    Explore More
                </button>

            </div>

        </div>

    );
}

export default CategoryCard;