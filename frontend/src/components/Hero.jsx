import "./Hero.css";

function Hero() {
  return (
    <section className="hero" id="home">

      <img
        src="/hero1.jpg"
        className="hero-image"
        alt="S&J Luxury Collection"
      />

      <div className="hero-overlay"></div>

      <div className="hero-content">

       <h1>
          Elegance That
          <span>Speaks For You</span>
        </h1>

        <p className="hero-text">
          Discover our carefully selected ladies collection
          designed for timeless elegance and modern luxury.
        </p>

        <button>
          SHOP COLLECTION
        </button>

      </div>

    </section>
  );
}

export default Hero;