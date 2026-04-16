"use client";

import {
  Sun,
  Train,
  Calendar,
  ClipboardList,
  Newspaper,
} from "lucide-react";

import { usePolling } from "@/hooks/usePolling";
import { usePinnedCards } from "@/hooks/usePinnedCards";
import { POLL_INTERVALS } from "@/lib/constants";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Section } from "@/components/layout/Section";

import { WeatherCard } from "@/components/cards/WeatherCard";
import { AirQualityCard } from "@/components/cards/AirQualityCard";
import { UVIndexCard } from "@/components/cards/UVIndexCard";
import { DaylightCard } from "@/components/cards/DaylightCard";
import { GOTrainCard } from "@/components/cards/GOTrainCard";
import { RoadConditionsCard } from "@/components/cards/RoadConditionsCard";
import { ERWaitCard } from "@/components/cards/ERWaitCard";
import { NewsCard } from "@/components/cards/NewsCard";
import { SchoolsCard } from "@/components/cards/SchoolsCard";
import { CollectionCard } from "@/components/cards/CollectionCard";
import { EventsCard } from "@/components/cards/EventsCard";
import { GasPricesCard } from "@/components/cards/GasPricesCard";

import type {
  WeatherData,
  AirQualityData,
  UVIndexData,
  DaylightData,
  GOTransitData,
  RoadConditionsData,
  ERWaitData,
  NewsData,
  SchoolsData,
  CollectionData,
  EventsData,
  GasPriceData,
} from "@/types";

export default function Home() {
  const { togglePin, isPinned } = usePinnedCards();

  // ── Data hooks ──
  const weather = usePolling<WeatherData>("/api/weather", POLL_INTERVALS.weather);
  const airQuality = usePolling<AirQualityData>("/api/air-quality", POLL_INTERVALS.airQuality);
  const uv = usePolling<UVIndexData>("/api/uv", POLL_INTERVALS.uvIndex);
  const daylight = usePolling<DaylightData>("/api/daylight", POLL_INTERVALS.daylight);
  const goTrain = usePolling<GOTransitData>("/api/go-transit", POLL_INTERVALS.goTrain);
  const roads = usePolling<RoadConditionsData>("/api/roads", POLL_INTERVALS.roads);
  const erWait = usePolling<ERWaitData>("/api/er-wait", POLL_INTERVALS.erWait);
  const news = usePolling<NewsData>("/api/news", POLL_INTERVALS.news);
  const schools = usePolling<SchoolsData>("/api/schools", POLL_INTERVALS.schools);
  const collection = usePolling<CollectionData>("/api/collection", POLL_INTERVALS.collection);
  const events = usePolling<EventsData>("/api/events", POLL_INTERVALS.events);
  const gasPrices = usePolling<GasPriceData>("/api/gas-prices", POLL_INTERVALS.gasPrices);

  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-10">

        {/* ── Right Now ── */}
        <Section id="right-now" title="Right Now" icon={Sun}>
          <WeatherCard
            data={weather.data}
            isLoading={weather.isLoading}
            error={!!weather.error}
            isPinned={isPinned("weather")}
            onTogglePin={togglePin}
          />
          <AirQualityCard
            data={airQuality.data}
            isLoading={airQuality.isLoading}
            error={!!airQuality.error}
            isPinned={isPinned("air-quality")}
            onTogglePin={togglePin}
          />
          <UVIndexCard
            data={uv.data}
            isLoading={uv.isLoading}
            error={!!uv.error}
            isPinned={isPinned("uv-index")}
            onTogglePin={togglePin}
          />
          <DaylightCard
            data={daylight.data}
            isLoading={daylight.isLoading}
            error={!!daylight.error}
            isPinned={isPinned("daylight")}
            onTogglePin={togglePin}
          />
        </Section>

        {/* ── Getting Around ── */}
        <Section id="getting-around" title="Getting Around" icon={Train}>
          <GOTrainCard
            data={goTrain.data}
            isLoading={goTrain.isLoading}
            error={!!goTrain.error}
            isPinned={isPinned("go-train")}
            onTogglePin={togglePin}
          />
          <RoadConditionsCard
            data={roads.data}
            isLoading={roads.isLoading}
            error={!!roads.error}
            isPinned={isPinned("road-conditions")}
            onTogglePin={togglePin}
          />
        </Section>

        {/* ── News ── */}
        <Section id="news" title="News" icon={Newspaper}>
          <NewsCard
            data={news.data}
            isLoading={news.isLoading}
            error={!!news.error}
            isPinned={isPinned("news-cbc")}
            onTogglePin={togglePin}
          />
        </Section>

        {/* ── Around Town ── */}
        <Section id="around-town" title="Around Town" icon={Calendar}>
          <EventsCard
            data={events.data}
            isLoading={events.isLoading}
            error={!!events.error}
            isPinned={isPinned("events")}
            onTogglePin={togglePin}
          />
        </Section>

        {/* ── Essentials ── */}
        <Section id="essentials" title="Essentials" icon={ClipboardList}>
          <ERWaitCard
            data={erWait.data}
            isLoading={erWait.isLoading}
            error={!!erWait.error}
            isPinned={isPinned("er-wait")}
            onTogglePin={togglePin}
          />
          <SchoolsCard
            data={schools.data}
            isLoading={schools.isLoading}
            error={!!schools.error}
            isPinned={isPinned("schools")}
            onTogglePin={togglePin}
          />
          <CollectionCard
            data={collection.data}
            isLoading={collection.isLoading}
            error={!!collection.error}
            isPinned={isPinned("collection")}
            onTogglePin={togglePin}
          />
          <GasPricesCard
            data={gasPrices.data}
            isLoading={gasPrices.isLoading}
            error={!!gasPrices.error}
            isPinned={isPinned("gas-prices")}
            onTogglePin={togglePin}
          />
        </Section>

      </main>
      <Footer />
    </>
  );
}
