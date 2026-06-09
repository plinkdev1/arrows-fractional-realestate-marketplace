<div align="center">

# Arrows

**An AI-powered fractional real-estate marketplace**

[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Status](https://img.shields.io/badge/status-MVP-orange)]()

*Browse properties, buy fractional shares, and track a portfolio - with AI-assisted valuation.*

</div>

---

## What Is This?

Arrows is an AI-powered fractional real-estate marketplace. Investors browse property offerings, buy fractional shares, and track holdings and returns from a portfolio dashboard, with AI assisting valuation and insights.

---

## Features

| Feature | Description | Status |
|---|---|:---:|
| Property listings | Browse tokenized real-estate offerings | ✅ |
| Fractional shares | Buy fractions of a property | 🚧 |
| AI insights | AI-assisted valuation and analysis | 🚧 |
| Investor dashboard | Portfolio, holdings, returns | 🚧 |
| On-chain settlement | Tokenized ownership records | Roadmap |

---

## How It Works

```
Listings ──▶ fractional shares (tokenized property)
    │
    ▼
AI valuation + insights
    │
    ▼
Investor dashboard (portfolio · returns)
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Vite, React, TypeScript |
| Styling | Tailwind CSS |
| Auth / Data | Supabase |
| AI | Valuation and insights layer |

---

## Project Structure

```
arrows/
.bolt/
   config.json
   prompt
src/
   components/
   contexts/
   lib/
   pages/
   App.tsx
   index.css
supabase/
   migrations/
.gitignore
COMPLIANCE_IMPLEMENTATION.md
DASHBOARD_GUIDE.md
eslint.config.js
IMPLEMENTATION_COMPLETE.md
index.html
package.json
package-lock.json
postcss.config.js
tailwind.config.js
TEST_USERS_SETUP.sql
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
```

---

## Screenshots

_Screenshots coming soon._

---

## Getting Started

```bash
npm install
npm run dev
```

Environment variables (names only - never commit real values):

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

---

## Roadmap

- Live fractional purchase flow
- AI valuation engine
- On-chain ownership settlement

---

## Notes

Shared as a portfolio artifact demonstrating product and system design. Early prototype, not a finished product.

<div align="center">

MIT

</div>
