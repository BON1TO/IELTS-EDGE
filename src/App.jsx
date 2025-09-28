// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home page */}
        <Route path="/" element={<HomePage />} />

        {/* Login page */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}
