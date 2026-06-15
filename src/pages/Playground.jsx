import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/playground.css";

export default function Playground() {
  useEffect(() => {
    document.title = "playground · Essie Anawalt";
  }, []);

  return (
    <article>
      <h1>playground.</h1>
      <section className="game-grid">
        <article className="game-card">
          <i className="fa-solid fa-basket-shopping game-card-icon" aria-hidden="true"></i>
          <h2>farmer's market</h2>
          <p>Sort the poor farmer's produce back into the right baskets.</p>
          <Link to="/market" className="game-card-link">
            play →
          </Link>
        </article>
        <article className="game-card">
          <i className="fa-solid fa-clone game-card-icon" aria-hidden="true"></i>
          <h2>memory match</h2>
          <p>Flip cards to find matching pairs. How many moves to win?</p>
          <Link to="/memory" className="game-card-link">
            play →
          </Link>
        </article>
        <article className="game-card">
          <i className="fa-solid fa-spa game-card-icon" aria-hidden="true"></i>
          <h2>petal drop</h2>
          <p>Guess the hidden word before the flower loses all its petals.</p>
          <Link to="/petal-drop" className="game-card-link">
            play →
          </Link>
        </article>
      </section>
    </article>
  );
}
