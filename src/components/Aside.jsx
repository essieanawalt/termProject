import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function Aside() {
  const location = useLocation();

  const isPlayground = [
    "/playground",
    "/memory",
    "/market",
    "/petal-drop",
  ].includes(location.pathname); // list all new games here
  const [subOpen, setSubOpen] = useState(isPlayground);

  useEffect(() => {
    // if (isPlayground) setSubOpen(true); // to keep expanded subnav even on other pages
    setSubOpen(isPlayground);
  }, [isPlayground]);

  return (
    <aside>
      <div className="profile-header">
        <img
          className="profile-photo"
          src={`${import.meta.env.BASE_URL}img/essie-sq.jpeg`}
          alt="photo of essie"
          width="80"
          height="80"
        />
        <p className="profile-name">Essie</p>
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
        <NavLink to="/" end>
          home
        </NavLink>
        <NavLink to="/about">about</NavLink>
        <div>
          <NavLink
            to="/playground"
            className={({ isActive }) =>
              isActive || isPlayground ? "active" : undefined
            }
            onClick={() => setSubOpen((o) => !o)}
          >
            playground
          </NavLink>
          <ul className={`sidebar-subnav${subOpen ? " open" : ""}`}>
            <li>
              <NavLink to="/market">market</NavLink>
            </li>
            <li>
              <NavLink to="/memory">memory</NavLink>
            </li>
            <li>
              <NavLink to="/petal-drop">petal drop</NavLink>
            </li>
          </ul>
        </div>
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
