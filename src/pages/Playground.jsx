import { Link } from "react-router-dom";
import "../styles/playground.css";

export default function Playground() {
  return (
    <article>
      <h1>Playground</h1>
      <section className="game-grid">
        <article className="game-card">
          <span className="game-card-emoji">🃏</span>
          <h2>memory match</h2>
          <p>Flip cards to find matching pairs. How many moves to win?</p>
          <Link to="/memory" className="game-card-link">
            play →
          </Link>
        </article>
        <article className="game-card">
          <span className="game-card-emoji">🧺</span>
          <h2>farmer's market</h2>
          <p>Sort the poor farmer's produce back into the right baskets.</p>
          <Link to="/market" className="game-card-link">
            play →
          </Link>
        </article>
      </section>
    </article>
  );
}
