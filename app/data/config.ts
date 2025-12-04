import type { CO2Config, TransportId } from "../types";

export const CO2_CONFIG: CO2Config = {
  // Emissões de CO2 em kg por km por passageiro
  emissions: {
    car: 0.192, // Carro médio gasolina
    bus: 0.089, // Ônibus rodoviário
    train: 0.041, // Trem elétrico
    plane: 0.255, // Avião comercial
    bike: 0, // Bicicleta (zero emissões)
  },

  // Informações sobre cada meio de transporte
  transports: {
    car: {
      id: "car",
      name: "Carro",
      icon: "🚗",
      color: "#3498db",
      allowPassengers: true,
      defaultPassengers: 1,
    },
    bus: {
      id: "bus",
      name: "Ônibus",
      icon: "🚌",
      color: "#f39c12",
      allowPassengers: false,
    },
    train: {
      id: "train",
      name: "Trem",
      icon: "🚆",
      color: "#9b59b6",
      allowPassengers: false,
    },
    plane: {
      id: "plane",
      name: "Avião",
      icon: "✈️",
      color: "#e74c3c",
      allowPassengers: false,
    },
    bike: {
      id: "bike",
      name: "Bicicleta",
      icon: "🚴",
      color: "#2ecc71",
      allowPassengers: false,
    },
  },

  // Equivalências para contextualizar emissões
  equivalences: {
    trees: {
      label: "árvores necessárias para compensar (ano)",
      icon: "🌳",
      factor: 0.022, // Uma árvore absorve ~22kg CO2/ano
    },
    smartphones: {
      label: "cargas completas de smartphone",
      icon: "📱",
      factor: 8.22, // 8.22g CO2 por carga
    },
    lamps: {
      label: "horas de lâmpada LED acesa",
      icon: "💡",
      factor: 0.009, // 9g CO2 por hora (10W)
    },
    water: {
      label: "litros de água aquecida",
      icon: "♨️",
      factor: 0.113, // 113g CO2 por litro
    },
  },

  // Mensagens de feedback baseadas no nível de emissão
  feedbackMessages: {
    veryLow: {
      threshold: 5,
      message: "Excelente escolha! Emissão muito baixa de CO₂.",
      emoji: "🌟",
    },
    low: {
      threshold: 20,
      message: "Boa escolha! Emissão relativamente baixa de CO₂.",
      emoji: "✅",
    },
    medium: {
      threshold: 50,
      message:
        "Emissão moderada de CO₂. Considere alternativas mais sustentáveis.",
      emoji: "⚠️",
    },
    high: {
      threshold: 100,
      message:
        "Emissão alta de CO₂. Avalie opções mais ecológicas quando possível.",
      emoji: "🔴",
    },
    veryHigh: {
      threshold: Infinity,
      message:
        "Emissão muito alta de CO₂! Considere fortemente alternativas sustentáveis.",
      emoji: "🚨",
    },
  },
};

// Mapeamento de cores dos transportes para Tailwind CSS
export const TRANSPORT_COLORS: Record<TransportId, string> = {
  car: "bg-blue-500",
  bus: "bg-orange-500",
  train: "bg-purple-500",
  plane: "bg-red-500",
  bike: "bg-green-500",
};

export const TRANSPORT_TEXT_COLORS: Record<TransportId, string> = {
  car: "text-blue-500",
  bus: "text-orange-500",
  train: "text-purple-500",
  plane: "text-red-500",
  bike: "text-green-500",
};
