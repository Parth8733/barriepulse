# BarriePulse — Product Requirements Document (PRD)

**Version:** 1.0  
**Date:** April 15, 2026  
**Author:** Project Manager  
**Status:** Draft

---

## 1. Product Vision

> A single-page, real-time, ad-free dashboard that gives Barrie residents everything they need to know about their city — right now — in one place.

### 1.1 Problem Statement

Barrie residents need to visit 10+ websites daily to get basic information about their city: weather, transit schedules, road closures, school cancellations, ER wait times, events, and news. No single product aggregates this hyper-local, real-time data for Barrie.

### 1.2 Target Users

| User Persona | Key Needs |
|--------------|-----------|
| **Daily Commuter** | GO Train times, road conditions, transit alerts, weather |
| **Parent** | School closures, bus cancellations, event calendar, skating/swimming schedules |
| **Senior** | ER wait times, walk-in clinic availability, weather, news |
| **New Resident** | Curbside collection schedule, city events, transit info, local news |
| **Downtown Worker** | Parking, downtown events, lunch-hour skating, weather |
| **Outdoor Enthusiast** | Lake Simcoe levels, beach water quality, UV index, fire ban status |

### 1.3 Success Metrics

| Metric | Target (6 months) |
|--------|-------------------|
| Daily active users | 5,000 |
| Average session duration | > 45 seconds |
| Return visitor rate | > 60% |
| Page load time | < 2 seconds |
| Lighthouse Performance score | > 90 |

---

## 2. Feature Requirements

### 2.1 RIGHT NOW — Live Conditions

#### F-100: Current Weather
- **Priority:** P0 (Must Have)
- **Description:** Display current temperature, feels-like, humidity, wind speed/direction, conditions icon
- **Data points:** Temperature (°C), feels-like, humidity %, wind km/h + direction, condition text + icon
- **Extras:** High/low for today, tomorrow preview, link to 7-day forecast
- **Update frequency:** Every 15 minutes
- **Acceptance Criteria:**
  - [ ] Shows current Barrie weather with timestamp
  - [ ] Displays feels-like temperature
  - [ ] Shows tomorrow's forecast summary
  - [ ] Links to full 7-day forecast (Environment Canada)

#### F-101: Air Quality Index (AQHI)
- **Priority:** P0
- **Description:** Current AQHI reading with risk level (Low/Moderate/High/Very High)
- **Update frequency:** Every 60 minutes
- **Acceptance Criteria:**
  - [ ] Shows AQHI numeric value + risk category
  - [ ] Color-coded indicator (green/yellow/orange/red)

#### F-102: UV Index
- **Priority:** P0
- **Description:** Current UV index with exposure category
- **Update frequency:** Every 60 minutes
- **Acceptance Criteria:**
  - [ ] Shows UV value + category (Low, Moderate, High, Very High, Extreme)

#### F-103: Sunrise / Sunset & Daylight
- **Priority:** P0
- **Description:** Today's sunrise and sunset times
- **Acceptance Criteria:**
  - [ ] Shows sunrise and sunset time for Barrie
  - [ ] Visual daylight progress bar (optional)

#### F-104: Lake Simcoe / Kempenfelt Bay Water Level
- **Priority:** P1
- **Description:** Current water level in Kempenfelt Bay, rate of change, historical graph (48h)
- **Update frequency:** Every 60 minutes
- **Acceptance Criteria:**
  - [ ] Shows current water level (meters)
  - [ ] Shows change over past 6 hours (rising/falling/stable)
  - [ ] Mini sparkline graph of last 48 hours

#### F-105: Fire Ban Status
- **Priority:** P1
- **Description:** Current open-air fire ban status for City of Barrie
- **Update frequency:** Every 6 hours
- **Acceptance Criteria:**
  - [ ] Shows current status: Open / Restricted / Total Ban
  - [ ] Links to official source

---

### 2.2 GETTING AROUND — Transit & Roads

#### F-200: GO Train Departures
- **Priority:** P0
- **Description:** Next 3 departures from Allandale Waterfront GO and Barrie South GO stations, with real-time delay info
- **Update frequency:** Every 2 minutes
- **Acceptance Criteria:**
  - [ ] Shows next 3 southbound departures from each station
  - [ ] Shows scheduled vs. actual time (if delayed)
  - [ ] Indicates platform/track if available
  - [ ] Shows service alerts affecting Barrie line

#### F-201: Barrie Transit Live
- **Priority:** P1
- **Description:** Next bus times for key routes, service alerts, link to live map
- **Update frequency:** Every 1 minute
- **Acceptance Criteria:**
  - [ ] Shows current service alerts
  - [ ] Links to MyRideBarrie.ca live map
  - [ ] Shows if Transit ON Demand zones are active

#### F-202: Road Conditions & Construction
- **Priority:** P0
- **Description:** Active closures, construction, incidents on Hwy 400, Hwy 11, Hwy 26, Hwy 90, and city roads
- **Update frequency:** Every 5 minutes
- **Acceptance Criteria:**
  - [ ] Shows active highway incidents (Ontario 511)
  - [ ] Shows active city road construction (from City of Barrie)
  - [ ] Each item shows: location, type, severity, expected delay
  - [ ] "Show more" expandable list

#### F-203: Parking
- **Priority:** P2
- **Description:** Downtown parking availability (if data available), winter overnight ban status
- **Update frequency:** Every 15 minutes
- **Acceptance Criteria:**
  - [ ] Shows winter overnight parking ban status (active/not active)
  - [ ] Shows ban time window (typically 2am–6am, Nov 15–Apr 15)

---

### 2.3 AROUND TOWN — Activities & Events

#### F-300: Events Calendar
- **Priority:** P0
- **Description:** Upcoming community events, festivals, concerts, markets
- **Update frequency:** Every 60 minutes
- **Acceptance Criteria:**
  - [ ] Shows next 5 upcoming events
  - [ ] Each event: name, date, venue, link
  - [ ] "Show more" to expand full list
  - [ ] Links open in new tab to source

#### F-301: Public Skating
- **Priority:** P1
- **Description:** Today's public skating sessions at Barrie arenas
- **Update frequency:** Daily
- **Acceptance Criteria:**
  - [ ] Shows today's sessions with arena name and time
  - [ ] Indicates "happening now" if in progress
  - [ ] Hides section in off-season (May–September)

#### F-302: Public Swimming
- **Priority:** P1
- **Description:** Today's public swim sessions at Barrie pools
- **Update frequency:** Daily
- **Acceptance Criteria:**
  - [ ] Shows today's sessions with facility name and time
  - [ ] Indicates "happening now" if in progress

#### F-303: Farmers' Market
- **Priority:** P2
- **Description:** Barrie Farmers' Market schedule and status
- **Update frequency:** Weekly
- **Acceptance Criteria:**
  - [ ] Shows next market date/time
  - [ ] Indicates if market is today
  - [ ] Seasonal visibility (outdoor: May–Oct, indoor: Nov–Apr)

#### F-304: Barrie Colts (OHL)
- **Priority:** P3
- **Description:** Next game info, recent score
- **Update frequency:** Every 30 minutes during game, daily otherwise
- **Acceptance Criteria:**
  - [ ] Shows next game: opponent, date, time, location
  - [ ] During game: live score
  - [ ] Off-season: hidden or shows "Season starts [date]"

---

### 2.4 ESSENTIALS — Daily Needs

#### F-400: Gas Prices
- **Priority:** P1
- **Description:** Current cheapest regular gas price in Barrie, comparison to Ontario average
- **Update frequency:** Every 6 hours
- **Acceptance Criteria:**
  - [ ] Shows cheapest regular price in Barrie area
  - [ ] Shows price trend (up/down/stable vs. yesterday)

#### F-401: Curbside Collection
- **Priority:** P0
- **Description:** What collection is this week (garbage, recycling, organics, yard waste, Christmas tree, etc.)
- **Update frequency:** Daily
- **Acceptance Criteria:**
  - [ ] Shows this week's collection type with icon
  - [ ] Shows what items go in this week's bin
  - [ ] Shows next week preview
  - [ ] Handles holiday schedule changes

#### F-402: School Closures & Bus Cancellations
- **Priority:** P0
- **Description:** School closure and bus cancellation alerts from SCDSB, SMCDSB, and SCSTC
- **Update frequency:** Every 15 minutes (6am–9am critical window), hourly otherwise
- **Acceptance Criteria:**
  - [ ] Shows "All schools open" or lists closures
  - [ ] Shows bus route cancellations separately
  - [ ] Covers: SCDSB, SMCDSB, CSC MonAvenir
  - [ ] After school hours: "School day is over"

#### F-403: Store Flyers
- **Priority:** P2
- **Description:** Links to current weekly flyers for popular Barrie stores
- **Update frequency:** Weekly
- **Acceptance Criteria:**
  - [ ] Shows current flyer links for major stores
  - [ ] Opens in new tab

#### F-404: Snow Plow Tracker
- **Priority:** P2
- **Description:** Live plow map during winter operations, road clearing priority status
- **Update frequency:** Every 5 minutes during active plowing
- **Acceptance Criteria:**
  - [ ] Shows plow map embed or link when active
  - [ ] Shows "No active operations" when not plowing
  - [ ] Winter season only (Nov–Apr)

---

### 2.5 NEWS

#### F-500: CBC Barrie Headlines
- **Priority:** P0
- **Description:** Latest 5 CBC headlines related to Barrie / Simcoe County
- **Update frequency:** Every 30 minutes
- **Acceptance Criteria:**
  - [ ] Shows 5 most recent headlines
  - [ ] Each links to CBC article in new tab
  - [ ] Shows time since published

#### F-501: City of Barrie Official News
- **Priority:** P0
- **Description:** Latest media releases and public notices from barrie.ca
- **Update frequency:** Every 60 minutes
- **Acceptance Criteria:**
  - [ ] Shows 3–5 most recent items
  - [ ] Links to barrie.ca source

#### F-502: BarrieToday Headlines
- **Priority:** P1
- **Description:** Top local stories from BarrieToday
- **Update frequency:** Every 30 minutes
- **Acceptance Criteria:**
  - [ ] Shows 5 most recent local headlines
  - [ ] Links to BarrieToday in new tab

#### F-503: Simcoe County News
- **Priority:** P2
- **Description:** County-level news and decisions
- **Update frequency:** Every 60 minutes

---

### 2.6 CITY INFO

#### F-600: ER Wait Times (RVH)
- **Priority:** P0
- **Description:** Current ER wait time at Royal Victoria Regional Health Centre
- **Update frequency:** Every 5 minutes
- **Acceptance Criteria:**
  - [ ] Shows current estimated wait time
  - [ ] Shows patient volume indicator if available (busy/moderate/light)
  - [ ] Includes link to RVH ER page
  - [ ] Shows "Consider walk-in clinics or call 8-1-1" message

#### F-601: Walk-In Clinic Availability
- **Priority:** P2
- **Description:** Which Barrie walk-in clinics are open and accepting patients
- **Update frequency:** Every 30 minutes
- **Acceptance Criteria:**
  - [ ] Lists open clinics with current wait times (if available via Medimap)
  - [ ] Shows clinic name, address, hours

#### F-602: Water Advisories
- **Priority:** P1
- **Description:** Active boil water advisories, water main breaks, service disruptions
- **Update frequency:** Every 15 minutes
- **Acceptance Criteria:**
  - [ ] Shows "No active advisories" or lists current ones
  - [ ] Each advisory: type, affected area, status

#### F-603: Downtown Barrie Updates
- **Priority:** P2
- **Description:** Downtown BIA news, street closures for events, seasonal activities
- **Update frequency:** Every 6 hours

#### F-604: Beach Water Quality (Seasonal)
- **Priority:** P2
- **Description:** E. coli testing results for Barrie beaches (Centennial, Minet's Point, Johnson's Beach, Tyndale)
- **Update frequency:** Daily during beach season (June–September)
- **Acceptance Criteria:**
  - [ ] Shows each beach: Safe to swim / Advisory posted
  - [ ] Hidden outside beach season

---

### 2.7 LIVE FEEDS

#### F-700: Webcams
- **Priority:** P1
- **Description:** Live webcam feeds from around Barrie
- **Cameras:** City Hall rooftop (confirmed exists), Kempenfelt Bay (TBD), Downtown (TBD)
- **Acceptance Criteria:**
  - [ ] Shows live or near-live camera images
  - [ ] Click to expand full view
  - [ ] Gracefully handles camera offline

---

### 2.8 PERSONALIZATION

#### F-800: My Barrie (Pin Cards)
- **Priority:** P1
- **Description:** Users can pin/unpin any card to a "My Barrie" section at the top of the page
- **Acceptance Criteria:**
  - [ ] Each card has a pin/unpin toggle icon
  - [ ] Pinned cards appear in "My Barrie" section at top
  - [ ] Pins persist across sessions (localStorage)
  - [ ] No login required
  - [ ] Default state: no pins, section hidden
  - [ ] Drag-to-reorder pinned cards (stretch goal)

#### F-801: Welcome Banner
- **Priority:** P1
- **Description:** Welcome message with current date/time, fun Barrie fact of the day
- **Acceptance Criteria:**
  - [ ] Shows current day, date, time
  - [ ] Shows a rotating Barrie trivia fact
  - [ ] Dismissible

---

## 3. Non-Functional Requirements

### 3.1 Performance
| Requirement | Target |
|-------------|--------|
| First Contentful Paint | < 1.2s |
| Largest Contentful Paint | < 2.0s |
| Time to Interactive | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Lighthouse Performance | > 90 |

### 3.2 Accessibility
- WCAG 2.1 AA compliance
- Full keyboard navigation
- Screen reader compatible (ARIA labels on all live-updating regions)
- Minimum contrast ratio 4.5:1
- Reduced motion support

### 3.3 Responsive Design
- Mobile-first: 320px minimum
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Single-column on mobile, multi-column grid on desktop
- Touch-friendly tap targets (minimum 44x44px)

### 3.4 Browser Support
- Chrome 90+, Firefox 90+, Safari 15+, Edge 90+
- iOS Safari 15+, Chrome Android 90+

### 3.5 Reliability
- 99.5% uptime target
- Graceful degradation: if a data source fails, show "temporarily unavailable" for that card only — never break the whole page
- Stale data indicator: show timestamp on each card; highlight if data > 15 min old

### 3.6 Privacy
- No user accounts required
- No tracking cookies
- No third-party analytics (or self-hosted only, e.g., Plausible)
- localStorage for personalization only
- No personal data collected

---

## 4. Out of Scope (v1)

| Feature | Reason |
|---------|--------|
| User accounts / login | Unnecessary complexity for v1 |
| Push notifications | Requires service worker + permissions; v2 feature |
| Mobile app (iOS/Android) | PWA-capable web app is sufficient for v1 |
| User-submitted content | Moderation overhead |
| Advertising system | Keep ad-free to build trust; evaluate later |
| Historical data / charts | Focus on "right now"; add later |
| Multi-language (French) | Evaluate demand; v2 consideration |

---

## 5. Risks & Mitigations

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Data source API changes/breaks | Card shows stale data | Medium | Monitoring + alerts; fallback to last cached value |
| RVH blocks scraping | Lose ER wait times feature | Medium | Reach out to RVH for official partnership; use respectful scraping intervals |
| City of Barrie has no open data for some features | Can't build feature | Low | City has open data portal; file data requests for missing sets |
| Low initial adoption | Project stalls | Medium | Seed via Reddit r/barrie, Facebook groups, local media pitch |
| GO Transit GTFS-RT requires registration | Delays feature | Low | Register early; Metrolinx is generally open-data friendly |
| Winter-only features unused in summer | Wasted development | Low | Seasonal visibility — auto-show/hide based on date |

---

## 6. Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| Environment Canada API access | Environment Canada | ✅ Public, no key needed |
| Ontario 511 API access | MTO | ✅ Public API available |
| RVH ER wait times page | RVH | ✅ Public page exists |
| Barrie Transit GTFS-RT | City of Barrie / Barrie Transit | ⚠️ Verify availability |
| GO Transit GTFS-RT | Metrolinx | ⚠️ Register for API key |
| City of Barrie Open Data | City of Barrie | ✅ Portal exists |
| SCDSB closure feed | SCDSB | ⚠️ Verify feed format |
| Lake Simcoe water data | LSRCA / Water Survey of Canada | ⚠️ Verify API |
| Medimap API (walk-in clinics) | Medimap | ⚠️ May require partnership |

---

## Appendix A: Name Rationale

**Chosen Name: BarriePulse**

| Candidate | Pros | Cons | Verdict |
|-----------|------|------|---------|
| BarrieFeed | Matches FreddyFeed pattern | Derivative, "feed" implies news only | ❌ |
| BarriePulse | "Pulse" = live heartbeat of city, unique, memorable | None significant | ✅ **Winner** |
| BarrieNow | Emphasizes real-time | Generic, might conflict with news sites | ❌ |
| BarrieHub | Clean | "Hub" is overused | ❌ |
| BarrieDash | Dashboard reference | Sounds like a food delivery app | ❌ |
| MyBarrie | Personal | barrie.ca already uses "My" branding | ❌ |

**Domain candidates:** barriepulse.ca, barriepulse.com
