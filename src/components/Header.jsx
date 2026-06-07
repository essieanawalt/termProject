import { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  // useRef gives me a reference to the actual DOM element so I can toggle the class directly
  // starts as null because the element doesn't exist yet when the component first loads
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      headerRef.current?.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    // returning a cleanup function -— react calls this when the component unmounts
    // without it the scroll listener would keep running even after leaving the page
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // empty array means this only runs once when the component mounts

  return (
    <header ref={headerRef}>
      {/* Link instead of NavLink here so the site title doesn't get an 'active' class */}
      <Link className="site-title" to="/">
        Essie Anawalt
      </Link>
      <nav>
        {/* 'end' on home so it only matches exactly '/' and not every route */}
        <NavLink to="/" end>
          home
        </NavLink>
        <NavLink to="/about">about</NavLink>
        <NavLink to="/work">work</NavLink>
        <NavLink to="/game">game</NavLink>
        <NavLink to="/contact">contact</NavLink>
      </nav>
    </header>
  );
}
