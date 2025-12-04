"use client";

import { CO2_CONFIG, TRANSPORT_COLORS } from "../data/config";
import { formatNumber } from "../utils/calculator";
import type { TransportId } from "../types";

interface TransportSelectorProps {
  selectedTransport: TransportId | null;
  passengers: number;
  onTransportChange: (transport: TransportId) => void;
  onPassengersChange: (passengers: number) => void;
}

export function TransportSelector({
  selectedTransport,
  passengers,
  onTransportChange,
  onPassengersChange,
}: TransportSelectorProps) {
  return (
    <section className="bg-white/90 backdrop-blur-3xl rounded-xl shadow-lg p-6 mb-6 border border-white/20">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        🚗 Meio de Transporte
      </h2>

      {/* Grid de Transportes */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.values(CO2_CONFIG.transports).map((transport) => {
          const isSelected = selectedTransport === transport.id;
          const emission = CO2_CONFIG.emissions[transport.id as TransportId];

          return (
            <button
              key={transport.id}
              onClick={() => onTransportChange(transport.id)}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50
                ${
                  isSelected
                    ? `border-2 ${getBorderColor(
                        transport.id
                      )} ${getBackgroundColor(
                        transport.id
                      )} text-white shadow-lg`
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:shadow-md"
                }
              `}
              style={
                isSelected
                  ? {
                      borderColor: transport.color,
                      backgroundColor: transport.color,
                    }
                  : {}
              }
              type="button"
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{transport.icon}</div>
                <div className="font-medium text-sm mb-1">{transport.name}</div>
                <div
                  className={`text-xs ${
                    isSelected ? "text-white" : "text-gray-500"
                  }`}
                >
                  {formatNumber(emission)} kg/km
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-2 right-2 text-white">✓</div>
              )}
            </button>
          );
        })}
      </div>

      {/* Seção de Passageiros (veículos individuais) */}
      {selectedTransport &&
        ["car", "electricCar", "hybridCar", "motorcycle"].includes(
          selectedTransport
        ) && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-fade-in">
            <label
              htmlFor="passengers"
              className="block text-sm font-medium text-blue-800 mb-2"
            >
              Número de passageiros:
            </label>
            <input
              type="number"
              id="passengers"
              min="1"
              max="50"
              value={passengers}
              onChange={(e) => onPassengersChange(parseInt(e.target.value))}
              className="w-full max-w-xs px-4 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
            />
            <p className="text-xs text-blue-600 mt-1">
              Mais passageiros = menor emissão por pessoa
            </p>
          </div>
        )}
    </section>
  );
}

// Funções auxiliares para cores
function getBorderColor(transport: TransportId): string {
  const colors: Record<TransportId, string> = {
    bike: "border-green-500",
    electricCar: "border-emerald-500",
    train: "border-violet-500",
    hybridCar: "border-cyan-500",
    bus: "border-amber-500",
    motorcycle: "border-orange-500",
    plane: "border-red-500",
    car: "border-red-600",
  };
  return colors[transport];
}

function getBackgroundColor(transport: TransportId): string {
  const colors: Record<TransportId, string> = {
    bike: "bg-green-500",
    electricCar: "bg-emerald-500",
    train: "bg-violet-500",
    hybridCar: "bg-cyan-500",
    bus: "bg-amber-500",
    motorcycle: "bg-orange-500",
    plane: "bg-red-500",
    car: "bg-red-600",
  };
  return colors[transport];
}
