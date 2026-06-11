import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const headerRef = useRef(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      headerRef.current?.classList.toggle("scrolled", window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll); // cleanup on unmount
  }, []); // once on mount

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark((prev) => !prev);
  };

  return (
    <header ref={headerRef}>
      <div className="header-inner">
        <button
          className="toggle-theme"
          onClick={toggleTheme}
          aria-label="toggle theme"
        >
          <i className={isDark ? "fa-regular fa-sun" : "fa-regular fa-moon"}></i>
        </button>
      </div>
    </header>
  );
}
