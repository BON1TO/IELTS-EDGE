# IELTS-EDGE

> A modern, responsive front-end for an IELTS preparation platform — live classes, mock tests, speaking practice and AI-backed tools.  
> Built with React, GSAP animations, and a lightweight CSS system (custom + utility classes).

Repository: https://github.com/BON1TO/IELTS-EDGE

---

## Demo / Quick preview
- Local: run the app locally (instructions below).
- (Optional) Deployed preview: add your Vercel / Netlify / Render link here if you deploy.

---

## Table of contents
- [Goal](#goal)  
- [Tech stack](#tech-stack)  
- [What I built](#what-i-built)  
- [Design & architecture choices (for interviewers)](#design--architecture-choices-for-interviewers)  
- [Getting started (run locally)](#getting-started-run-locally)  
- [Environment variables](#environment-variables)  
- [Project structure](#project-structure)  
- [Future improvements](#future-improvements)  
- [Notes / known limitations](#notes--known-limitations)  
- [Contact](#contact)

---

## Goal
Create a clean, production-like front-end for an IELTS learning product that:
- showcases features and marketing content,
- provides a consistent, accessible visual system (light + dark modes),
- includes animated but performant interactions using GSAP,
- supports client-side routing (React Router) and a dedicated Login page.

This repo demonstrates UI engineering, accessibility considerations, performance-minded animations, and an eye for polish.

---

## Tech stack
- **Frontend:** React (functional components, hooks)  
- **Routing:** react-router-dom  
- **Animation:** GSAP (ScrollTrigger & timelines)  
- **Styling:** Component CSS (single stylesheet `src/home.css`) with utility classes and CSS variables; responsive breakpoints included.  
- **Tooling:** npm / Node (standard create-react-app / Vite setup assumed)  
- **Optional:** Tailwind utility classes were used in markup in a few places — final stylesheet provides overrides to ensure consistent visual design.

---

## What I built
- **Home page** (`HomePage.jsx`) — hero, features, testimonials, mock-card preview, footer.  
- **Navbar** with theme toggle (light/dark) and login link (client-side via `Link`).  
- **Login page** (`LoginPage.jsx`) — minimal, accessible form scaffold for future auth integration.  
- **Polished animations**: subtle hero reveals, scroll reveals for features/testimonials using GSAP batched reveals.  
- **Theme handling**: `data-theme` on `<html>` for dark mode; persisted in `localStorage`.  
- **Responsive layout** with consistent vertical spacing and accessibility-friendly focus/contrast.  

---

## Design & architecture choices (for interviewers)
These are the points I highlight in an interview:

- **Single source of truth for spacing** — I enforce consistent inter-card gaps by controlling spacing at the container level (avoids mixed spacing from child margins and utility classes). This prevents layout drift and makes design tokens predictable.
- **CSS variables for theming** — variables such as `--brand-green`, `--card-bg` make it easy to change color/contrast across the app and provide a clear path for theming (light/dark and future brand variants).
- **GSAP for performance-minded animation** — using `ScrollTrigger` and batch reveals keeps DOM updates efficient; `prefers-reduced-motion` is respected for accessibility.
- **Progressive enhancement & graceful fallback** — theme stored in `localStorage` but fallbacks check `prefers-color-scheme`, and the design works fine without JS (content-first).
- **Component separation** — pages (`HomePage`, `LoginPage`) and UI blocks (`Navbar`, cards) are split so unit testing / E2E tests can be added easily.
- **Accessibility** — semantic HTML, aria labels on interactive controls, focus-visible styles and visible focus rings for keyboard users.
- **Routing & client-side nav** — `react-router-dom` Link component prevents full-page reloads, improving UX.

---

## Getting started (run locally)

**Prerequisites**
- Node >= 16, npm (or yarn)
- Git

**Install & Run**
```bash
# clone (if not already cloned)
git clone https://github.com/BON1TO/IELTS-EDGE.git
cd IELTS-EDGE

# install deps
npm install

# start dev server
npm start
# or if using Vite: npm run dev
