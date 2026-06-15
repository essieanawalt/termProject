import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/not-found.css";

export default function NotFound() {
  useEffect(() => {
    document.title = "not found · Essie Anawalt";
  }, []);

  return (
    <article className="not-found">
      <i className="fa-solid fa-person-hiking not-found-icon" aria-hidden="true"></i>
      <p className="not-found-code">404</p>
      <h1>you've wandered somewhere that doesn't exist.</h1>
      <p>even moomins get lost sometimes.</p>
      <Link to="/" className="not-found-link">← back to home</Link>
    </article>
  );
}
