"use client";

import { useState } from "react";
import { useCalculator } from "./hooks/useCalculator";
import { RouteSelector } from "./components/RouteSelector";
import { TransportSelector } from "./components/TransportSelector";
import { StatusIndicator } from "./components/StatusIndicator";
import { Results } from "./components/Results";
import { ComparisonChart } from "./components/ComparisonChart";
import { YouTubeBackground } from "./components/YouTubeBackground";

export default function Home() {
  const {
    state,
    result,
    equivalences,
    comparison,
    feedback,
    isFormValid,
    hasResults,
    setOrigin,
    setDestination,
    setTransport,
    setPassengers,
  } = useCalculator();

  return (
    <YouTubeBackground videoId="05MF_6XN374">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🌍 Calculadora de CO₂
          </h1>
          <p className="text-lg text-white mx-auto">
            Calcule as emissões de carbono da sua viagem e descubra alternativas
            mais sustentáveis
          </p>
        </header>

        {/* Layout Desktop: Sidebar + Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Controles (Desktop: esquerda, Mobile: completo) */}
          <aside className="lg:w-1/3 space-y-6">
            {/* Seleção de Rota */}
            <RouteSelector
              origin={state.origin}
              destination={state.destination}
              distance={state.distance}
              onOriginChange={setOrigin}
              onDestinationChange={setDestination}
            />

            {/* Seleção de Transporte */}
            <TransportSelector
              selectedTransport={state.transport}
              passengers={state.passengers}
              onTransportChange={setTransport}
              onPassengersChange={setPassengers}
            />
          </aside>

          {/* Main Content - Status e Resultados (Desktop: direita, Mobile: completo) */}
          <main className="lg:w-2/3 space-y-6">
            {/* Status do Cálculo */}
            <StatusIndicator isValid={isFormValid} hasResults={hasResults} />

            {/* Resultados */}
            {hasResults && result && equivalences && feedback && (
              <Results
                result={result}
                equivalences={equivalences}
                feedback={feedback}
              />
            )}

            {/* Comparação */}
            {hasResults && comparison && (
              <ComparisonChart comparisons={comparison} />
            )}
          </main>
        </div>

        {/* Footer */}
        <footer className="text-center mt-12">
          <p className="text-white mb-2">
            💡 Dados baseados em médias de emissões de CO₂ por meio de
            transporte
          </p>
          <p className="text-sm text-white">
            Desenvolvido para conscientização ambiental
          </p>
        </footer>
      </div>
    </YouTubeBackground>
  );
}
