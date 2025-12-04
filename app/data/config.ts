import type { CO2Config, TransportId } from "../types";

export const CO2_CONFIG: CO2Config = {
  // Emissões de CO2 em kg por km por passageiro (baseado no levantamento)
  emissions: {
    bike: 0.0, // Bicicleta (zero emissões)
    electricCar: 0.022, // Carro Elétrico (BEV)
    train: 0.035, // Trem/Metrô (média 0.020-0.050)
    hybridCar: 0.051, // Carro Híbrido Flex
    bus: 0.075, // Ônibus Urbano (média 0.050-0.100)
    motorcycle: 0.13, // Motocicleta (média 0.110-0.150)
    plane: 0.123, // Avião
    car: 0.148, // Carro Flex/Gasolina
  },

  // Informações sobre cada meio de transporte
  transports: {
    bike: {
      id: "bike",
      name: "Bicicleta",
      icon: "🚴",
      color: "#22c55e",
      allowPassengers: false,
    },
    electricCar: {
      id: "electricCar",
      name: "Carro Elétrico",
      icon: "🔋",
      color: "#10b981",
      allowPassengers: true,
      defaultPassengers: 1,
    },
    train: {
      id: "train",
      name: "Trem/Metrô",
      icon: "🚆",
      color: "#8b5cf6",
      allowPassengers: false,
    },
    hybridCar: {
      id: "hybridCar",
      name: "Carro Híbrido",
      icon: "🌱",
      color: "#06b6d4",
      allowPassengers: true,
      defaultPassengers: 1,
    },
    bus: {
      id: "bus",
      name: "Ônibus",
      icon: "🚌",
      color: "#f59e0b",
      allowPassengers: false,
    },
    motorcycle: {
      id: "motorcycle",
      name: "Motocicleta",
      icon: "🏍️",
      color: "#f97316",
      allowPassengers: true,
      defaultPassengers: 1,
    },
    plane: {
      id: "plane",
      name: "Avião",
      icon: "✈️",
      color: "#ef4444",
      allowPassengers: false,
    },
    car: {
      id: "car",
      name: "Carro Flex/Gasolina",
      icon: "🚗",
      color: "#dc2626",
      allowPassengers: true,
      defaultPassengers: 1,
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
  bike: "bg-green-500",
  electricCar: "bg-emerald-500",
  train: "bg-violet-500",
  hybridCar: "bg-cyan-500",
  bus: "bg-amber-500",
  motorcycle: "bg-orange-500",
  plane: "bg-red-500",
  car: "bg-red-600",
};

export const TRANSPORT_TEXT_COLORS: Record<TransportId, string> = {
  bike: "text-green-500",
  electricCar: "text-emerald-500",
  train: "text-violet-500",
  hybridCar: "text-cyan-500",
  bus: "text-amber-500",
  motorcycle: "text-orange-500",
  plane: "text-red-500",
  car: "text-red-600",
};
