"use client";

interface StatusIndicatorProps {
  isValid: boolean;
  hasResults: boolean;
}

export function StatusIndicator({ isValid, hasResults }: StatusIndicatorProps) {
  // Oculta o indicador quando há resultados (interface mais limpa)
  if (hasResults) {
    return null;
  }

  // Mostra apenas quando não há campos preenchidos
  if (!isValid) {
    return (
      <div className="bg-gray-100/90 backdrop-blur-lg border border-gray-300/50 rounded-lg p-4 text-center">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
          <span className="text-gray-600 font-medium">
            Preencha todos os campos ao lado para ver os resultados
          </span>
        </div>
      </div>
    );
  }

  // Mostra brevemente durante o cálculo
  return (
    <div className="bg-blue-100/90 backdrop-blur-lg border border-blue-300/50 rounded-lg p-4 text-center">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        <span className="text-blue-700 font-medium">
          Calculando emissões...
        </span>
      </div>
    </div>
  );
}
