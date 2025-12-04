"use client";

import { useState, useEffect } from "react";
import { CO2_CONFIG } from "../data/config";
import { formatNumber } from "../utils/calculator";
import type { TransportComparison, TransportId } from "../types";

interface ComparisonChartProps {
  comparisons: TransportComparison[];
}

export function ComparisonChart({ comparisons }: ComparisonChartProps) {
  const [animatedBars, setAnimatedBars] = useState<boolean[]>(
    new Array(comparisons.length).fill(false)
  );

  // Anima as barras uma por vez
  useEffect(() => {
    comparisons.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedBars((prev) => {
          const newAnimated = [...prev];
          newAnimated[index] = true;
          return newAnimated;
        });
      }, index * 150); // 150ms delay entre cada barra
    });
  }, [comparisons]);

  return (
    <section className="bg-white/90 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/20 animate-fade-in">
      <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        📈 Comparação Entre Transportes
      </h2>

      <div className="space-y-4">
        {comparisons.map((comparison, index) => {
          const transport =
            CO2_CONFIG.transports[comparison.transport as TransportId];
          const isAnimated = animatedBars[index];

          return (
            <div key={comparison.transport} className="relative">
              {/* Header da barra */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{transport.icon}</span>
                  <span className="font-medium text-gray-800">
                    {transport.name}
                  </span>
                  {comparison.isCurrent && (
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                      ✓ Selecionado
                    </span>
                  )}
                </div>

                <div
                  className="font-bold text-lg"
                  style={{ color: transport.color }}
                >
                  {formatNumber(comparison.co2)} kg
                </div>
              </div>

              {/* Barra de progresso */}
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out relative"
                    style={{
                      width: isAnimated ? `${comparison.percentage}%` : "0%",
                      backgroundColor: transport.color,
                    }}
                  >
                    {/* Efeito de brilho */}
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
                  </div>
                </div>

                {/* Valor sobre a barra */}
                {isAnimated && comparison.percentage > 15 && (
                  <div
                    className="absolute top-0 h-full flex items-center text-white text-xs font-bold px-2"
                    style={{
                      left: comparison.percentage > 50 ? "auto" : "4px",
                      right: comparison.percentage > 50 ? "4px" : "auto",
                    }}
                  >
                    {Math.round(comparison.percentage)}%
                  </div>
                )}
              </div>

              {/* Badge para transporte mais limpo */}
              {index === 0 && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg animate-pulse">
                    🏆 Mais Limpo
                  </div>
                </div>
              )}

              {/* Badge para transporte mais poluente */}
              {index === comparisons.length - 1 && comparisons.length > 1 && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                    ⚠️ Mais Poluente
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 text-center">
          💡 As barras mostram as emissões relativas. Escolha transportes com
          menor impacto ambiental!
        </p>
      </div>
    </section>
  );
}
