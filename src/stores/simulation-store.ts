import { create } from 'zustand';

interface SimulationInput {
  patrimonio: string;
  empresas: string;
  perfil: string;
  herdeiros: string;
  imoveis: string;
  valorMercado: string;
  valorVenal: string;
}

interface SimulationResult {
  economiaFiscal: number;
  protecaoPatrimonial: number;
  sucessaoEficiente: number;
  governancaFamiliar: number;
  cenarioAtual: {
    custoTotal: number;
    impostos: number;
    riscos: number;
  };
  cenarioHolding: {
    custoTotal: number;
    impostos: number;
    riscos: number;
  };
}

interface SimulationState {
  inputs: SimulationInput;
  results: SimulationResult | null;
  isLoading: boolean;
  hasSimulated: boolean;
  errors: Record<string, string>;
  
  setInput: (field: keyof SimulationInput, value: string) => void;
  validateInputs: () => boolean;
  runSimulation: () => void;
  resetSimulation: () => void;
}

const defaultInputs: SimulationInput = {
  patrimonio: '',
  empresas: '',
  perfil: 'empresario',
  herdeiros: '',
  imoveis: '',
  valorMercado: '',
  valorVenal: ''
};

// Função para simular o cálculo dos resultados com base nos inputs
const calculateResults = (inputs: SimulationInput): SimulationResult => {
  // Converter strings para números
  const patrimonio = parseFloat(inputs.patrimonio) || 0;
  const empresas = parseInt(inputs.empresas) || 0;
  const herdeiros = parseInt(inputs.herdeiros) || 0;
  const imoveis = parseInt(inputs.imoveis) || 0;
  const valorMercado = parseFloat(inputs.valorMercado) || 0;
  const valorVenal = parseFloat(inputs.valorVenal) || 0;
  
  // Cálculos simulados (em uma aplicação real, estes seriam baseados em fórmulas específicas)
  const cenarioAtualImpostos = patrimonio * 0.08;
  const cenarioAtualRiscos = patrimonio * 0.15;
  const cenarioAtualCustoTotal = cenarioAtualImpostos + cenarioAtualRiscos;
  
  const cenarioHoldingImpostos = patrimonio * 0.03;
  const cenarioHoldingRiscos = patrimonio * 0.05;
  const cenarioHoldingCustoTotal = cenarioHoldingImpostos + cenarioHoldingRiscos;
  
  const economiaFiscal = ((cenarioAtualImpostos - cenarioHoldingImpostos) / cenarioAtualImpostos) * 100;
  const protecaoPatrimonial = ((cenarioAtualRiscos - cenarioHoldingRiscos) / cenarioAtualRiscos) * 100;
  const sucessaoEficiente = herdeiros > 0 ? 95 : 0;
  const governancaFamiliar = empresas > 1 ? 90 : 70;
  
  return {
    economiaFiscal,
    protecaoPatrimonial,
    sucessaoEficiente,
    governancaFamiliar,
    cenarioAtual: {
      custoTotal: cenarioAtualCustoTotal,
      impostos: cenarioAtualImpostos,
      riscos: cenarioAtualRiscos
    },
    cenarioHolding: {
      custoTotal: cenarioHoldingCustoTotal,
      impostos: cenarioHoldingImpostos,
      riscos: cenarioHoldingRiscos
    }
  };
};

export const useSimulationStore = create<SimulationState>((set, get) => ({
  inputs: defaultInputs,
  results: null,
  isLoading: false,
  hasSimulated: false,
  errors: {},
  
  setInput: (field, value) => {
    set((state) => ({
      inputs: {
        ...state.inputs,
        [field]: value
      },
      errors: {
        ...state.errors,
        [field]: ''
      }
    }));
  },
  
  validateInputs: () => {
    const { inputs } = get();
    const newErrors: Record<string, string> = {};
    let isValid = true;
    
    if (!inputs.patrimonio) {
      newErrors.patrimonio = 'Patrimônio total é obrigatório';
      isValid = false;
    }
    
    if (!inputs.empresas) {
      newErrors.empresas = 'Número de empresas é obrigatório';
      isValid = false;
    }
    
    if (!inputs.herdeiros) {
      newErrors.herdeiros = 'Número de herdeiros é obrigatório';
      isValid = false;
    }
    
    if (!inputs.imoveis) {
      newErrors.imoveis = 'Número de imóveis é obrigatório';
      isValid = false;
    }
    
    if (!inputs.valorMercado) {
      newErrors.valorMercado = 'Valor de mercado é obrigatório';
      isValid = false;
    }
    
    if (!inputs.valorVenal) {
      newErrors.valorVenal = 'Valor venal é obrigatório';
      isValid = false;
    }
    
    set({ errors: newErrors });
    return isValid;
  },
  
  runSimulation: () => {
    const isValid = get().validateInputs();
    
    if (isValid) {
      set({ isLoading: true });
      
      // Simulando uma chamada de API com setTimeout
      setTimeout(() => {
        const results = calculateResults(get().inputs);
        set({ 
          results, 
          isLoading: false,
          hasSimulated: true
        });
      }, 1000);
    }
  },
  
  resetSimulation: () => {
    set({
      inputs: defaultInputs,
      results: null,
      hasSimulated: false,
      errors: {}
    });
  }
}));
