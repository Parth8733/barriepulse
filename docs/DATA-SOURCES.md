# BarriePulse — Data Sources Reference

**Version:** 1.0  
**Date:** April 15, 2026

Every data source used by BarriePulse, with endpoints, auth requirements, data format, rate limits, and fallback plans.

---

## Quick Reference

| # | Source | Auth | Format | Reliability | Priority |
|---|--------|------|--------|-------------|----------|
| DS-01 | Environment Canada (Weather) | None | XML/JSON | ⭐⭐⭐⭐⭐ | P0 |
| DS-02 | Environment Canada (AQHI) | None | XML | ⭐⭐⭐⭐⭐ | P0 |
| DS-03 | Ontario 511 (Roads) | None | JSON API | ⭐⭐⭐⭐ | P0 |
| DS-04 | RVH ER Wait Times | None (scrape) | HTML | ⭐⭐⭐ | P0 |
| DS-05 | CBC RSS (News) | None | RSS/XML | ⭐⭐⭐⭐⭐ | P0 |
| DS-06 | City of Barrie (News) | None | RSS/HTML | ⭐⭐⭐⭐ | P0 |
| DS-07 | City of Barrie Open Data | None | ArcGIS REST | ⭐⭐⭐⭐ | P0 |
| DS-08 | Metrolinx GO Transit | API Key | GTFS-RT (protobuf) | ⭐⭐⭐⭐ | P0 |
| DS-09 | Barrie Transit GTFS-RT | None/TBD | GTFS-RT | ⭐⭐⭐ | P1 |
| DS-10 | SCDSB School Closures | None | Web/RSS | ⭐⭐⭐ | P0 |
| DS-11 | SMCDSB School Closures | None | Web/RSS | ⭐⭐⭐ | P0 |
| DS-12 | SCSTC Bus Cancellations | None | Web | ⭐⭐⭐ | P1 |
| DS-13 | GasBuddy / Ontario Gas | None (scrape) | HTML/JSON | ⭐⭐⭐ | P1 |
| DS-14 | Lake Simcoe Water Data | None | CSV/JSON | ⭐⭐⭐⭐ | P1 |
| DS-15 | SMDHU Beach Quality | None | HTML | ⭐⭐⭐ | P2 |
| DS-16 | Medimap (Walk-in Clinics) | API Key | JSON | ⭐⭐⭐ | P2 |
| DS-17 | BarrieToday RSS | None | RSS/XML | ⭐⭐⭐⭐ | P1 |
| DS-18 | City of Barrie Webcams | None | MJPEG/Image | ⭐⭐⭐ | P1 |
| DS-19 | NRC Sunrise/Sunset | None | JSON API | ⭐⭐⭐⭐⭐ | P0 |
| DS-20 | Barrie Events Calendar | None | iCal/HTML | ⭐⭐⭐⭐ | P0 |

---

## Detailed Source Specifications

### DS-01: Environment Canada — Weather

| Field | Value |
|-------|-------|
| **Provider** | Environment Canada / Meteorological Service of Canada |
| **URL** | `https://dd.weather.gc.ca/citypage_weather/xml/ON/s0000092_e.xml` |
| **Alt URL** | `https://weather.gc.ca/en/location/index.html?coords=44.389,-79.690` |
| **Auth** | None required |
| **Format** | XML (citypage format) |
| **Rate Limit** | No published limit; be respectful (max 1 req/min) |
| **Station** | Barrie-Oro (s0000092) |
| **Data Points** | Current temp, feels-like, humidity, wind, conditions, icon code, forecast |
| **Update Freq** | Source updates hourly; we fetch every 15 min |
| **Fallback** | Open-Meteo API (open-meteo.com) as backup weather source |
| **Notes** | XML parsing needed. `currentConditions` node has all real-time data. `forecastGroup` has 7-day. |

**Sample fetch:**
```bash
curl "https://dd.weather.gc.ca/citypage_weather/xml/ON/s0000092_e.xml"
```

---

### DS-02: Environment Canada — Air Quality (AQHI)

| Field | Value |
|-------|-------|
| **Provider** | Environment Canada |
| **URL** | `https://dd.weather.gc.ca/air_quality/aqhi/ont/observation/realtime/xml/AQ_OBS_BARRIE_CURRENT.xml` |
| **Auth** | None |
| **Format** | XML |
| **Data Points** | AQHI value (1–10+), risk category |
| **Update Freq** | Hourly at source; fetch every 60 min |
| **Fallback** | IQAir API or AirNow.gov cross-border data |

---

### DS-03: Ontario 511 — Road Conditions

| Field | Value |
|-------|-------|
| **Provider** | Ontario Ministry of Transportation |
| **URL** | `https://511on.ca/api/v2/get/event` |
| **Auth** | None |
| **Format** | JSON |
| **Rate Limit** | No published limit |
| **Data Points** | Event type, location, severity, description, lanes affected, expected duration |
| **Filter** | Filter events by geography (Barrie area bounding box: lat 44.30–44.45, lon -79.60–-79.80) |
| **Update Freq** | Source is real-time; fetch every 5 min |
| **Key Highways** | Hwy 400, Hwy 11, Hwy 26, Hwy 90, Hwy 27 |
| **Fallback** | Scrape 511on.ca directly |

**Sample request:**
```bash
curl "https://511on.ca/api/v2/get/event?format=json&area=BARRIE"
```

---

### DS-04: RVH — ER Wait Times

| Field | Value |
|-------|-------|
| **Provider** | Royal Victoria Regional Health Centre |
| **URL** | `https://bi.rvh.on.ca:444/SEQ_PublicFacing/` |
| **Auth** | None (public page) |
| **Format** | HTML (scrape required) |
| **Data Points** | Current estimated wait time, patient volume indicator |
| **Update Freq** | Source updates in real-time; scrape every 5 min |
| **Legal** | Public-facing page intended for public consumption. Scrape respectfully. |
| **Fallback** | Show "Check RVH website" link with last known time + timestamp |
| **Risk** | Page structure may change. Need resilient selector strategy + monitoring. |

**Scraping strategy:**
- Use `cheerio` for HTML parsing (server-side only)
- Cache aggressively — ER wait doesn't change second-by-second
- Add User-Agent identifying BarriePulse
- Consider reaching out to RVH for API access or data partnership

---

### DS-05: CBC — News (Barrie/Simcoe)

| Field | Value |
|-------|-------|
| **Provider** | CBC News |
| **URL** | `https://www.cbc.ca/webfeed/rss/rss-canada-toronto` |
| **Auth** | None |
| **Format** | RSS 2.0 (XML) |
| **Data Points** | Title, link, pubDate, description |
| **Filter** | Filter items containing "Barrie" or "Simcoe" in title/description |
| **Update Freq** | Fetch every 30 min |
| **Fallback** | Show BarrieToday news instead |
| **Notes** | CBC doesn't have a Barrie-specific RSS; filter the Ontario/Toronto feed |

---

### DS-06: City of Barrie — Official News

| Field | Value |
|-------|-------|
| **Provider** | City of Barrie |
| **URL** | `https://www.barrie.ca/government/news-notices/media-releases` |
| **Alt** | Check for RSS feed at barrie.ca; if none, scrape the news page |
| **Auth** | None |
| **Format** | HTML / RSS (TBD) |
| **Data Points** | Title, date, link, summary |
| **Update Freq** | Fetch every 60 min |

---

### DS-07: City of Barrie — Open Data Portal

| Field | Value |
|-------|-------|
| **Provider** | City of Barrie GIS/Open Data |
| **URL** | `https://opendata.barrie.ca` |
| **API Base** | `https://services1.arcgis.com/xxx/arcgis/rest/services/` (ArcGIS REST) |
| **Auth** | None |
| **Format** | JSON (ArcGIS Feature Service) |
| **Available Data** | Parks, recreation facilities, curbside collection zones, property boundaries, infrastructure |
| **Key Dataset** | Curbside Collection — bin schedule by zone/address |
| **Notes** | Uses ArcGIS Hub. Query features with REST API or download as GeoJSON. |

---

### DS-08: Metrolinx — GO Transit

| Field | Value |
|-------|-------|
| **Provider** | Metrolinx |
| **URL (static)** | `https://www.gotransit.com/static_files/gotransit/assets/Files/GO_GTFS.zip` |
| **URL (realtime)** | `https://api.openmetrolinx.com/OpenDataAPI/api/V1/Gtfs.proto/Feed/TripUpdates` |
| **Auth** | API key required (free registration at [openmetrolinx.com](https://www.openmetrolinx.com)) |
| **Format** | GTFS-RT (Protocol Buffers) |
| **Data Points** | Trip updates (delays), vehicle positions, service alerts |
| **Filter** | Filter by Barrie line (route_id for Barrie GO line), stops: Barrie South, Allandale Waterfront |
| **Update Freq** | Real-time feed; fetch every 2 min |
| **Parser** | Use `gtfs-realtime-bindings` npm package to decode protobuf |
| **Fallback** | Static GTFS schedule (show scheduled times without delay info) |

**Station IDs (approximate — verify after GTFS download):**
- Allandale Waterfront GO: `AL`
- Barrie South GO: `BA`

---

### DS-09: Barrie Transit — GTFS-RT

| Field | Value |
|-------|-------|
| **Provider** | City of Barrie / Barrie Transit |
| **URL** | TBD — check with City of Barrie if GTFS-RT feed is available |
| **Alt** | MyRideBarrie.ca may have an API; investigate |
| **Static GTFS** | Likely available on transitfeeds.com or via City request |
| **Auth** | TBD |
| **Fallback** | Link to MyRideBarrie.ca live map |
| **Action needed** | Contact City of Barrie transit department to confirm data availability |

---

### DS-10: SCDSB — School Closures

| Field | Value |
|-------|-------|
| **Provider** | Simcoe County District School Board |
| **URL** | `https://www.scdsb.on.ca` (check for RSS or API) |
| **Auth** | None |
| **Format** | HTML (scrape school closure banner) |
| **Update Freq** | Every 15 min during 6am–9am on weekdays |
| **Fallback** | Link to SCDSB website |

---

### DS-11: SMCDSB — School Closures

| Field | Value |
|-------|-------|
| **Provider** | Simcoe Muskoka Catholic District School Board |
| **URL** | `https://www.smcdsb.on.ca` |
| **Auth** | None |
| **Format** | HTML |
| **Update Freq** | Same as DS-10 |

---

### DS-12: SCSTC — Bus Cancellations

| Field | Value |
|-------|-------|
| **Provider** | Simcoe County Student Transportation Consortium |
| **URL** | `https://scstc.ca` or `https://simcoecountyschoolbus.ca` |
| **Auth** | None |
| **Format** | HTML |
| **Data Points** | Cancelled bus routes by zone |
| **Update Freq** | Every 15 min during 6am–9am on weekdays |
| **Notes** | This is the primary source parents check on snow days |

---

### DS-13: Gas Prices

| Field | Value |
|-------|-------|
| **Provider** | GasBuddy (preferred) or Ontario Energy Board |
| **URL** | `https://www.gasbuddy.com/graphql` (unofficial) or scrape |
| **Alt** | `https://www.ontario.ca/page/motor-fuel-prices` |
| **Auth** | None (scrape) |
| **Format** | JSON/HTML |
| **Data Points** | Cheapest regular gas price in Barrie, station name, price trend |
| **Update Freq** | Every 6 hours |
| **Risk** | GasBuddy may block scraping. Consider using Ontario government data as primary. |

---

### DS-14: Lake Simcoe Water Data

| Field | Value |
|-------|-------|
| **Provider** | Water Survey of Canada / Lake Simcoe Region Conservation Authority |
| **URL** | `https://wateroffice.ec.gc.ca/report/real_time_e.html?stn=02EC013` |
| **API** | `https://wateroffice.ec.gc.ca/services/real_time_data/csv/inline?stations[]=02EC013` |
| **Auth** | None |
| **Format** | CSV / HTML |
| **Data Points** | Water level (m), discharge, historical comparison |
| **Station** | 02EC013 (Lake Simcoe at Barrie — verify station ID) |
| **Update Freq** | Hourly at source; fetch every 60 min |
| **Fallback** | LSRCA website data |

---

### DS-15: Beach Water Quality

| Field | Value |
|-------|-------|
| **Provider** | Simcoe Muskoka District Health Unit (SMDHU) |
| **URL** | `https://www.simcoemuskokahealth.org/Topics/SchoolsChildCare/RecreationalWater/BeachWaterQuality` |
| **Auth** | None |
| **Format** | HTML (scrape) |
| **Data Points** | Beach name, status (Safe/Advisory), E. coli count, sample date |
| **Beaches** | Centennial Beach, Minet's Point, Johnson's Beach, Tyndale Beach |
| **Season** | June–September only |
| **Update Freq** | Daily during beach season |

---

### DS-16: Medimap — Walk-In Clinics

| Field | Value |
|-------|-------|
| **Provider** | Medimap |
| **URL** | `https://medimap.ca/api/` (if available) or `https://medimap.ca/Location/barrie-on` |
| **Auth** | May require API partnership |
| **Format** | JSON / HTML |
| **Data Points** | Clinic name, address, status (open/closed), current wait time |
| **Update Freq** | Every 30 min |
| **Fallback** | Static list of Barrie walk-in clinics with hours |
| **Action needed** | Contact Medimap about API access or partnership |

---

### DS-17: BarrieToday — News

| Field | Value |
|-------|-------|
| **Provider** | BarrieToday (Village Media) |
| **URL** | `https://www.barrietoday.com/rss` or check for RSS feed URL |
| **Auth** | None |
| **Format** | RSS 2.0 |
| **Data Points** | Title, link, pubDate, category |
| **Update Freq** | Every 30 min |

---

### DS-18: City of Barrie Webcams

| Field | Value |
|-------|-------|
| **Provider** | City of Barrie |
| **URL** | `https://www.barrie.ca/community-recreation-environment/facilities-venues/city-hall#webcams` |
| **Auth** | None |
| **Format** | Image URL (JPEG refreshed periodically) or MJPEG stream |
| **Cameras** | City Hall rooftop (confirmed available) |
| **Update Freq** | Image refreshed every 30–60 seconds |
| **Notes** | Embed image with auto-refresh. May need to investigate stream URL from page source. |

---

### DS-19: NRC — Sunrise/Sunset

| Field | Value |
|-------|-------|
| **Provider** | National Research Council Canada |
| **URL** | `https://nrc.canada.ca/en/research-development/products-services/software-applications/sun-calculator/` |
| **Alt API** | `https://api.sunrise-sunset.org/json?lat=44.3894&lng=-79.6903&formatted=0` |
| **Auth** | None |
| **Format** | JSON |
| **Data Points** | Sunrise, sunset, solar noon, day length |
| **Update Freq** | Once daily |

---

### DS-20: Barrie Events Calendar

| Field | Value |
|-------|-------|
| **Provider** | City of Barrie |
| **URL** | `https://www.barrie.ca/community-recreation/events/community-events-calendar` |
| **Auth** | None |
| **Format** | HTML / iCal (check for feed) |
| **Alt Sources** | Tourism Barrie, Downtown Barrie BIA, Eventbrite (Barrie) |
| **Update Freq** | Every 6 hours |

---

## Data Source Verification Checklist

Before development begins, verify each source is accessible:

| # | Source | Endpoint Tested | Data Format Confirmed | Auth Obtained | Notes |
|---|--------|:-:|:-:|:-:|-------|
| DS-01 | Env Canada Weather | ☐ | ☐ | N/A | |
| DS-02 | Env Canada AQHI | ☐ | ☐ | N/A | |
| DS-03 | Ontario 511 | ☐ | ☐ | N/A | |
| DS-04 | RVH ER | ☐ | ☐ | N/A | Test scraping |
| DS-05 | CBC RSS | ☐ | ☐ | N/A | |
| DS-06 | City of Barrie News | ☐ | ☐ | N/A | |
| DS-07 | City Open Data | ☐ | ☐ | N/A | |
| DS-08 | GO Transit GTFS-RT | ☐ | ☐ | ☐ | Register at openmetrolinx.com |
| DS-09 | Barrie Transit | ☐ | ☐ | ☐ | Contact city |
| DS-10 | SCDSB | ☐ | ☐ | N/A | |
| DS-11 | SMCDSB | ☐ | ☐ | N/A | |
| DS-12 | SCSTC | ☐ | ☐ | N/A | |
| DS-13 | Gas Prices | ☐ | ☐ | N/A | |
| DS-14 | Lake Simcoe | ☐ | ☐ | N/A | Verify station ID |
| DS-15 | Beach Quality | ☐ | ☐ | N/A | Seasonal |
| DS-16 | Medimap | ☐ | ☐ | ☐ | Contact Medimap |
| DS-17 | BarrieToday | ☐ | ☐ | N/A | Find RSS URL |
| DS-18 | Webcams | ☐ | ☐ | N/A | Find stream URL |
| DS-19 | Sunrise/Sunset | ☐ | ☐ | N/A | |
| DS-20 | Events Calendar | ☐ | ☐ | N/A | |
