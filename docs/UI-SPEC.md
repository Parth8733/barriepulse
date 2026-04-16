# BarriePulse — UI/UX Specification

**Version:** 1.0  
**Date:** April 15, 2026

---

## 1. Design Philosophy

| Principle | Description |
|-----------|-------------|
| **Glanceable** | Every card should be understood in < 3 seconds |
| **Real-time feel** | Timestamps on every card, auto-updating data, no stale feeling |
| **Mobile-first** | Most users will check on their phone in the morning |
| **Clean, not boring** | Minimal UI with purposeful color and subtle motion |
| **No clutter** | No ads, no pop-ups, no cookie banners, no newsletter modals |
| **Accessible** | WCAG 2.1 AA, keyboard-navigable, screen-reader friendly |

---

## 2. Layout Structure

### 2.1 Page Layout

```
┌──────────────────────────────────────────────┐
│  HEADER                                       │
│  BarriePulse logo · "Barrie, right now."      │
│  Current date + time (live)                   │
├──────────────────────────────────────────────┤
│  WELCOME BANNER (dismissible)                 │
│  Fun Barrie fact of the day                   │
├──────────────────────────────────────────────┤
│  📌 MY BARRIE (pinned cards — hidden if none) │
│  [Pinned Card] [Pinned Card] [Pinned Card]    │
├──────────────────────────────────────────────┤
│  ☀️ RIGHT NOW                                 │
│  Weather · Air Quality · UV · Daylight · Lake │
├──────────────────────────────────────────────┤
│  🚆 GETTING AROUND                            │
│  GO Train · Barrie Transit · Roads · Parking  │
├──────────────────────────────────────────────┤
│  🎉 AROUND TOWN                               │
│  Events · Skating · Swimming · Market · Colts │
├──────────────────────────────────────────────┤
│  📋 ESSENTIALS                                │
│  Gas · Collection · Schools · Flyers · Snow   │
├──────────────────────────────────────────────┤
│  📰 NEWS                                      │
│  CBC · City · BarrieToday · County            │
├──────────────────────────────────────────────┤
│  🏥 CITY INFO                                 │
│  ER Wait · Walk-In · Water · Downtown · Beach │
├──────────────────────────────────────────────┤
│  📷 LIVE FEEDS                                │
│  Webcams                                      │
├──────────────────────────────────────────────┤
│  FOOTER                                       │
│  Credits · Feedback · Data sources · Privacy  │
└──────────────────────────────────────────────┘
```

### 2.2 Responsive Grid

| Breakpoint | Grid | Card Layout |
|-----------|------|-------------|
| Mobile (< 640px) | 1 column | Full-width stacked cards |
| Tablet (640–1023px) | 2 columns | Cards in 2-col grid per section |
| Desktop (1024–1279px) | 3 columns | Cards in 3-col grid |
| Wide (1280px+) | 3 columns, max-width 1280px centered | Comfortable reading width |

---

## 3. Color System

### 3.1 Core Palette

```css
/* Base */
--color-bg:          #0f172a;    /* Slate 900 — dark background */
--color-bg-card:     #1e293b;    /* Slate 800 — card background */
--color-bg-hover:    #334155;    /* Slate 700 — hover state */
--color-text:        #f8fafc;    /* Slate 50 — primary text */
--color-text-muted:  #94a3b8;    /* Slate 400 — secondary text */
--color-border:      #334155;    /* Slate 700 — card borders */

/* Accent */
--color-primary:     #38bdf8;    /* Sky 400 — primary accent (lake blue) */
--color-primary-dim: #0ea5e9;    /* Sky 500 — darker accent */

/* Status */
--color-success:     #4ade80;    /* Green 400 */
--color-warning:     #fbbf24;    /* Amber 400 */
--color-danger:      #f87171;    /* Red 400 */
--color-info:        #60a5fa;    /* Blue 400 */
```

### 3.2 Dark Theme (Default)
BarriePulse defaults to a dark theme — matches FreddyFeed's aesthetic, is easier on eyes for quick glances, and feels modern.

### 3.3 Light Theme (v2)
Optional light mode toggle in future version. Respect `prefers-color-scheme` media query.

---

## 4. Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Logo/Brand | Inter | 24px | 700 |
| Section Title | Inter | 20px | 600 |
| Card Title | Inter | 16px | 600 |
| Card Body | Inter | 14px | 400 |
| Card Label | Inter | 12px | 500 |
| Timestamp | Inter | 11px | 400 |
| Big Number (weather, ER) | Inter | 36px | 700 |

Use **Inter** (variable font via `next/font/google`) — clean, highly legible, variable weight.

---

## 5. Component Specifications

### 5.1 Section Component

```
┌──────────────────────────────────────────────┐
│  ☀️ RIGHT NOW                            ▾   │
│  Weather · Air Quality · UV · Daylight        │
│  ─────────────────────────────────────────    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │  Card 1  │ │  Card 2  │ │  Card 3  │      │
│  └──────────┘ └──────────┘ └──────────┘      │
│  Description text about this section          │
└──────────────────────────────────────────────┘
```

- Section header: icon + title + sub-navigation tabs
- Cards in responsive grid below
- Optional description paragraph at bottom (like FreddyFeed)
- Sections are collapsible (click header to toggle)

### 5.2 Card Component (Base)

```
┌──────────────────────────────┐
│ 📌  Card Title      just now │  ← Pin button + title + timestamp
│ ─────────────────────────────│
│                              │
│    8°C                       │  ← Main content (varies per card)
│    Feels like 6°             │
│    Overcast · 96% humidity   │
│                              │
│    High 10° · Low 5°         │
│    Rain tomorrow · 8°/4°     │
│                              │
│ ─────────────────────────────│
│ 7-day forecast →             │  ← Optional footer link
└──────────────────────────────┘
```

**Card specs:**
- Background: `--color-bg-card` with 1px border `--color-border`
- Border radius: 12px
- Padding: 16px (mobile), 20px (desktop)
- Hover: subtle brightness increase
- Pin button: top-left, toggles pin icon (outline → filled)
- Timestamp: top-right, `--color-text-muted`, updates live

### 5.3 Weather Card

```
┌──────────────────────────────┐
│ 📌  Weather          just now│
│ ─────────────────────────────│
│                              │
│  ☁️  8°C              ↓0.5° │
│     Feels 6°                 │
│                              │
│  96% humidity                │
│  4.3 km/h NW · Overcast     │
│                              │
│  High 10° · Low 5°          │
│  Rain tomorrow · 8°/4°      │
│                              │
│ 7-day forecast →             │
└──────────────────────────────┘
```

- Big temperature number (36px, bold)
- Weather icon from icon set
- Trend arrow (↑ rising, ↓ falling)
- Secondary info in muted text

### 5.4 GO Train Card

```
┌──────────────────────────────┐
│ 📌  GO Train         just now│
│ ─────────────────────────────│
│                              │
│  Allandale Waterfront → Union│
│                              │
│  🟢 6:45 AM    On Time       │
│  🟡 7:30 AM    +3 min        │
│  🟢 8:15 AM    On Time       │
│                              │
│  ⚠️ Signal delays south of   │
│     Barrie South             │
│                              │
│ Full schedule →              │
└──────────────────────────────┘
```

- Color-coded status dots (green = on time, yellow = minor delay, red = major)
- Service alerts in warning style
- Station selector tab: Allandale / Barrie South

### 5.5 ER Wait Card

```
┌──────────────────────────────┐
│ 📌  ER Wait Times    just now│
│ ─────────────────────────────│
│                              │
│  RVH Emergency               │
│                              │
│  2h 15m                      │  ← Big number, color-coded
│  estimated wait              │
│                              │
│  Consider: Walk-in clinics   │
│  or call 8-1-1              │
│                              │
│ Check RVH website →          │
└──────────────────────────────┘
```

- Wait time as big number
- Color: green (< 1h), yellow (1–3h), red (> 3h)
- Always show alternatives message

### 5.6 Collection Card

```
┌──────────────────────────────┐
│ 📌  Curbside Collection      │
│ ─────────────────────────────│
│                              │
│  This week                   │
│  🔵 Blue Bin Week            │
│                              │
│  Cans, plastics, cartons,    │
│  glass bottles & jars        │
│                              │
│  Next week: ♻️ Green Bin     │
│                              │
└──────────────────────────────┘
```

- Color-coded bin icon
- Simple what-goes-in list
- Next week preview

### 5.7 Schools Card

```
┌──────────────────────────────┐
│ 📌  Schools           6:30am│
│ ─────────────────────────────│
│                              │
│  ❄️ SCDSB                    │
│  All schools CLOSED          │
│                              │
│  ✅ SMCDSB                   │
│  All schools open            │
│                              │
│  🚌 Bus Cancellations        │
│  Zone 3, Zone 7 cancelled    │
│                              │
└──────────────────────────────┘
```

- Red/green status per school board
- Bus cancellations listed
- After 4pm: "School day is over"

### 5.8 Road Conditions Card

```
┌──────────────────────────────┐
│ 📌  Road Conditions   just now│
│ ─────────────────────────────│
│                              │
│  🔴 Closed                   │
│  Hwy 400 SB at Dunlop St    │
│  Collision · 2 lanes closed  │
│                              │
│  🟡 Construction             │
│  Hwy 26 near Essa Rd        │
│  Delays: 15-30 min           │
│                              │
│ Show 3 more →                │
└──────────────────────────────┘
```

- Severity color coding
- Expandable list
- Highway name prominent

---

## 6. Interaction Patterns

### 6.1 Pin/Unpin

1. User hovers/taps pin icon on any card
2. Icon toggles: outline pin → filled pin (with subtle animation)
3. Card clones to "My Barrie" section at top
4. "My Barrie" section appears (if first pin)
5. Pin state saved to localStorage
6. Unpin: tap filled pin → card removed from My Barrie

### 6.2 Section Navigation

- Each section header has tab-style links (e.g., "Weather · Air Quality · UV · Daylight")
- Clicking a tab smooth-scrolls to that card within the section
- On mobile: horizontal scroll tabs

### 6.3 Show More / Expand

- Lists (events, roads, news) show top 3–5 items by default
- "Show more" link expands to show all
- Collapse back with "Show less"
- Smooth height transition animation

### 6.4 External Links

- All links to external sources open in new tab
- Indicated with small ↗ icon
- Source attribution on each card (e.g., "Source: Environment Canada")

### 6.5 Loading States

- Skeleton pulse animation for each card while loading
- Shape matches the card's content layout
- No layout shift when data arrives (CLS < 0.1)

### 6.6 Error States

- Card shows "Temporarily unavailable" with muted text
- Retry button (optional)
- Never shows empty card or broken layout

---

## 7. Motion & Animation

| Element | Animation | Duration |
|---------|-----------|----------|
| Card data update | Subtle number fade/slide | 300ms |
| Pin toggle | Scale bounce on pin icon | 200ms |
| Show more expand | Height transition | 300ms ease |
| Section collapse | Height transition | 300ms ease |
| Skeleton loading | Pulse opacity | 1.5s loop |
| Page load | Cards fade in staggered | 100ms per card |

**Respects `prefers-reduced-motion`** — all animations disabled when user prefers reduced motion.

---

## 8. Accessibility Requirements

| Requirement | Implementation |
|-------------|----------------|
| Keyboard navigation | All cards, buttons, links focusable with Tab |
| Focus indicators | Visible focus ring (2px solid `--color-primary`) |
| Screen readers | `aria-live="polite"` on updating data regions |
| Alt text | All icons and images have descriptive alt text |
| Color contrast | Minimum 4.5:1 for text, 3:1 for large text |
| Heading hierarchy | h1 (site name), h2 (sections), h3 (card titles) |
| Skip navigation | "Skip to main content" link at page top |
| Landmark roles | `<header>`, `<main>`, `<section>`, `<footer>` |
| Reduced motion | Respect `prefers-reduced-motion` |
| Font scaling | Rem units, works with browser zoom up to 200% |

---

## 9. Mobile-Specific UX

### 9.1 Touch Targets
- Minimum 44x44px for all interactive elements
- Adequate spacing between tap targets

### 9.2 Mobile Header
- Compact header with logo + time
- Sticky on scroll (slim version)

### 9.3 Bottom Quick-Access (v2)
- Consider a sticky bottom bar with 4 quick links: Weather, GO Train, ER, Schools
- Most-accessed features one tap away

### 9.4 Pull-to-Refresh
- Optional: pull down to force refresh all data
- Visual indicator during refresh

---

## 10. Iconography

Use **Lucide React** icon set — consistent, clean, open-source.

| Feature | Icon |
|---------|------|
| Weather | `Cloud`, `Sun`, `CloudRain`, `Snowflake`, etc. |
| Temperature | `Thermometer` |
| Wind | `Wind` |
| Air Quality | `Leaf` |
| UV Index | `SunMedium` |
| Lake | `Waves` |
| Fire Ban | `Flame` |
| GO Train | `Train` |
| Bus/Transit | `Bus` |
| Road | `Construction` |
| Parking | `ParkingSquare` |
| Events | `Calendar` |
| Skating | `Snowflake` (with custom) |
| Swimming | `Waves` |
| Gas | `Fuel` |
| Recycling | `Recycle` |
| School | `GraduationCap` |
| News | `Newspaper` |
| ER | `Siren` |
| Clinic | `Stethoscope` |
| Water | `Droplet` |
| Webcam | `Camera` |
| Pin | `Pin` / `PinOff` |
| External Link | `ExternalLink` |
| Expand | `ChevronDown` |
| Collapse | `ChevronUp` |

---

## 11. SEO & Social Preview

### 11.1 Open Graph

```html
<meta property="og:title" content="BarriePulse — Barrie, right now." />
<meta property="og:description" content="Real-time dashboard for Barrie, ON. Weather, GO Train, ER wait times, road conditions, and more." />
<meta property="og:image" content="https://barriepulse.ca/og-image.png" />
<meta property="og:url" content="https://barriepulse.ca" />
<meta property="og:type" content="website" />
<meta property="og:locale" content="en_CA" />
```

### 11.2 OG Image Design
- 1200x630px
- Dark background matching site theme
- "BarriePulse" logo centered
- Tagline: "Barrie, right now."
- Subtle preview of dashboard cards in background

---

## 12. Figma / Design Deliverables

| Deliverable | Priority | Status |
|-------------|----------|--------|
| Logo (dark + light variants) | P0 | ☐ |
| Favicon (16x16, 32x32, 192x192, 512x512) | P0 | ☐ |
| OG image (1200x630) | P0 | ☐ |
| Mobile wireframe (full page) | P0 | ☐ |
| Desktop wireframe (full page) | P0 | ☐ |
| Component library in Figma | P1 | ☐ |
| Weather icon set (if custom) | P2 | ☐ |
| App icon (for PWA "Add to Home") | P2 | ☐ |
