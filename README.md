# Tea Project

Tea Project (純心找茶) is a Taiwanese tea recommendation experience. Visitors answer a sequence of preference questions, receive a tea match, and can view event-oriented result walls and live rankings.

The application was commissioned by a National Taiwan University agricultural economics research group and built by the credited project team. The interface and source data are primarily in Traditional Chinese; project documentation is in English for public maintainability.

## Project status

This is a legacy project in maintenance mode. As of July 2026, the [Netlify frontend](https://ntu-tea-tinder.netlify.app/) still responds, but the historical Heroku API configured by older builds returns `404`. Run both services locally to exercise the complete flow.

The repository contains a substantial collection of animated tea artwork, and historical media makes a full Git clone much larger than the current checkout.

## What it includes

- A mobile-first React preference game and tea recommendation result
- Product, map, video, replay, and share views
- Event display pages for animated results and aggregate rankings
- A FastAPI service backed by MongoDB
- Input validation and bounded list responses for the public API

## Requirements

- Node.js 20.19 or newer and npm 10 or newer
- Python 3.10 or newer
- A reachable MongoDB deployment

## Local setup

### Backend

From the repository root:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
export MONGO_URI='mongodb://localhost:27017'
export CORS_ORIGINS='http://localhost:5173'
uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

The example keys are documented in [`backend/.env.example`](backend/.env.example). The application reads configuration from the process environment and does not load `.env` files automatically.

The health endpoint is available at `http://127.0.0.1:8000/`, and interactive API documentation is available at `http://127.0.0.1:8000/docs`.

### Frontend

In a second terminal:

```bash
cd frontend
npm ci
VITE_API_URL='http://127.0.0.1:8000' npm start
```

Open `http://localhost:5173`. Set `VITE_API_URL` at build time for deployed builds; do not put credentials in frontend environment variables because Vite embeds `VITE_` variables in public JavaScript.

## Tests and build

From the repository root with the Python environment active:

```bash
python -m unittest discover -s tests
```

From `frontend/`:

```bash
npm run test:ci
npm run build
```

## Repository layout

- `backend/`: FastAPI routes, MongoDB models, and recommendation logic
- `frontend/`: React application and visual assets
- `tests/`: backend unit tests
- `Procfile`: process declaration for compatible application hosts

## Data and deployment notes

The backend stores game selections, calculated tea IDs, timestamps, and display state. It does not implement accounts. Public deployments should add infrastructure-level request size limits, rate limiting, monitoring, backups, and an explicit retention policy. Configure exact CORS origins; never use a wildcard with credentials.

The legacy frontend references public video and product URLs owned by third parties. Check those links, the S3-hosted media, and all commissioned artwork before operating a production deployment.

## Security

Do not post credentials or exploit details in a public issue. Follow the [security policy](.github/SECURITY.md) and use GitHub's private vulnerability reporting form. Include the affected revision and reproduction conditions without real user data.

Automated dependency updates are configured for the Python and npm manifests. A local audit and passing build are still required before merging an update.

## Contributing

This project is not under active feature development. Open an issue before preparing a substantial change, keep pull requests focused, and include the relevant test or build result.

## License

The source code and repository-owned assets are available under the [MIT License](LICENSE). Externally hosted media, linked product content, names, logos, and trademarks remain subject to their respective owners' rights.

Historical commits contain very large deleted media blobs, so a full clone is substantially larger than a source archive of the current revision.
