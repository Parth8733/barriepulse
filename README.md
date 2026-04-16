# BarriePulse

**Barrie, right now.**

BarriePulse is a real-time, single-page community dashboard for Barrie, Ontario. It aggregates live local data — weather, lake levels, ER wait times, transit, road conditions, news, events, and city services — into one clean, fast, ad-free interface.

Inspired by [FreddyFeed.ca](https://freddyfeed.ca) (Fredericton, NB) but purpose-built for what matters to Barrie residents: GO Train commutes, Lake Simcoe conditions, winter operations, and healthcare access.

---

## Why BarriePulse?

Barrie residents currently bounce between 10+ websites and apps to get basic daily info:

- **barrie.ca** for city news and recycling schedules
- **weather.gc.ca** for forecasts
- **Ontario 511** for road closures
- **RVH website** for ER wait times
- **GO Transit app** for train schedules
- **BarrieToday** for local news
- **School board sites** for snow days
- **GasBuddy** for fuel prices
- **MyRideBarrie** for bus times

**BarriePulse puts it all in one place.**

---

## Key Features

| Section | What's Included |
|---------|----------------|
| **Right Now** | Weather, air quality, UV index, Lake Simcoe levels, fire ban status |
| **Getting Around** | GO Train departures, Barrie Transit live, road conditions, parking |
| **Around Town** | Events, public skating, swimming, farmers' market |
| **Essentials** | Gas prices, curbside collection, school closures, bus cancellations, flyers |
| **News** | CBC Barrie, City of Barrie, BarrieToday, Simcoe County |
| **City Info** | ER wait times (RVH), walk-in clinics, water advisories, downtown updates |
| **Live Feeds** | Webcams (City Hall, waterfront, downtown) |
| **My Barrie** | Pin/unpin any card to personalize your dashboard |

### Barrie-Specific Extras (beyond FreddyFeed)
- 🚆 **GO Train Tracker** — real-time departures from Allandale Waterfront & Barrie South
- ❄️ **Snow Plow Tracker** — live city plow locations in winter
- 🏖️ **Beach Water Quality** — E. coli levels at Centennial, Minet's Point, Johnson's Beach
- 🏥 **Walk-In Clinic Status** — who's open, who's accepting patients
- 🚌 **Transit Live Map** — Barrie Transit real-time bus positions
- 🅿️ **Winter Parking Ban** — overnight ban alerts
- 🏒 **Barrie Colts** — next game, live scores during OHL season

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14+ (App Router, Server Components) |
| Styling | Tailwind CSS |
| Data Layer | Server-side cron jobs → Redis/Vercel KV cache |
| Hosting | Vercel |
| Real-time | SWR with polling (30s–5min intervals per data type) |
| Personalization | Browser localStorage |

---

## Project Documentation

| Document | Description |
|----------|-------------|
| [Product Requirements (PRD)](docs/PRD.md) | Full feature requirements, user stories, acceptance criteria |
| [Technical Specification](docs/TECH-SPEC.md) | Architecture, APIs, data flow, caching strategy |
| [Data Sources](docs/DATA-SOURCES.md) | Every data source with API endpoints, auth, rate limits |
| [Roadmap](docs/ROADMAP.md) | Phased delivery plan with milestones |
| [UI/UX Specification](docs/UI-SPEC.md) | Layout, components, responsive design, accessibility |

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/your-org/barriepulse.git
cd barriepulse

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in API keys (see docs/DATA-SOURCES.md)

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Status

🟡 **Planning Phase** — Requirements gathered, architecture defined, awaiting development kickoff.

---

## Contributing

This is a community project for Barrie, ON. Contributions welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

## License

MIT — Built for Barrie, by Barrie.
