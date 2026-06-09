import { Link } from "react-router-dom";
import "../styles/playground.css";

export default function Playground() {
  return (
    <>
      <h1>Playground</h1>
      <nav className="playground-nav">
        <Link to="/memory">memory match</Link>
        <Link to="/market">farmer's market</Link>
      </nav>
    </>
  );
}
