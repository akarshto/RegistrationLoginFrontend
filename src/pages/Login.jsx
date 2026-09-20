import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.password) {
      setError("Username and password are required");
      return;
    }

    setSubmitting(true);
    try {
      // Backend sets the JWT as an HttpOnly cookie on success.
      // The frontend never touches the token itself.
      await api.post("/login", form);
      navigate("/home");
    } catch (err) {
      const message = err.response?.data?.message || "Invalid username or password";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-shell">
        <header className="site-header">
          <Link className="brand" to="/login">
            <span className="brand-mark">R/</span>
            <span>Registration / Login</span>
          </Link>
          <span className="header-index">01 — ACCESS</span>
        </header>

        <main className="auth-layout">
          <section className="auth-intro">
            <p className="eyebrow">Private access</p>
            <h1>Welcome<br />back.</h1>
            <p className="intro-copy">Sign in to continue to your account and pick up where you left off.</p>
          </section>

          <section className="auth-card">
            <div className="form-heading">
              <span>Sign in</span>
              <span className="form-number">01</span>
            </div>

            {error && <div className="form-error" role="alert">{error}</div>}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  autoComplete="username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
              </div>

              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? "Logging in..." : "Login"}
                <span aria-hidden="true">-&gt;</span>
              </button>
            </form>

            <div className="auth-link">
              New user? <Link to="/signup">Create an account →</Link>
            </div>
          </section>
        </main>

        <footer className="auth-footer">
          <span>Secure account access</span>
          <span>© 2026</span>
        </footer>
      </div>
    </div>
  );
}

export default Login;
