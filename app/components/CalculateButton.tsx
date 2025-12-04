"use client";

interface CalculateButtonProps {
  isValid: boolean;
  onClick: () => void;
}

export function CalculateButton({ isValid, onClick }: CalculateButtonProps) {
  return (
    <div className="text-center mb-6">
      <button
        onClick={onClick}
        disabled={!isValid}
        className={`
          px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-opacity-50
          ${
            isValid
              ? "bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl hover:scale-105 focus:ring-green-300"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
        `}
      >
        {isValid ? "Calcular Emissões" : "Preencha todos os campos"}
      </button>
    </div>
  );
}
