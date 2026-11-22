# Tim's Welding & Fabrication — Production Website

A complete, production-ready website for Tim's Welding & Fabrication, a North Texas welding and metal fabrication company.

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Backend**: Go + Gin Framework
- **Database**: PostgreSQL 16
- **Deployment**: Docker Compose

## Quick Start (Docker)

```bash
# Start PostgreSQL + Backend
docker compose up -d

# Build & start Frontend
cd frontend
npm install
npm start
```

The app will be available at:
- Frontend: http://localhost:8081
- Backend API: http://localhost:8082

## Development Setup

### Backend (Go)
```bash
cd backend
go mod tidy
go run main.go
```

### Frontend (React)
```bash
cd frontend
npm install
npm start
```

### Database
```bash
psql -U postgres -d timswelding -f database/schema.sql
```

## Project Structure

```
tims-welding-website/
├── backend/
│   ├── main.go            # Go server entry point
│   ├── handlers.go        # API handlers
│   ├── Dockerfile
│   └── .env.example
├── database/
│   └── schema.sql         # PostgreSQL schema
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.tsx
│       ├── App.tsx
│       ├── App.css
│       ├── types.ts
│       ├── services/
│       │   └── api.ts
│       ├── components/
│       │   ├── Header.tsx
│       │   ├── Footer.tsx
│       │   ├── HeroSection.tsx
│       │   ├── ServicesSection.tsx
│       │   ├── WhyChooseUs.tsx
│       │   ├── Testimonials.tsx
│       │   ├── GalleryPreview.tsx
│       │   └── CTA.tsx
│       └── pages/
│           ├── Home.tsx
│           ├── About.tsx
│           ├── GetQuote.tsx
│           ├── Contact.tsx
│           └── Gallery.tsx
├── docker-compose.yml
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/health | Health check |
| GET | /api/v1/services | List all services |
| GET | /api/v1/gallery | List gallery items (filter: ?category=) |
| POST | /api/v1/quote | Submit a quote request |
| GET | /api/v1/quotes | List all quotes (filter: ?status=) |
| PUT | /api/v1/quotes/:id | Update quote status |

## Deployment

1. Update `.env` with production database credentials
2. Build Docker images: `docker compose build`
3. Run: `docker compose up -d`
4. Configure domain DNS to point to your server
5. Set `ALLOWED_ORIGINS` in `.env` to your production domain

### GitHub Pages (frontend only)

The workflow in `.github/workflows/deploy.yml` builds and deploys the React site
when changes are pushed to `main` (or when manually triggered from the Actions
tab). In the repository settings, go to **Pages** and set the build and
deployment source to **GitHub Actions**.

GitHub Pages hosts only the static frontend; it does not run the Go API or
PostgreSQL database. To use features that submit quote requests, deploy the
backend and database separately, then create a repository variable named
`REACT_APP_API_URL` under **Settings → Secrets and variables → Actions** with
the backend API URL (for example, `https://api.example.com/api/v1`). Also allow
the Pages site origin in the backend's `ALLOWED_ORIGINS` setting. If your
default branch is not `main`, update the workflow trigger to match it.

## Design

- **Colors**: Black (#1a1a1a), Steel Gray (#2d2d3f), White (#ffffff), Welding Blue (#4a90d9)
- **Style**: Industrial, professional, clean, modern
- **Responsive**: Mobile, tablet, and desktop breakpoints

## SEO

Meta tags include: North Texas welding, metal fabrication, structural steel fabrication, welding repair services, custom welding, ranch welding, commercial welding.
