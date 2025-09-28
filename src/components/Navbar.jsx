// src/components/Navbar.jsx
import React, { useEffect, useState, useRef } from "react"; // <-- added useRef
import gsap from "gsap";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navbarRef = useRef(null); // new

  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  // ensure html data-theme set on mount and whenever changes
  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (e) {
      // ignore storage errors
    }
  }, [dark]);

  useEffect(() => {
    // GSAP entrance animations
    gsap.fromTo(".navbar", { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    gsap.fromTo(
      ".navbar a, .navbar .dark-toggle, .navbar .login-btn",
      { opacity: 0, y: -8 },
      { opacity: 1, y: 0, stagger: 0.08, delay: 0.25, duration: 0.45, ease: "power2.out" }
    );
  }, []);

  // --------- NEW: measure navbar and set CSS var to exact height ----------
  useEffect(() => {
    const setNavHeight = () => {
      try {
        const el = navbarRef.current || document.querySelector(".navbar");
        if (!el) return;
        const h = Math.ceil(el.getBoundingClientRect().height);
        document.documentElement.style.setProperty("--nav-height-dynamic", `${h}px`);
        document.documentElement.style.setProperty("scroll-padding-top", `${h}px`);
      } catch (e) {
        // ignore
      }
    };

    // initial measure
    setNavHeight();

    // refresh on resize / orientation change
    window.addEventListener("resize", setNavHeight);
    window.addEventListener("orientationchange", setNavHeight);

    // fonts can change layout — measure after fonts ready
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(setNavHeight).catch(() => {});
    }

    return () => {
      window.removeEventListener("resize", setNavHeight);
      window.removeEventListener("orientationchange", setNavHeight);
    };
  }, []);
  // ---------------------------------------------------------------------

  const handleToggle = () => {
    setDark((d) => {
      const next = !d;
      try {
        document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
      console.log("Theme toggled ->", next ? "dark" : "light");
      return next;
    });
  };

  return (
    // attach ref here
    <header ref={navbarRef} className="navbar" role="banner">
      <div className="navbar-container">
        {/* Logo */}
        <a href="#home" className="navbar-logo" aria-label="IeltsEdge home">
          <div className="logo-box" aria-hidden>
            IE
          </div>
          <span className="logo-text">IeltsEdge</span>
        </a>

        {/* Menu links */}
        <nav className="navbar-links" role="navigation" aria-label="Main">
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Right side actions: dark toggle + login */}
        <div className="navbar-actions" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            type="button"
            className="dark-toggle"
            onClick={handleToggle}
            aria-pressed={dark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? "🌞" : "🌙"}
          </button>

          {/* client-side navigation using Link */}
          <Link to="/login" className="login-btn" aria-label="Login">
            🔑 Login
          </Link>
        </div>
      </div>
    </header>
  );
}
