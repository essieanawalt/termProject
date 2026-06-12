import { Link } from "react-router-dom";
import "../styles/home.css";

export default function Home() {
  return (
    <article>
      <div className="home-hero">
        <h1>i took the scenic route.</h1>
        <p className="home-tagline">
          Turns out I liked building things more than analyzing them.
        </p>
      </div>
      <section className="home-cards">
        <Link to="/about" className="home-card">
          <i className="fa-solid fa-address-card home-card-icon"></i>
          <h2>about</h2>
          <p>The longer story</p>
          <span className="home-card-cta">read →</span>
        </Link>
        <Link to="/playground" className="home-card">
          <i className="fa-solid fa-gamepad home-card-icon"></i>
          <h2>playground</h2>
          <p>Fun little things</p>
          <span className="home-card-cta">play →</span>
        </Link>
        <Link to="/contact" className="home-card">
          <i className="fa-solid fa-envelope home-card-icon"></i>
          <h2>contact</h2>
          <p>Say hello</p>
          <span className="home-card-cta">write →</span>
        </Link>
      </section>
    </article>
  );
}
