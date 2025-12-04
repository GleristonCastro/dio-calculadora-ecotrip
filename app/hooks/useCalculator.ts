"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { ROUTES_DATA } from "../data/routes";
import {
  validateCalculationData,
  calculateCO2,
  calculateEquivalences,
  prepareTransportComparison,
  getFeedbackMessage,
} from "../utils/calculator";
import type {
  TransportId,
  AppState,
  CalculationResult,
  EquivalenceResult,
  TransportComparison,
  FeedbackMessage,
} from "../types";

interface UseCalculatorReturn {
  // Estado
  state: AppState;

  // Resultados
  result: CalculationResult | null;
  equivalences: Record<string, EquivalenceResult> | null;
  comparison: TransportComparison[] | null;
  feedback: FeedbackMessage | null;

  // Estado da UI
  isFormValid: boolean;
  hasResults: boolean;

  // Ações
  setOrigin: (origin: string) => void;
  setDestination: (destination: string) => void;
  setTransport: (transport: TransportId) => void;
  setPassengers: (passengers: number) => void;
  calculate: () => { success: boolean; message?: string };
  clearResults: () => void;
}

export function useCalculator(): UseCalculatorReturn {
  // Estado principal da aplicação
  const [state, setState] = useState<AppState>({
    origin: null,
    destination: null,
    transport: null,
    passengers: 1,
    distance: null,
  });

  // Estado dos resultados
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [equivalences, setEquivalences] = useState<Record<
    string,
    EquivalenceResult
  > | null>(null);
  const [comparison, setComparison] = useState<TransportComparison[] | null>(
    null
  );
  const [feedback, setFeedback] = useState<FeedbackMessage | null>(null);

  // Calcula a distância quando origem ou destino mudam
  const updateDistance = useCallback(
    (origin: string | null, destination: string | null) => {
      if (!origin || !destination || origin === destination) {
        return null;
      }
      return ROUTES_DATA.getDistance(origin, destination);
    },
    []
  );

  // Verifica se o formulário está válido
  const isFormValid = useMemo(() => {
    return !!(
      state.origin &&
      state.destination &&
      state.transport &&
      state.origin !== state.destination &&
      state.distance !== null
    );
  }, [state.origin, state.destination, state.transport, state.distance]);

  // Verifica se há resultados
  const hasResults = useMemo(() => {
    return result !== null;
  }, [result]);

  // Ação: definir origem
  const setOrigin = useCallback(
    (origin: string) => {
      setState((prevState) => {
        const newState = {
          ...prevState,
          origin,
          distance: updateDistance(origin, prevState.destination),
        };
        return newState;
      });
      // Limpa resultados quando muda origem
      if (result) clearResults();
    },
    [result, updateDistance]
  );

  // Ação: definir destino
  const setDestination = useCallback(
    (destination: string) => {
      setState((prevState) => {
        const newState = {
          ...prevState,
          destination,
          distance: updateDistance(prevState.origin, destination),
        };
        return newState;
      });
      // Limpa resultados quando muda destino
      if (result) clearResults();
    },
    [result, updateDistance]
  );

  // Ação: definir transporte
  const setTransport = useCallback(
    (transport: TransportId) => {
      setState((prevState) => ({
        ...prevState,
        transport,
        // Reset passengers se não for carro
        passengers: transport !== "car" ? 1 : prevState.passengers,
      }));
      // Limpa resultados quando muda transporte
      if (result) clearResults();
    },
    [result]
  );

  // Ação: definir passageiros
  const setPassengers = useCallback(
    (passengers: number) => {
      const validPassengers = passengers > 0 ? passengers : 1;
      setState((prevState) => ({
        ...prevState,
        passengers: validPassengers,
      }));
      // Limpa resultados quando muda passageiros
      if (result) clearResults();
    },
    [result]
  );

  // Ação: calcular emissões
  const calculate = useCallback((): { success: boolean; message?: string } => {
    // Valida os dados
    const validation = validateCalculationData(
      state.origin,
      state.destination,
      state.transport
    );

    if (!validation.valid) {
      return {
        success: false,
        message: validation.message,
      };
    }

    const distance = validation.distance!;
    const co2 = calculateCO2(distance, state.transport!, state.passengers);

    if (co2 === null) {
      return {
        success: false,
        message: "Erro ao calcular emissões",
      };
    }

    // Define os resultados
    const calculationResult: CalculationResult = {
      co2,
      distance,
      transport: state.transport!,
      passengers: state.passengers,
    };

    const equivalenceResults = calculateEquivalences(co2);
    const comparisonResults = prepareTransportComparison(
      distance,
      state.transport!,
      state.passengers
    );
    const feedbackMessage = getFeedbackMessage(co2);

    // Atualiza todos os estados de resultado
    setResult(calculationResult);
    setEquivalences(equivalenceResults);
    setComparison(comparisonResults);
    setFeedback(feedbackMessage);

    return { success: true };
  }, [state]);

  // Ação: limpar resultados
  const clearResults = useCallback(() => {
    setResult(null);
    setEquivalences(null);
    setComparison(null);
    setFeedback(null);
  }, []);

  // Efeito: Cálculo automático quando formulário válido
  useEffect(() => {
    if (isFormValid) {
      const timer = setTimeout(() => {
        calculate();
      }, 500); // Pequeno delay para evitar cálculos excessivos durante a digitação

      return () => clearTimeout(timer);
    }
  }, [
    isFormValid,
    state.origin,
    state.destination,
    state.transport,
    state.passengers,
    calculate,
  ]);

  return {
    // Estado
    state,

    // Resultados
    result,
    equivalences,
    comparison,
    feedback,

    // Estado da UI
    isFormValid,
    hasResults,

    // Ações
    setOrigin,
    setDestination,
    setTransport,
    setPassengers,
    calculate,
    clearResults,
  };
}
