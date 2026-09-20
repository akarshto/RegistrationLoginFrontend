import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";

/**
 * Guards a route by calling GET /api/user/me. The JWT itself lives only in
 * an HttpOnly cookie set by the backend, so this component never reads or
 * stores the token directly — it just trusts the backend's 200/401 response.
 */
function ProtectedRoute({ children }) {
  const [status, setStatus] = useState("checking"); // checking | authed | unauthed

  useEffect(() => {
    let isMounted = true;

    api
      .get("/user/me")
      .then(() => {
        if (isMounted) setStatus("authed");
      })
      .catch(() => {
        if (isMounted) setStatus("unauthed");
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "checking") {
    return <div className="page-center">Checking session...</div>;
  }

  if (status === "unauthed") {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
