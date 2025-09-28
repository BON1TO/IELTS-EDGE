// src/components/Navbar.jsx
import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";

export default function Navbar() {
  const navbarRef = useRef(null);
  const navLinksRef = useRef(null);

  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return (
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch {
      return false;
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);

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
    // GSAP entrance for navbar bar itself
    gsap.fromTo(".navbar", { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" });
    // a small stagger for link fade in (desktop)
    gsap.fromTo(
      ".navbar-links a, .navbar .dark-toggle, .navbar .login-btn",
      { opacity: 0, y: -6 },
      { opacity: 1, y: 0, stagger: 0.06, delay: 0.18, duration: 0.36, ease: "power2.out" }
    );
  }, []);

  // measure navbar height (keeps spacer accurate)
  useEffect(() => {
    const setNavHeight = () => {
      try {
        const el = navbarRef.current || document.querySelector(".navbar");
        if (!el) return;
        const h = Math.ceil(el.getBoundingClientRect().height);
        document.documentElement.style.setProperty("--nav-height-dynamic", `${h}px`);
        document.documentElement.style.setProperty("scroll-padding-top", `${h}px`);
      } catch (e) {}
    };

    setNavHeight();
    window.addEventListener("resize", setNavHeight);
    window.addEventListener("orientationchange", setNavHeight);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(setNavHeight).catch(()=>{});
    return () => {
      window.removeEventListener("resize", setNavHeight);
      window.removeEventListener("orientationchange", setNavHeight);
    };
  }, []);

  // Close menu when viewport becomes wide (so links don't stay toggled on desktop)
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900 && menuOpen) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [menuOpen]);

  // animate open/close with GSAP (optional — uses maxHeight CSS but we add a soft opacity tween)
  useEffect(() => {
    const el = navLinksRef.current;
    if (!el) return;
    if (menuOpen) {
      // quickly animate opacity for smoothness
      gsap.to(el, { duration: 0.28, opacity: 1, ease: "power2.out" });
    } else {
      gsap.to(el, { duration: 0.18, opacity: 0, ease: "power2.in" });
    }
  }, [menuOpen]);

  const handleToggle = () => setMenuOpen((s) => !s);

  const handleThemeToggle = () => {
    setDark((d) => {
      const next = !d;
      try {
        document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
      return next;
    });
  };

  return (
    <header ref={navbarRef} className="navbar" role="banner">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" aria-label="IeltsEdge home">
          <div className="logo-box" aria-hidden>
            IE
          </div>
          <span className="logo-text">IeltsEdge</span>
        </Link>

        {/* Hamburger toggle (visible on small screens) */}
        <button
          className="menu-toggle"
          onClick={handleToggle}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        >
          <span aria-hidden>{menuOpen ? "✖" : "☰"}</span>
        </button>

        {/* Links (hidden on mobile unless menuOpen) */}
        <nav
          ref={navLinksRef}
          className={`navbar-links ${menuOpen ? "open" : ""}`}
          role="navigation"
          aria-label="Main"
        >
          <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
          <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>

        {/* Right side actions: dark toggle + login */}
        <div className="navbar-actions" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <button
            type="button"
            className="dark-toggle"
            onClick={handleThemeToggle}
            aria-pressed={dark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            title={dark ? "Light mode" : "Dark mode"}
          >
            {dark ? "🌞" : "🌙"}
          </button>

          <Link to="/login" className="login-btn" aria-label="Login">
            🔑 Login
          </Link>
        </div>
      </div>
    </header>
  );
}
