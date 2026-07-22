# Tea Project frontend

The frontend is a Vite-powered React application for the Tea Project experience. Full setup, configuration, testing, deployment, security, and licensing notes are maintained in the [repository README](../README.md).

Quick start with Node.js 20.19 or newer and npm 10 or newer:

```bash
npm ci
VITE_API_URL='http://127.0.0.1:8000' npm start
```

Verification:

```bash
npm run test:ci
npm run build
```

Vite serves the application at `http://localhost:5173` by default. `VITE_API_URL` is embedded in the browser bundle, so it must contain only a public API base URL, never a credential. Copy `.env.example` to `.env.local` for a persistent local value.
