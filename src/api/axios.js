import axios from "axios";

// The backend runs on a different local port, so cross-origin cookie-based
// auth requires withCredentials: true on every request.
const api = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
