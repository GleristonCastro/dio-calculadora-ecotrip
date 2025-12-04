"use client";

import { ROUTES_DATA } from "../data/routes";
import { formatLargeNumber } from "../utils/calculator";

interface RouteSelectorProps {
  origin: string | null;
  destination: string | null;
  distance: number | null;
  onOriginChange: (origin: string) => void;
  onDestinationChange: (destination: string) => void;
}

export function RouteSelector({
  origin,
  destination,
  distance,
  onOriginChange,
  onDestinationChange,
}: RouteSelectorProps) {
  return (
    <section className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-6 mb-6 border border-white/20">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        📍 Selecione a Rota
      </h2>

      <div className="space-y-4">
        {/* Origem */}
        <div>
          <label
            htmlFor="origin"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Origem:
          </label>
          <select
            id="origin"
            value={origin || ""}
            onChange={(e) => onOriginChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
          >
            <option value="">Selecione a origem</option>
            {ROUTES_DATA.cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Destino */}
        <div>
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Destino:
          </label>
          <select
            id="destination"
            value={destination || ""}
            onChange={(e) => onDestinationChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-white text-gray-900"
          >
            <option value="">Selecione o destino</option>
            {ROUTES_DATA.cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
        </div>

        {/* Informações da Rota */}
        {distance && distance > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
            <p className="text-green-800 font-medium">
              <strong>Distância:</strong> {formatLargeNumber(distance, 0)} km
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
