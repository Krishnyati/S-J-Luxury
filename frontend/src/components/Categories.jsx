import CategoryCard from "./CategoryCard";
import "./Categories.css";

function Categories() {
  return (
    <section className="categories" id="shop">

      <div className="categories-heading">
        <p>Explore Our Collection</p>
        <h2>Ladies Collection</h2>
      </div>

      <div className="category-grid">

        <CategoryCard
          name="Ladies Bags"
          category="Handbags"
          image="/bag.jpg"
        />

        <CategoryCard
          name="Ladies Watches"
          category="Watches"
          image="/watch.jpg"
        />

        <CategoryCard
          name="Sunglasses"
          category="Sunglasses"
          image="/sunglasses.jpg"
        />

        <CategoryCard
          name="Ladies Perfumes"
          category="Beauty"
          image="/perfume.jpg"
        />

      </div>

    </section>
  );
}

export default Categories;