// ===================================
// INTERFACES TYPESCRIPT
// ===================================

export interface City {
  id: string;
  name: string;
}

export interface Transport {
  id: TransportId;
  name: string;
  icon: string;
  color: string;
  allowPassengers: boolean;
  defaultPassengers?: number;
}

export type TransportId =
  | "bike"
  | "electricCar"
  | "train"
  | "hybridCar"
  | "bus"
  | "motorcycle"
  | "plane"
  | "car";

export type EmissionsConfig = Record<TransportId, number>;

export type TransportsConfig = Record<TransportId, Transport>;

export interface Equivalence {
  label: string;
  icon: string;
  factor: number;
}

export interface EquivalencesConfig {
  trees: Equivalence;
  smartphones: Equivalence;
  lamps: Equivalence;
  water: Equivalence;
}

export interface FeedbackMessage {
  threshold: number;
  message: string;
  emoji: string;
}

export interface FeedbackMessages {
  veryLow: FeedbackMessage;
  low: FeedbackMessage;
  medium: FeedbackMessage;
  high: FeedbackMessage;
  veryHigh: FeedbackMessage;
}

export interface CO2Config {
  emissions: EmissionsConfig;
  transports: TransportsConfig;
  equivalences: EquivalencesConfig;
  feedbackMessages: FeedbackMessages;
}

export interface RoutesData {
  cities: City[];
  routes: { [key: string]: number };
  getDistance: (origin: string, destination: string) => number | null;
  getCityName: (cityId: string) => string | null;
}

export interface CalculationResult {
  co2: number;
  distance: number;
  transport: TransportId;
  passengers: number;
}

export interface EquivalenceResult {
  value: number;
  label: string;
  icon: string;
}

export interface ValidationResult {
  valid: boolean;
  message?: string;
  distance?: number;
}

export interface AppState {
  origin: string | null;
  destination: string | null;
  transport: TransportId | null;
  passengers: number;
  distance: number | null;
}

export interface TransportComparison {
  transport: TransportId;
  co2: number;
  percentage: number;
  isCurrent: boolean;
}
