// src/HomePage.jsx
import Navbar from "./components/Navbar";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./home.css";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroBgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isSmall = window.innerWidth < 900;

      if (prefersReduced) {
        gsap.set(
          [
            ".hero-title",
            ".hero-sub",
            ".hero-cta",
            ".feature-card",
            ".testimonial",
            ".mock-card",
            ".footer",
          ],
          { opacity: 1, y: 0, clearProps: "transform,opacity" }
        );
        return;
      }

      // Hero entrance — subtle, quick
      const heroTL = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTL
        .fromTo(".hero-title", { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(".hero-sub", { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, "-=0.35")
        .fromTo(
          ".hero-cta",
          { y: 6, opacity: 0, scale: 0.995 },
          { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.09 },
          "-=0.28"
        );

      // gentle parallax only on larger screens, very light scrub
      if (!isSmall && heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: -3.5,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 0.08,
          },
        });
      }

      // Batch reveal features — single ScrollTrigger 
      const features = gsap.utils.toArray(".feature-card");
      if (features.length) {
        gsap.from(features, {
  y: 40,               // more distance
  opacity: 0,
  duration: 0.8,       // longer duration
  ease: "power3.out",
  stagger: 0.15,
  scrollTrigger: { trigger: ".features-section", start: "top 90%", once: true },
});

      }

      // Testimonials
      const testimonials = gsap.utils.toArray(".testimonial");
      if (testimonials.length) {
        gsap.from(testimonials, {
          y: 10,
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: ".testimonials-section", start: "top 90%", once: true },
        });
      }

      // Footer light reveal
      gsap.from(".footer", {
        y: 10,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: { trigger: ".footer", start: "top 95%", once: true },
      });
    }, document.querySelector(".site-root"));

    return () => ctx.revert();
  }, []);

  return (
    <div className="site-root">
      <Navbar />

      <div className="pt-20 md:pt-24">
        {/* HERO (dark) */}
        <header className="hero-section relative overflow-hidden">
          <div
            ref={heroBgRef}
            className="hero-bg absolute inset-0 -z-10"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(6,11,25,0.6), rgba(6,11,25,0.6)), url('https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1600&auto=format&fit=crop&s=abcd')",
            }}
          />
          <div className="container px-6 py-20 lg:py-28 grid lg:grid-cols-2 gap-12 items-center">
            <div className="hero-left max-w-2xl">
              <div className="eyebrow">Live classes • Mock tests</div>

              <h1 className="hero-title mt-4">
                Master IELTS — <span className="accent">confidently</span>
              </h1>

              <p className="hero-sub mt-4">
                Practical lessons, weekly mock tests, and focused speaking practice — structured to improve your band quickly.
              </p>

              <div className="mt-6 flex flex-wrap gap-6">
                <button className="btn-primary hero-cta cta-glow">Start Free Trial</button>
                <button className="btn-outline hero-cta">View Courses</button>
              </div>

              <div className="mt-6 flex gap-6 text-sm stats">
                <div>
                  <div className="stat-val">+1.6</div>
                  <div className="stat-label">Avg Band</div>
                </div>
                <div>
                  <div className="stat-val">92%</div>
                  <div className="stat-label">Success</div>
                </div>
              </div>
            </div>

            <div className="hero-right relative flex justify-center lg:justify-end">
              <div className="mock-card p-5">
                <div className="mock-top flex items-start justify-between gap-4">
                  <div>
                    <h3 className="mock-title">Mock Test: Academic</h3>
                    <p className="mock-sub">Full-length simulation • 2 hrs</p>
                  </div>
                  <div className="live-badge">LIVE</div>
                </div>

                <div className="mt-4">
                  <div className="progress track" aria-hidden>
                    <div className="progress-fill" style={{ width: "78%" }} />
                  </div>
                  <div className="progress-row mt-3 flex items-center justify-between text-xs muted">
                    <span>Practice</span>
                    <span>78% completed</span>
                  </div>
                </div>

                <div className="mt-5 flex gap-3">
                  <button className="card-btn primary">Continue</button>
                  <button className="card-btn plain">Details</button>
                </div>
              </div>

              <div className="floating-glow" aria-hidden />
            </div>
          </div>
        </header>

        {/* FEATURES (light) */}
        <main>
          <section className="features-section section-light py-16" id="features">
            <div className="container px-6">
              <h2 className="section-title">What we offer</h2>
              <p className="section-sub">Focused training across Reading, Writing, Listening and Speaking.</p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: "🗣️", title: "Speaking Practice", desc: "Live 1:1 speaking drills." },
                  { icon: "📝", title: "Mock Tests", desc: "Realistic full-length tests." },
                  { icon: "🤖", title: "AI Band Predictor", desc: "Instant predicted band." },
                  { icon: "📚", title: "Personalized Plans", desc: "Adaptive study schedules." },
                ].map((f, i) => (
                  <article key={i} className="feature-card">
                    <div className="feature-head">
                      <div className="feature-ico">{f.icon}</div>
                      <h3 className="feature-title">{f.title}</h3>
                    </div>
                    <p className="feature-desc">{f.desc}</p>
                    <div className="mt-4">
                      <button className="linkish">Learn more →</button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="testimonials-section section-muted py-16" id="testimonials">
            <div className="container px-6 max-w-4xl mx-auto">
              <h2 className="section-title text-center">Students love us</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <blockquote className="testimonial">
                  <p>“Scored 7.5 after 2 months — the mock tests were on point.”</p>
                  <footer className="muted mt-3">— Aisha K.</footer>
                </blockquote>
                <blockquote className="testimonial">
                  <p>“Speaking practice & feedback were game changers.”</p>
                  <footer className="muted mt-3">— Ravi S.</footer>
                </blockquote>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* FOOTER (dark) */}
      <footer className="footer section-dark py-8" id="contact">
        <div className="container px-6 flex flex-col md:flex-row items-center justify-between">
          <div>
            <div className="brand">IeltsEdge</div>
            <div className="muted text-sm mt-1">hello@ieltledge.com • +91 98765 43210</div>
          </div>
          <div className="muted text-sm mt-4 md:mt-0">&copy; {new Date().getFullYear()} IeltsEdge</div>
        </div>
      </footer>
    </div>
  );
}
