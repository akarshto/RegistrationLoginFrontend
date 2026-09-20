import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import "../styles/home.css";

function Home() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Username always comes from the authenticated user's record in MySQL,
    // resolved server-side from the JWT cookie — never hardcoded here.
    api
      .get("/user/me")
      .then((res) => setUsername(res.data.username))
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } finally {
      navigate("/login");
    }
  };

  if (loading) {
    return <div className="page-center">Loading...</div>;
  }

  return (
    <div className="home-page">
      <div className="home-shell">
        <header className="site-header">
          <Link className="brand" to="/home">
            <span className="brand-mark">R/</span>
            <span>Registration / Login</span>
          </Link>
          <span className="header-index">03 — ACCOUNT</span>
        </header>

        <main className="home-main">
          <p className="eyebrow">Member space</p>
          <h1>Welcome, <span>{username}</span>.</h1>
          <div className="home-meta">
            <span>Session active</span>
            <button className="btn-logout" onClick={handleLogout}>
              Sign out <span aria-hidden="true">-&gt;</span>
            </button>
          </div>
        </main>

        <footer className="auth-footer">
          <span>Your account is ready.</span>
          <span>(c) 2026</span>
        </footer>
      </div>
    </div>
  );
}

export default Home;
