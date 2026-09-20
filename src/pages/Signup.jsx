import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phoneNumber: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (
      !form.username ||
      !form.password ||
      !form.confirmPassword ||
      !form.email ||
      !form.phoneNumber
    ) {
      return "All fields are required";
    }
    if (form.password !== form.confirmPassword) {
      return "Password and confirm password do not match";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      await api.post("/registration", form);
      navigate("/login");
    } catch (err) {
      const responseData = err.response?.data;
      const validationMessage = responseData &&
        Object.values(responseData).find((value) => typeof value === "string");
      const message = responseData?.message ||
        validationMessage ||
        (err.request ? "Cannot reach the server. Make sure the backend is running on port 8080." :
          "Registration failed. Please try again.");
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
          <span className="header-index">02 — JOIN</span>
        </header>

        <main className="auth-layout auth-layout-signup">
          <section className="auth-intro">
            <p className="eyebrow">New account</p>
            <h1>Make room<br />for what's next.</h1>
            <p className="intro-copy">Create a secure account in a few simple steps.</p>
          </section>

          <section className="auth-card">
            <div className="form-heading">
              <span>Create account</span>
              <span className="form-number">02</span>
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
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={form.phoneNumber}
              onChange={handleChange}
              autoComplete="tel"
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
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
          </div>

              <button type="submit" className="btn-primary" disabled={submitting}>
                {submitting ? "Signing up..." : "Create account"}
                <span aria-hidden="true">-&gt;</span>
              </button>
            </form>

            <div className="auth-link">
              Already have an account? <Link to="/login">Sign in →</Link>
            </div>
          </section>
        </main>

        <footer className="auth-footer">
          <span>Secure account access</span>
          <span>(c) 2026</span>
        </footer>
      </div>
    </div>
  );
}

export default Signup;
