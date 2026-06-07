import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  // reference to actual DOM element
  const headerRef = useRef(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      headerRef.current?.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    // returning a cleanup function so the listener stops running
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // empty array means this only runs once

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return (
    <header ref={headerRef}>
      <button
        className="toggle-theme"
        onClick={toggleTheme}
        aria-label="toggle theme"
      >
        <i className={isDark ? "fa-regular fa-sun" : "fa-regular fa-moon"}></i>
      </button>
    </header>
  );
}
