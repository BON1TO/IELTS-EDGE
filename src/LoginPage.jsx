// src/LoginPage.jsx
import { useState } from "react";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    
  };

  return (
    <div className="login-root">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-sub">Sign in to continue</p>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn-primary w-full">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
}
