# RegistrationLoginFrontend

React frontend for the Registration & Login system. Talks to `RegistrationLoginBackend` at `http://localhost:8080`.

## Run

```bash
npm install
npm start
```

Runs on `http://localhost:3000`.

## Pages

- `/signup` — `Signup.jsx`
- `/login` — `Login.jsx`
- `/home` — `Home.jsx` (protected; redirects to `/login` if the session check fails)

## Notes

- All API calls go through `src/api/axios.js`, which sets `withCredentials: true` so the HttpOnly JWT cookie set by the backend is sent automatically.
- The frontend never reads, stores, or manages the JWT itself — no `localStorage`/`sessionStorage` usage. Auth state is derived purely from calling `GET /api/user/me`.
