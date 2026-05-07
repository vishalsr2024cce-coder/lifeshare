# LifeShare - Run Locally (Windows)

## Prereqs
- Node.js (npm available)
- MongoDB Atlas is configured via `server/.env` (or the app will run in demo mode if `MONGO_URI` is missing)

## One-command start
From repo root:
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\start.ps1
```

This will:
1) `npm install` in `server/` and `client/` (if needed)
2) build the React frontend (`client/dist`)
3) start the backend on **http://localhost:5000**

## Manual start
**Backend**:
```powershell
cd server
npm install
npm run dev
```
Backend listens on **http://localhost:5000** and serves the built frontend from `client/dist`.

**Frontend (dev server)** (optional):
```powershell
cd client
npm install
npm run dev
```

## Verify
- Backend homepage should respond with HTML:
  - http://localhost:5000
- API endpoints:
  - http://localhost:5000/api/requests
  - http://localhost:5000/api/donors

