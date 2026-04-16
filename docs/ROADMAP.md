# BarriePulse — Project Roadmap

**Version:** 1.0  
**Date:** April 15, 2026  
**Methodology:** Agile sprints (2-week cycles)

---

## Timeline Overview

```
Phase 0: Foundation        ██████░░░░░░░░░░░░░░░░░░░░░░░░  Week 1–2
Phase 1: MVP Launch        ░░░░░░██████████░░░░░░░░░░░░░░  Week 3–6
Phase 2: Transit & Life    ░░░░░░░░░░░░░░░░██████░░░░░░░░  Week 7–10
Phase 3: Community & Live  ░░░░░░░░░░░░░░░░░░░░░░██████░░  Week 11–14
Phase 4: Polish & Growth   ░░░░░░░░░░░░░░░░░░░░░░░░░░████  Week 15–16
```

**Target MVP Launch: Week 6 (~end of May 2026)**  
**Full Feature Launch: Week 14 (~mid-July 2026)**

---

## Phase 0: Foundation (Week 1–2)

> Set up the project, verify data sources, build the skeleton.

### Sprint 0 — Setup & Verification

| Task | Owner | Est. | Status |
|------|-------|------|--------|
| Register domain (barriepulse.ca) | PM | 1h | ☐ |
| Set up GitHub repository | Dev | 1h | ☐ |
| Initialize Next.js project with TypeScript + Tailwind | Dev | 2h | ☐ |
| Set up Vercel deployment (dev + preview + prod) | Dev | 2h | ☐ |
| Set up Vercel KV (Redis) | Dev | 1h | ☐ |
| Configure ESLint + Prettier + Vitest | Dev | 2h | ☐ |
| **Verify all P0 data sources** (see DATA-SOURCES.md checklist) | Dev | 8h | ☐ |
| Register for GO Transit API key (Metrolinx) | PM | 1h | ☐ |
| Contact City of Barrie re: Barrie Transit GTFS-RT availability | PM | 1h | ☐ |
| Contact RVH re: ER data partnership (nice-to-have) | PM | 1h | ☐ |
| Design logo + favicon + OG image | Design | 4h | ☐ |
| Build base layout (Header, Section, Footer components) | Dev | 4h | ☐ |
| Build base Card component with pin functionality | Dev | 4h | ☐ |
| Build Skeleton loading component | Dev | 2h | ☐ |
| Set up mock data for all P0 features | Dev | 4h | ☐ |
| Create .env.example with all required vars | Dev | 1h | ☐ |

**Deliverable:** Empty dashboard shell deployed to Vercel, all P0 data sources verified, mock data available.

---

## Phase 1: MVP Launch (Week 3–6)

> Build all P0 features. Ship a usable product.

### Sprint 1 — Weather + Right Now (Week 3–4)

| Task | Feature ID | Est. | Status |
|------|-----------|------|--------|
| Build Environment Canada weather fetcher + parser | F-100 | 6h | ☐ |
| Build WeatherCard component | F-100 | 4h | ☐ |
| Build AQHI fetcher + AirQualityCard | F-101 | 4h | ☐ |
| Build UV index into weather fetcher + UVIndexCard | F-102 | 2h | ☐ |
| Build sunrise/sunset fetcher + DaylightCard | F-103 | 2h | ☐ |
| Build "Right Now" section layout | — | 2h | ☐ |
| Set up Vercel cron for weather (every 15 min) | — | 2h | ☐ |
| Build cron route handler with CRON_SECRET auth | — | 2h | ☐ |
| Build Vercel KV cache read/write helpers | — | 3h | ☐ |
| Build SWR polling hook (usePolling) | — | 2h | ☐ |
| Build Timestamp component ("just now", "5 min ago") | — | 1h | ☐ |
| Write tests for weather parser | — | 2h | ☐ |

**Deliverable:** Live weather dashboard with air quality, UV, sunrise/sunset.

### Sprint 2 — News + ER + Roads + Schools (Week 5–6)

| Task | Feature ID | Est. | Status |
|------|-----------|------|--------|
| Build CBC RSS fetcher + filter for Barrie | F-500 | 4h | ☐ |
| Build City of Barrie news fetcher | F-501 | 4h | ☐ |
| Build NewsCard component (tabbed: CBC / City) | F-500/501 | 4h | ☐ |
| Build RVH ER scraper with cheerio | F-600 | 6h | ☐ |
| Build ERWaitCard component | F-600 | 3h | ☐ |
| Build Ontario 511 road conditions fetcher + Barrie filter | F-202 | 6h | ☐ |
| Build RoadConditionsCard with ShowMore | F-202 | 4h | ☐ |
| Build school closure fetchers (SCDSB + SMCDSB) | F-402 | 6h | ☐ |
| Build SchoolsCard with time-aware display | F-402 | 3h | ☐ |
| Build curbside collection logic (zone-based schedule) | F-401 | 6h | ☐ |
| Build CollectionCard | F-401 | 3h | ☐ |
| Build events fetcher (City of Barrie calendar) | F-300 | 4h | ☐ |
| Build EventsCard | F-300 | 3h | ☐ |
| Set up all cron jobs for Sprint 2 features | — | 3h | ☐ |
| Build CardErrorBoundary for graceful failures | — | 2h | ☐ |
| Build Welcome Banner with date/time | F-801 | 2h | ☐ |
| SEO: metadata, OG tags, favicon | — | 2h | ☐ |
| Mobile responsiveness pass | — | 4h | ☐ |
| Cross-browser testing | — | 3h | ☐ |
| **MVP internal review + bug fixes** | — | 4h | ☐ |

**Deliverable: 🚀 MVP LAUNCH** — Weather, news, ER wait times, roads, schools, collection, events.

### MVP Launch Checklist

- [ ] All P0 features functional
- [ ] Mobile responsive
- [ ] Lighthouse Performance > 85
- [ ] WCAG 2.1 AA basic compliance
- [ ] Error boundaries on all cards
- [ ] Stale data indicators working
- [ ] OG image + metadata for social sharing
- [ ] Domain pointed to Vercel
- [ ] SSL certificate active
- [ ] Analytics (Plausible) set up

---

## Phase 2: Transit & Daily Life (Week 7–10)

> Add transit features (the killer differentiator), gas prices, and personalization.

### Sprint 3 — GO Train + Barrie Transit (Week 7–8)

| Task | Feature ID | Est. | Status |
|------|-----------|------|--------|
| Build GO Transit GTFS-RT fetcher (protobuf parsing) | F-200 | 8h | ☐ |
| Build GOTrainCard (next 3 departures, delays) | F-200 | 6h | ☐ |
| Build Barrie Transit integration (GTFS-RT or fallback) | F-201 | 6h | ☐ |
| Build BarrieTransitCard | F-201 | 4h | ☐ |
| Build "Getting Around" section | — | 2h | ☐ |
| Build gas prices fetcher | F-400 | 4h | ☐ |
| Build GasPricesCard | F-400 | 3h | ☐ |
| Build BarrieToday RSS fetcher | F-502 | 3h | ☐ |
| Add BarrieToday tab to NewsCard | F-502 | 2h | ☐ |
| Build bus cancellation fetcher (SCSTC) | F-402 | 4h | ☐ |
| Integrate bus cancellations into SchoolsCard | F-402 | 2h | ☐ |

**Deliverable:** Live GO Train departures, Barrie Transit info, gas prices.

### Sprint 4 — Personalization + Essentials (Week 9–10)

| Task | Feature ID | Est. | Status |
|------|-----------|------|--------|
| Build usePinnedCards hook (localStorage) | F-800 | 4h | ☐ |
| Build PinButton component | F-800 | 2h | ☐ |
| Build MyBarrieSection (pinned cards area) | F-800 | 4h | ☐ |
| Add pin functionality to all existing cards | F-800 | 3h | ☐ |
| Build Lake Simcoe water level fetcher | F-104 | 6h | ☐ |
| Build LakeCard with sparkline | F-104 | 4h | ☐ |
| Build Sparkline chart component | — | 3h | ☐ |
| Build fire ban status fetcher | F-105 | 3h | ☐ |
| Build FireBanCard | F-105 | 2h | ☐ |
| Build skating schedule fetcher | F-301 | 4h | ☐ |
| Build SkatingCard | F-301 | 2h | ☐ |
| Build swimming schedule fetcher | F-302 | 4h | ☐ |
| Build SwimmingCard | F-302 | 2h | ☐ |
| Build flyer links card | F-403 | 2h | ☐ |
| Performance optimization pass | — | 4h | ☐ |

**Deliverable:** Full personalization, lake data, recreation schedules, all essentials.

---

## Phase 3: Community & Live (Week 11–14)

> Add webcams, seasonal features, health info, and community features.

### Sprint 5 — Webcams + Health + Downtown (Week 11–12)

| Task | Feature ID | Est. | Status |
|------|-----------|------|--------|
| Build webcam integration (City Hall cam) | F-700 | 4h | ☐ |
| Build WebcamCard with auto-refresh | F-700 | 4h | ☐ |
| Build walk-in clinic fetcher (Medimap or static) | F-601 | 6h | ☐ |
| Build WalkInClinicCard | F-601 | 3h | ☐ |
| Build water advisory fetcher | F-602 | 4h | ☐ |
| Build WaterAdvisoryCard | F-602 | 2h | ☐ |
| Build downtown Barrie updates card | F-603 | 4h | ☐ |
| Build parking / winter ban card | F-203 | 3h | ☐ |
| Build Simcoe County news fetcher | F-503 | 3h | ☐ |

**Deliverable:** Live webcams, health info, downtown updates.

### Sprint 6 — Seasonal Features + Sports (Week 13–14)

| Task | Feature ID | Est. | Status |
|------|-----------|------|--------|
| Build beach water quality fetcher (seasonal) | F-604 | 4h | ☐ |
| Build BeachCard with seasonal visibility | F-604 | 3h | ☐ |
| Build useSeasonalVisibility hook | — | 2h | ☐ |
| Build snow plow tracker integration (if data available) | F-404 | 6h | ☐ |
| Build SnowPlowCard with seasonal visibility | F-404 | 3h | ☐ |
| Build Barrie Colts schedule card | F-304 | 4h | ☐ |
| Build Farmers' Market card | F-303 | 2h | ☐ |
| Build Barrie fun facts rotation for welcome banner | F-801 | 2h | ☐ |
| Accessibility audit (WCAG 2.1 AA) | — | 6h | ☐ |
| Accessibility fixes | — | 4h | ☐ |

**Deliverable: 🚀 FULL LAUNCH** — All features live, seasonal logic active.

---

## Phase 4: Polish & Growth (Week 15–16)

> Optimize, test, and prepare for community launch.

### Sprint 7 — Polish (Week 15–16)

| Task | Est. | Status |
|------|------|--------|
| Lighthouse optimization (target > 90 all categories) | 4h | ☐ |
| Load testing (simulate 1000 concurrent users) | 3h | ☐ |
| End-to-end tests for critical paths (Playwright) | 8h | ☐ |
| Error monitoring setup (Vercel / Sentry free tier) | 3h | ☐ |
| Data source health monitoring dashboard | 4h | ☐ |
| Write FAQ / About page | 2h | ☐ |
| Social media assets (share images, descriptions) | 2h | ☐ |
| Submit to r/barrie, Barrie Facebook groups | 1h | ☐ |
| Pitch to BarrieToday for coverage | 1h | ☐ |
| Pitch to City of Barrie for partnership/endorsement | 1h | ☐ |
| Set up feedback form (simple Google Form or Tally) | 1h | ☐ |
| Documentation cleanup | 2h | ☐ |

**Deliverable:** Production-ready, community launch.

---

## Post-Launch Roadmap (v2+)

| Feature | Target | Notes |
|---------|--------|-------|
| Push notifications (PWA) | v2 (Month 3) | School closures, ER wait thresholds, transit alerts |
| Barrie neighbourhood selector | v2 (Month 3) | Customize based on area (South Barrie, North, Downtown) |
| Historical data / trends | v2 (Month 4) | "Weather this week", "ER wait time trends" |
| French language support | v2 (Month 4) | Evaluate demand from francophone community |
| Native mobile app (PWA install) | v2 (Month 3) | PWA "Add to Home Screen" prompt |
| Dark mode | v2 (Month 3) | System preference + toggle |
| Widget / embed for other sites | v3 (Month 6) | Embeddable ER wait or weather widget |
| Email digest | v3 (Month 6) | Daily morning briefing email |
| Partner dashboard | v3+ | Offer data dashboard to City of Barrie, RVH, etc. |

---

## Team & Roles

| Role | Responsibilities | Est. Hours/Week |
|------|-----------------|-----------------|
| **Project Manager** | Requirements, stakeholder comms, sprint planning, launch marketing | 10h |
| **Frontend Developer** | Next.js UI, components, responsive design | 25h |
| **Backend Developer** | API routes, fetchers, cron jobs, caching, scraping | 25h |
| **Designer** | Logo, UI mockups, icon set, social assets | 8h (Phase 0–1), 4h after |
| **QA / Testing** | Manual + automated testing, accessibility audit | 8h (Phase 3–4) |

> For a solo developer: phases will take ~2x the timeline. Focus on MVP only first.

---

## Budget Estimate (Minimal)

| Item | Cost | Notes |
|------|------|-------|
| Domain (barriepulse.ca) | $15/year | .ca domain |
| Vercel Hobby plan | $0/month | Free tier covers MVP traffic |
| Vercel KV (Redis) | $0/month | Free tier: 30K requests/day |
| Vercel Pro (if needed) | $20/month | If traffic exceeds hobby limits |
| Plausible Analytics | $0–9/month | Self-hosted free, cloud $9/mo |
| **Total (year 1)** | **$15–$250** | Extremely low cost |

---

## Risk-Adjusted Timeline

| Scenario | MVP Launch | Full Launch |
|----------|-----------|-------------|
| **Optimistic** (full-time, no blockers) | Week 5 | Week 12 |
| **Realistic** (part-time, some source issues) | Week 8 | Week 16 |
| **Pessimistic** (solo dev, API issues, scope creep) | Week 12 | Week 20 |

---

## Key Milestones

| Milestone | Target Date | Success Criteria |
|-----------|-------------|------------------|
| M0: Project setup complete | End of Week 2 | Repo, Vercel, data sources verified |
| M1: First live card (weather) | End of Week 3 | Weather card showing real Barrie data |
| M2: MVP Launch | End of Week 6 | 10 core features live, mobile-ready |
| M3: Transit features live | End of Week 8 | GO Train + Barrie Transit working |
| M4: Full feature launch | End of Week 14 | All features, all sections complete |
| M5: Community launch | End of Week 16 | r/barrie post, social media, press pitch |
| M6: 1,000 daily users | Month 3 | Organic growth milestone |
| M7: 5,000 daily users | Month 6 | Growth target |
