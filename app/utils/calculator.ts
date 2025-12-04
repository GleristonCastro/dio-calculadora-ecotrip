import { CO2_CONFIG } from "../data/config";
import { ROUTES_DATA } from "../data/routes";
import type {
  TransportId,
  ValidationResult,
  EquivalenceResult,
  FeedbackMessage,
  TransportComparison,
} from "../types";

// Calcula as emissões de CO2 para uma viagem
export function calculateCO2(
  distance: number,
  transport: TransportId,
  passengers: number = 1
): number | null {
  if (!distance || !transport) return null;

  const emissionRate = CO2_CONFIG.emissions[transport as TransportId];
  if (emissionRate === undefined) return null;

  // Para carro, divide pela quantidade de passageiros
  if (transport === "car" && passengers > 1) {
    return (distance * emissionRate) / passengers;
  }

  return distance * emissionRate;
}

// Calcula emissões para todos os transportes
export function calculateAllTransports(
  distance: number,
  passengers: number = 1
): Record<TransportId, number> {
  const results: Record<TransportId, number> = {} as Record<
    TransportId,
    number
  >;

  // Lista atualizada com todos os transportes do levantamento
  const transportIds: TransportId[] = [
    "bike",
    "electricCar",
    "train",
    "hybridCar",
    "bus",
    "motorcycle",
    "plane",
    "car",
  ];

  for (const transportId of transportIds) {
    // Aplicar passageiros apenas para veículos individuais
    const usePassengers = [
      "car",
      "electricCar",
      "hybridCar",
      "motorcycle",
    ].includes(transportId);
    const co2 = calculateCO2(
      distance,
      transportId,
      usePassengers ? passengers : 1
    );
    results[transportId] = co2 || 0;
  }

  return results;
}

// Calcula as equivalências
export function calculateEquivalences(
  co2Amount: number
): Record<string, EquivalenceResult> {
  const equivalences: Record<string, EquivalenceResult> = {};

  for (const key in CO2_CONFIG.equivalences) {
    const eq =
      CO2_CONFIG.equivalences[key as keyof typeof CO2_CONFIG.equivalences];
    equivalences[key] = {
      value: co2Amount / eq.factor,
      label: eq.label,
      icon: eq.icon,
    };
  }

  return equivalences;
}

// Obtém mensagem de feedback baseada na emissão
export function getFeedbackMessage(co2Amount: number): FeedbackMessage {
  const messages = CO2_CONFIG.feedbackMessages;

  if (co2Amount <= messages.veryLow.threshold) {
    return messages.veryLow;
  } else if (co2Amount <= messages.low.threshold) {
    return messages.low;
  } else if (co2Amount <= messages.medium.threshold) {
    return messages.medium;
  } else if (co2Amount <= messages.high.threshold) {
    return messages.high;
  } else {
    return messages.veryHigh;
  }
}

// Formata número com decimais
export function formatNumber(number: number, decimals: number = 2): string {
  return number.toFixed(decimals).replace(".", ",");
}

// Formata número grande com separador de milhares
export function formatLargeNumber(
  number: number,
  decimals: number = 0
): string {
  return number
    .toFixed(decimals)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Valida se os dados estão completos para cálculo
export function validateCalculationData(
  origin: string | null,
  destination: string | null,
  transport: TransportId | null
): ValidationResult {
  if (!origin || !destination || !transport) {
    return {
      valid: false,
      message: "Por favor, preencha todos os campos",
    };
  }

  if (origin === destination) {
    return {
      valid: false,
      message: "Origem e destino devem ser diferentes",
    };
  }

  const distance = ROUTES_DATA.getDistance(origin, destination);
  if (!distance) {
    return {
      valid: false,
      message: "Rota não encontrada",
    };
  }

  return {
    valid: true,
    distance: distance,
  };
}

// Encontra o transporte mais e menos poluente
export function getTransportExtremes(
  allEmissions: Record<TransportId, number>
): {
  min: { transport: TransportId; value: number };
  max: { transport: TransportId; value: number };
} {
  let min = { transport: "bike" as TransportId, value: Infinity };
  let max = { transport: "bike" as TransportId, value: -Infinity };

  for (const transport in allEmissions) {
    const transportId = transport as TransportId;
    const value = allEmissions[transportId];

    if (value < min.value) {
      min = { transport: transportId, value };
    }
    if (value > max.value) {
      max = { transport: transportId, value };
    }
  }

  return { min, max };
}

// Calcula a porcentagem relativa ao máximo
export function calculatePercentage(value: number, maxValue: number): number {
  if (maxValue === 0) return 0;
  return (value / maxValue) * 100;
}

// Prepara dados para comparação entre transportes
export function prepareTransportComparison(
  distance: number,
  currentTransport: TransportId,
  passengers: number = 1
): TransportComparison[] {
  const allEmissions = calculateAllTransports(distance, passengers);
  const extremes = getTransportExtremes(allEmissions);

  // Ordena os transportes por emissão (do menor para o maior)
  const sortedTransports = (Object.keys(allEmissions) as TransportId[]).sort(
    (a, b) => allEmissions[a] - allEmissions[b]
  );

  return sortedTransports.map((transportId) => {
    const co2 = allEmissions[transportId];
    const percentage = calculatePercentage(co2, extremes.max.value);
    const isCurrent = transportId === currentTransport;

    return {
      transport: transportId,
      co2,
      percentage,
      isCurrent,
    };
  });
}
