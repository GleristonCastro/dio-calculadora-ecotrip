"use client";

import { CO2_CONFIG } from "../data/config";
import { formatNumber, formatLargeNumber } from "../utils/calculator";
import type {
  CalculationResult,
  EquivalenceResult,
  FeedbackMessage,
  TransportId,
} from "../types";

interface ResultsProps {
  result: CalculationResult;
  equivalences: Record<string, EquivalenceResult>;
  feedback: FeedbackMessage;
}

export function Results({ result, equivalences, feedback }: ResultsProps) {
  const transport = CO2_CONFIG.transports[result.transport as TransportId];

  return (
    <section className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-6 border border-white/20 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        📊 Resultados
      </h2>

      {/* Resultado Principal */}
      <div className="text-center mb-8">
        <div className="bg-linear-to-br from-green-50 to-blue-50 rounded-2xl p-8 mb-4">
          <div className="text-6xl font-bold text-gray-800 mb-2">
            {formatNumber(result.co2)}
            <span className="text-2xl text-gray-600 ml-2">kg CO₂</span>
          </div>
          <p className="text-lg text-gray-700">
            <span className="text-2xl mr-2">{feedback.emoji}</span>
            {feedback.message}
          </p>
        </div>
      </div>

      {/* Detalhes da Viagem */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Distância:</span>
            <span className="font-bold text-gray-800">
              {formatLargeNumber(result.distance, 0)} km
            </span>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Transporte:</span>
            <span className="font-bold text-gray-800 flex items-center">
              <span className="mr-2">{transport.icon}</span>
              {transport.name}
            </span>
          </div>
        </div>

        {result.transport === "car" && result.passengers > 1 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Passageiros:</span>
              <span className="font-bold text-gray-800">
                {result.passengers}
              </span>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Emissão por km:</span>
            <span className="font-bold text-gray-800">
              {formatNumber(
                CO2_CONFIG.emissions[result.transport as TransportId]
              )}{" "}
              kg/km
            </span>
          </div>
        </div>
      </div>

      {/* Equivalências */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          🌳 Equivalências
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(equivalences).map(([key, equivalence]) => (
            <div
              key={key}
              className="bg-linear-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center border border-green-200"
            >
              <div className="text-3xl mb-2">{equivalence.icon}</div>
              <div className="text-2xl font-bold text-green-700 mb-1">
                {formatLargeNumber(equivalence.value, 1)}
              </div>
              <div className="text-xs text-green-600 leading-tight">
                {equivalence.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
