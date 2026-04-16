# BarriePulse — Technical Specification

**Version:** 1.0  
**Date:** April 15, 2026

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                     BROWSER (Client)                     │
│  ┌──────────┐  ┌──────────┐  ┌───────────────────────┐  │
│  │ Next.js  │  │   SWR    │  │   localStorage        │  │
│  │ React UI │◄─┤ Polling  │  │   (My Barrie pins)    │  │
│  └──────────┘  └────┬─────┘  └───────────────────────┘  │
└─────────────────────┼───────────────────────────────────┘
                      │ HTTP (JSON)
┌─────────────────────┼───────────────────────────────────┐
│              VERCEL (Server)                              │
│  ┌──────────────────┴──────────────────────────────┐     │
│  │            Next.js API Routes / Route Handlers   │     │
│  │   /api/weather  /api/transit  /api/er  /api/news │     │
│  └──────────────────┬──────────────────────────────┘     │
│                     │                                     │
│  ┌──────────────────┴──────────────────────────────┐     │
│  │              Vercel KV (Redis Cache)             │     │
│  │   weather:current  transit:go  er:rvh  news:cbc  │     │
│  └──────────────────┬──────────────────────────────┘     │
│                     │                                     │
│  ┌──────────────────┴──────────────────────────────┐     │
│  │           Vercel Cron Jobs (Background)          │     │
│  │   Fetch from external sources on schedule        │     │
│  │   Write to KV cache with TTL                     │     │
│  └──────────────────┬──────────────────────────────┘     │
└─────────────────────┼───────────────────────────────────┘
                      │
        ┌─────────────┼──────────────┐
        │    EXTERNAL DATA SOURCES   │
        │                            │
        │  • Environment Canada      │
        │  • Ontario 511             │
        │  • RVH ER page             │
        │  • Metrolinx GTFS-RT       │
        │  • Barrie Transit GTFS-RT  │
        │  • City of Barrie feeds    │
        │  • CBC RSS                 │
        │  • SCDSB/SMCDSB feeds      │
        │  • GasBuddy                │
        │  • Medimap                 │
        └────────────────────────────┘
```

---

## 2. Tech Stack Details

### 2.1 Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 14.x+ | React framework with App Router, Server Components, API routes |
| React | 18.x+ | UI library |
| Tailwind CSS | 3.x | Utility-first styling |
| SWR | 2.x | Client-side data fetching with polling, caching, revalidation |
| Lucide React | latest | Icon library (clean, consistent) |
| date-fns | latest | Date formatting/manipulation |
| recharts | latest | Sparkline charts (water level, etc.) |

### 2.2 Backend / Infrastructure

| Technology | Purpose |
|-----------|---------|
| Vercel | Hosting, edge functions, cron jobs |
| Vercel KV (Redis) | Server-side data cache |
| Vercel Cron | Scheduled data fetching from external sources |

### 2.3 Development Tools

| Tool | Purpose |
|------|---------|
| TypeScript | Type safety across the project |
| ESLint | Code quality |
| Prettier | Code formatting |
| Vitest | Unit testing |
| Playwright | E2E testing |

---

## 3. Project Structure

```
barriepulse/
├── docs/                          # Project documentation
│   ├── PRD.md
│   ├── TECH-SPEC.md
│   ├── DATA-SOURCES.md
│   ├── ROADMAP.md
│   └── UI-SPEC.md
├── public/
│   ├── favicon.ico
│   ├── og-image.png               # Social sharing image
│   └── icons/                     # Weather icons, category icons
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (metadata, fonts, analytics)
│   │   ├── page.tsx               # Main dashboard page
│   │   ├── globals.css            # Tailwind base + custom styles
│   │   └── api/
│   │       ├── weather/
│   │       │   └── route.ts       # GET /api/weather
│   │       ├── air-quality/
│   │       │   └── route.ts       # GET /api/air-quality
│   │       ├── lake/
│   │       │   └── route.ts       # GET /api/lake
│   │       ├── transit/
│   │       │   ├── go/
│   │       │   │   └── route.ts   # GET /api/transit/go
│   │       │   └── barrie/
│   │       │       └── route.ts   # GET /api/transit/barrie
│   │       ├── roads/
│   │       │   └── route.ts       # GET /api/roads
│   │       ├── er/
│   │       │   └── route.ts       # GET /api/er
│   │       ├── news/
│   │       │   └── route.ts       # GET /api/news
│   │       ├── schools/
│   │       │   └── route.ts       # GET /api/schools
│   │       ├── collection/
│   │       │   └── route.ts       # GET /api/collection
│   │       ├── events/
│   │       │   └── route.ts       # GET /api/events
│   │       ├── gas/
│   │       │   └── route.ts       # GET /api/gas
│   │       └── cron/
│   │           └── route.ts       # POST /api/cron (Vercel cron handler)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx         # Site header with time, date
│   │   │   ├── Footer.tsx         # Credits, links
│   │   │   ├── Section.tsx        # Reusable section wrapper
│   │   │   └── SectionNav.tsx     # Section tab navigation
│   │   ├── cards/
│   │   │   ├── WeatherCard.tsx
│   │   │   ├── AirQualityCard.tsx
│   │   │   ├── UVIndexCard.tsx
│   │   │   ├── DaylightCard.tsx
│   │   │   ├── LakeCard.tsx
│   │   │   ├── FireBanCard.tsx
│   │   │   ├── GOTrainCard.tsx
│   │   │   ├── BarrieTransitCard.tsx
│   │   │   ├── RoadConditionsCard.tsx
│   │   │   ├── ParkingCard.tsx
│   │   │   ├── EventsCard.tsx
│   │   │   ├── SkatingCard.tsx
│   │   │   ├── SwimmingCard.tsx
│   │   │   ├── FarmersMarketCard.tsx
│   │   │   ├── ColtsCard.tsx
│   │   │   ├── GasPricesCard.tsx
│   │   │   ├── CollectionCard.tsx
│   │   │   ├── SchoolsCard.tsx
│   │   │   ├── FlyersCard.tsx
│   │   │   ├── SnowPlowCard.tsx
│   │   │   ├── NewsCard.tsx
│   │   │   ├── ERWaitCard.tsx
│   │   │   ├── WalkInClinicCard.tsx
│   │   │   ├── WaterAdvisoryCard.tsx
│   │   │   ├── DowntownCard.tsx
│   │   │   ├── BeachCard.tsx
│   │   │   └── WebcamCard.tsx
│   │   ├── ui/
│   │   │   ├── Card.tsx           # Base card component (pinnable)
│   │   │   ├── PinButton.tsx      # Pin/unpin toggle
│   │   │   ├── Badge.tsx          # Status badges
│   │   │   ├── Sparkline.tsx      # Mini chart component
│   │   │   ├── Timestamp.tsx      # "just now", "5 min ago"
│   │   │   ├── ShowMore.tsx       # Expandable list
│   │   │   └── Skeleton.tsx       # Loading skeleton
│   │   └── sections/
│   │       ├── MyBarrieSection.tsx # Pinned cards
│   │       ├── RightNowSection.tsx
│   │       ├── GettingAroundSection.tsx
│   │       ├── AroundTownSection.tsx
│   │       ├── EssentialsSection.tsx
│   │       ├── NewsSection.tsx
│   │       ├── CityInfoSection.tsx
│   │       └── LiveFeedsSection.tsx
│   ├── hooks/
│   │   ├── usePolling.ts          # SWR wrapper with configurable intervals
│   │   ├── usePinnedCards.ts      # localStorage pin management
│   │   └── useSeasonalVisibility.ts  # Show/hide seasonal features
│   ├── lib/
│   │   ├── cache.ts               # Vercel KV read/write helpers
│   │   ├── fetchers/
│   │   │   ├── weather.ts         # Environment Canada fetcher + parser
│   │   │   ├── air-quality.ts
│   │   │   ├── lake.ts
│   │   │   ├── go-transit.ts      # GTFS-RT parser
│   │   │   ├── barrie-transit.ts
│   │   │   ├── roads.ts           # Ontario 511 parser
│   │   │   ├── er.ts              # RVH page scraper
│   │   │   ├── news.ts            # RSS feed parser
│   │   │   ├── schools.ts         # School board feed parser
│   │   │   ├── collection.ts      # Curbside schedule logic
│   │   │   ├── events.ts
│   │   │   └── gas.ts
│   │   ├── constants.ts           # Poll intervals, cache TTLs, station IDs
│   │   └── utils.ts               # Shared utilities
│   └── types/
│       ├── weather.ts
│       ├── transit.ts
│       ├── news.ts
│       └── index.ts               # Shared types
├── .env.example                   # Required env vars template
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json                    # Cron job configuration
├── package.json
└── README.md
```

---

## 4. Data Flow

### 4.1 Cron-Based Fetching (Server → Cache)

External data sources are **never called directly from the client**. Instead:

1. **Vercel Cron Jobs** run on a schedule (configured in `vercel.json`)
2. Each cron job calls the appropriate **fetcher** in `src/lib/fetchers/`
3. Fetchers parse the external data into a normalized JSON format
4. Normalized data is **written to Vercel KV** with a TTL

```json
// vercel.json
{
  "crons": [
    { "path": "/api/cron?source=weather",    "schedule": "*/15 * * * *" },
    { "path": "/api/cron?source=air-quality", "schedule": "0 * * * *" },
    { "path": "/api/cron?source=roads",       "schedule": "*/5 * * * *" },
    { "path": "/api/cron?source=er",          "schedule": "*/5 * * * *" },
    { "path": "/api/cron?source=go-transit",  "schedule": "*/2 * * * *" },
    { "path": "/api/cron?source=news",        "schedule": "*/30 * * * *" },
    { "path": "/api/cron?source=schools",     "schedule": "*/15 6-9 * * 1-5" },
    { "path": "/api/cron?source=events",      "schedule": "0 */6 * * *" },
    { "path": "/api/cron?source=gas",         "schedule": "0 */6 * * *" },
    { "path": "/api/cron?source=collection",  "schedule": "0 6 * * 0" }
  ]
}
```

### 4.2 API Routes (Cache → Client)

API routes read from **Vercel KV cache only** — they never call external sources directly.

```typescript
// Example: /api/weather/route.ts
import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await kv.get('weather:current');
  if (!data) {
    return NextResponse.json({ error: 'temporarily unavailable' }, { status: 503 });
  }
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' }
  });
}
```

### 4.3 Client Polling (Client → API)

Each card uses SWR with a polling interval matched to data freshness needs:

```typescript
// Example: WeatherCard.tsx
const { data, error, isLoading } = useSWR('/api/weather', fetcher, {
  refreshInterval: 60_000,  // poll every 60 seconds
  dedupingInterval: 30_000,
});
```

### 4.4 Polling Intervals by Data Type

| Data Source | Cron Frequency | Client Poll | Cache TTL |
|------------|----------------|-------------|-----------|
| Weather | Every 15 min | 60s | 20 min |
| Air Quality | Every 60 min | 5 min | 90 min |
| GO Transit | Every 2 min | 30s | 3 min |
| Barrie Transit | Every 2 min | 60s | 3 min |
| Road Conditions | Every 5 min | 2 min | 10 min |
| ER Wait Times | Every 5 min | 60s | 10 min |
| News | Every 30 min | 5 min | 45 min |
| Schools | Every 15 min (6–9am weekdays) | 2 min | 20 min |
| Events | Every 6 hours | 30 min | 7 hours |
| Gas Prices | Every 6 hours | 30 min | 7 hours |
| Collection | Weekly | 24 hours | 8 days |

---

## 5. Caching Strategy

### 5.1 Three-Layer Cache

```
Browser ─────► SWR Cache (in-memory) ─── fastest, client-side
    │
    ▼
Vercel Edge ──► HTTP Cache (CDN) ──────── s-maxage headers
    │
    ▼
Vercel KV ────► Redis Cache ───────────── source of truth for API routes
```

### 5.2 Stale Data Handling

Every cached item includes a `fetchedAt` timestamp. The UI uses this to:
- Show "just now" / "5 min ago" on each card
- Show a ⚠️ warning if data is significantly stale (> 2x expected refresh interval)
- Never show completely broken UI — always show last known good data

```typescript
interface CachedData<T> {
  data: T;
  fetchedAt: string;      // ISO timestamp
  source: string;          // e.g., "Environment Canada"
  nextRefresh: string;     // expected next cron run
}
```

---

## 6. Error Handling

### 6.1 Principles
- **Individual card failure never breaks the page.** Each card is independently rendered with its own error boundary.
- **Graceful degradation:** Show last cached data with a "stale" indicator rather than an error state.
- **Fallback chain:** Live data → Cached data → "Temporarily unavailable" message

### 6.2 Error Boundary per Card

```typescript
// Each card wrapped in error boundary
<CardErrorBoundary cardName="Weather">
  <WeatherCard />
</CardErrorBoundary>
```

### 6.3 Monitoring

- Vercel deployment alerts for failed cron jobs
- Log external API failures with source, status code, response time
- Weekly health check report: which sources had failures, avg response times

---

## 7. SEO & Social Sharing

### 7.1 Metadata
```typescript
export const metadata: Metadata = {
  title: 'BarriePulse — Barrie, right now.',
  description: 'Real-time dashboard for Barrie, Ontario. Weather, GO Train, ER wait times, road conditions, transit, events, and city updates — all in one place.',
  openGraph: {
    title: 'BarriePulse',
    description: 'Barrie, right now.',
    url: 'https://barriepulse.ca',
    siteName: 'BarriePulse',
    locale: 'en_CA',
    type: 'website',
  },
};
```

### 7.2 Server-Side Rendering
- Initial page render is server-side (Next.js Server Components) with current cached data
- Client-side SWR takes over for live polling
- Result: fast first paint + live updates

---

## 8. Security Considerations

| Concern | Mitigation |
|---------|-----------|
| API key exposure | All external API calls happen server-side in cron jobs; no keys exposed to client |
| XSS from external data | All RSS/HTML content sanitized before rendering (DOMPurify for any HTML) |
| Rate limiting | Cron jobs are our only callers of external APIs; client only hits our cached API routes |
| DDoS on our API routes | Vercel edge caching + rate limiting middleware |
| Scraping abuse | Add CRON_SECRET env var to protect cron endpoints |
| Data injection | All external data validated with Zod schemas before caching |

---

## 9. Environment Variables

```env
# .env.example

# Vercel KV (Redis)
KV_REST_API_URL=
KV_REST_API_TOKEN=
KV_REST_API_READ_ONLY_TOKEN=

# Cron security
CRON_SECRET=

# GO Transit (Metrolinx)
GO_TRANSIT_API_KEY=

# Optional: Medimap (walk-in clinics)
MEDIMAP_API_KEY=

# Optional: Analytics (self-hosted Plausible)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=barriepulse.ca
```

---

## 10. Deployment

### 10.1 Environments
| Environment | URL | Purpose |
|------------|-----|---------|
| Development | localhost:3000 | Local dev with mock data |
| Preview | *.vercel.app | PR preview deployments |
| Production | barriepulse.ca | Live site |

### 10.2 CI/CD
- Push to `main` → auto-deploy to production via Vercel
- Push to any branch → preview deployment
- Run lint + type check + tests on every PR

### 10.3 Mock Data for Development
- `src/lib/fetchers/` each have a `mock.ts` file with sample data
- `NEXT_PUBLIC_USE_MOCKS=true` enables mock mode for local development without hitting real APIs
