import { Link, NavLink } from "react-router-dom";

export default function Aside() {
  return (
    <aside>
      <div className="profile-header">
        <h1>notes...</h1>
      </div>
      <p className="profile-bio">
        Designer & developer living between Boston & Montreal. Given my love of
        potatoes, second breakfast, and all things cozy, I was meant to either
        be a hobbit or a moomin.
      </p>
      <ul className="interest-list">
        <li>☕️ fika</li>
        <li>🧶 knitting</li>
        <li>🧺 picnics</li>
        <li>🌿 nature walks</li>
      </ul>
      <nav className="sidebar-nav">
        <NavLink to="/" end>home</NavLink>
        <NavLink to="/about">about</NavLink>
        <NavLink to="/work">work</NavLink>
        <NavLink to="/playground">playground</NavLink>
        <NavLink to="/contact">contact</NavLink>
      </nav>
      <ul className="sidebar-links">
        <li>
          <a href="https://github.com/essieanawalt" aria-label="github">
            <i className="fa-brands fa-github"></i>
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/sarahanawalt/"
            aria-label="linkedin"
          >
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </li>
        <li>
          <Link to="/contact" aria-label="contact">
            <i className="fa-solid fa-envelope"></i>
          </Link>
        </li>
      </ul>
    </aside>
  );
}
