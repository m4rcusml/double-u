import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Interfaces para os dados de cada etapa
interface PersonalFamilyData {
  fullName: string;
  phone: string;
  birthDate: string;
  cpf: string;
  rg: string;
  maritalStatus: string;
  nationality: string;
  profession: string;
  fullAddress: string;
  spouseFullName?: string;
  spouseCpf?: string;
  numberOfChildren: string;
  children: Array<{
    name: string;
    age: string;
    cpf: string;
    rg: string;
    birthDate: string;
  }>;
  otherDependents?: string;
  familySituation?: string;
}

interface PatrimonialData {
  totalEstimatedAssets: string;
  properties: Array<{
    type: string;
    location: string;
    value: string;
    situation: string;
  }>;
  companyShares: Array<{
    companyName: string;
    participationPercentage: string;
    estimatedValue: string;
  }>;
  financialInvestments: string;
  vehiclesValue: string;
  otherAssets?: string;
  debtsAndLiabilities: string;
  futureAcquisitions?: string;
  assetOrganizationLevel: string;
}

interface ObjectivesStrategyData {
  mainObjectives: string[];
  objectivePrioritization: string;
  growthExpectations: string;
  successionPlans: string;
  patrimonialConcerns: string;
  implementationTimeline: string;
  managementChangeWillingness: string;
}

interface Document {
  id: number;
  name: string;
  description: string;
  status: 'PENDENTE' | 'ENVIADO' | 'EM ANÁLISE' | 'APROVADO' | 'REJEITADO';
  file?: File;
  rejectionReason?: string;
}

interface DocumentationData {
  documents: Document[];
  notes?: string;
}

interface RisksOpportunitiesData {
  riskyActivities: string;
  ongoingLawsuits: string;
  potentialDebts: string;
  conflictingRelationships: string;
  inheritanceExpectation: string;
  businessExpansionPlans: string;
  internationalResidencyPlans: string;
  privacyConcerns: string;
}

interface GovernanceData {
  administratorPreference: string;
  decisionMakingProcess: string;
  entryExitRules: string;
  profitDistributionPolicy: string;
  restrictions: string[];
  corporateModelPreference: string;
  shareholderAgreementNeed: string;
  familyCouncilNeed: string;
}

// Interface para os erros de validação
interface FormErrors {
  [key: string]: string;
}

// Interface para o estado global da aplicação
interface HoldingState {
  // Navegação e progresso
  currentStep: number;
  totalSteps: number;
  displaySteps: number;
  processStatus: 'PENDENTE' | 'EM ANÁLISE' | 'AGUARDANDO INFORMAÇÕES' | 'CONCLUÍDO';
  
  // Dados de cada etapa
  step1Data: PersonalFamilyData;
  step2Data: PatrimonialData;
  step3Data: ObjectivesStrategyData;
  step4Data: DocumentationData;
  step5Data: RisksOpportunitiesData;
  step6Data: GovernanceData;
  
  // Erros de validação
  step1Errors: FormErrors;
  step2Errors: FormErrors;
  step3Errors: FormErrors;
  step4Errors: FormErrors;
  step5Errors: FormErrors;
  step6Errors: FormErrors;
  
  // Ações
  nextStep: () => void;
  prevStep: () => void;
  setCurrentStep: (step: number) => void;
  setProcessStatus: (status: 'PENDENTE' | 'EM ANÁLISE' | 'AGUARDANDO INFORMAÇÕES' | 'CONCLUÍDO') => void;
  
  // Atualização de dados
  updateStep1Data: (field: keyof PersonalFamilyData, value: any) => void;
  updateStep2Data: (field: keyof PatrimonialData, value: any) => void;
  updateStep3Data: (field: keyof ObjectivesStrategyData, value: any) => void;
  updateStep4Data: (field: keyof DocumentationData, value: any) => void;
  updateStep5Data: (field: keyof RisksOpportunitiesData, value: any) => void;
  updateStep6Data: (field: keyof GovernanceData, value: any) => void;
  
  // Atualização de dados específicos
  updateChildData: (index: number, field: string, value: string) => void;
  updateDocumentStatus: (docId: number, status: 'PENDENTE' | 'ENVIADO' | 'EM ANÁLISE' | 'APROVADO' | 'REJEITADO') => void;
  uploadDocument: (docId: number, file: File) => void;
  
  // Validação
  validateStep1: () => boolean;
  validateStep2: () => boolean;
  validateStep3: () => boolean;
  validateStep4: () => boolean;
  validateStep5: () => boolean;
  validateStep6: () => boolean;
  handleStepSubmit: (step: number) => void;
  
  // Reset
  resetForm: () => void;
}

// Lista inicial de documentos
const initialDocuments: Document[] = [
  { id: 1, name: 'Documentos Pessoais (Titular)', description: 'RG, CPF, Comprovante de Residência, Certidão de Casamento/Nascimento', status: 'PENDENTE' },
  { id: 2, name: 'Documentos Dependentes/Herdeiros', description: 'RG, CPF (se aplicável)', status: 'PENDENTE' },
  { id: 3, name: 'Certidões de Matrícula Imóveis', description: 'Certidões atualizadas de todos os imóveis', status: 'PENDENTE' },
  { id: 4, name: 'Contratos Sociais/Estatutos', description: 'Documentos das empresas com participação societária', status: 'PENDENTE' },
  { id: 5, name: 'Declaração de Imposto de Renda', description: 'Últimas 2 declarações completas', status: 'PENDENTE' },
  { id: 6, name: 'Documentos de Veículos/Bens Móveis', description: 'Documentos relevantes de veículos e outros bens de valor', status: 'PENDENTE' },
  { id: 7, name: 'Contratos de Financiamento/Dívidas', description: 'Contratos vigentes de empréstimos e financiamentos', status: 'PENDENTE' },
  { id: 8, name: 'Inventários (se aplicável)', description: 'Documentação de inventários concluídos ou em andamento', status: 'PENDENTE' },
];

// Estado inicial
const initialState = {
  // Navegação e progresso
  currentStep: 1,
  totalSteps: 6,
  displaySteps: 7,
  processStatus: 'EM ANÁLISE' as const,
  
  // Dados de cada etapa
  step1Data: {
    fullName: '',
    phone: '',
    birthDate: '',
    cpf: '',
    rg: '',
    maritalStatus: '',
    nationality: '',
    profession: '',
    fullAddress: '',
    numberOfChildren: '0',
    children: [],
    otherDependents: '',
    familySituation: ''
  },
  step2Data: {
    totalEstimatedAssets: '',
    properties: [],
    companyShares: [],
    financialInvestments: '',
    vehiclesValue: '',
    debtsAndLiabilities: '',
    assetOrganizationLevel: ''
  },
  step3Data: {
    mainObjectives: [],
    objectivePrioritization: '',
    growthExpectations: '',
    successionPlans: '',
    patrimonialConcerns: '',
    implementationTimeline: '',
    managementChangeWillingness: ''
  },
  step4Data: {
    documents: initialDocuments,
    notes: ''
  },
  step5Data: {
    riskyActivities: '',
    ongoingLawsuits: '',
    potentialDebts: '',
    conflictingRelationships: '',
    inheritanceExpectation: '',
    businessExpansionPlans: '',
    internationalResidencyPlans: '',
    privacyConcerns: ''
  },
  step6Data: {
    administratorPreference: '',
    decisionMakingProcess: '',
    entryExitRules: '',
    profitDistributionPolicy: '',
    restrictions: [],
    corporateModelPreference: '',
    shareholderAgreementNeed: '',
    familyCouncilNeed: ''
  },
  
  // Erros de validação
  step1Errors: {},
  step2Errors: {},
  step3Errors: {},
  step4Errors: {},
  step5Errors: {},
  step6Errors: {},
};

// Criação do store com Zustand
const useHoldingStore = create<HoldingState>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Navegação
      nextStep: () => {
        const { currentStep, displaySteps } = get();
        if (currentStep < displaySteps) {
          set({ currentStep: currentStep + 1 });
          window.scrollTo(0, 0);
        }
      },
      
      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
          window.scrollTo(0, 0);
        }
      },
      
      setCurrentStep: (step: number) => set({ currentStep: step }),
      
      setProcessStatus: (status) => set({ processStatus: status }),
      
      // Atualização de dados
      updateStep1Data: (field, value) => {
        set((state) => {
          // Limpar erro se existir
          const errors = { ...state.step1Errors };
          if (errors[field as string]) {
            delete errors[field as string];
          }
          
          return {
            step1Data: { ...state.step1Data, [field]: value },
            step1Errors: errors
          };
        });
        
        // Gerenciar campos de filhos quando o número de filhos mudar
        if (field === 'numberOfChildren') {
          const { step1Data } = get();
          const childrenCount = parseInt(value as string) || 0;
          const currentChildrenCount = step1Data.children.length;
          
          if (childrenCount > currentChildrenCount) {
            // Adicionar mais campos de filhos
            const newChildren = [...step1Data.children];
            for (let i = currentChildrenCount; i < childrenCount; i++) {
              newChildren.push({ name: '', age: '', cpf: '', rg: '', birthDate: '' });
            }
            set((state) => ({
              step1Data: { ...state.step1Data, children: newChildren }
            }));
          } else if (childrenCount < currentChildrenCount) {
            // Remover campos de filhos excedentes
            const newChildren = step1Data.children.slice(0, childrenCount);
            set((state) => ({
              step1Data: { ...state.step1Data, children: newChildren }
            }));
          }
        }
      },
      
      updateStep2Data: (field, value) => {
        set((state) => {
          // Limpar erro se existir
          const errors = { ...state.step2Errors };
          if (errors[field as string]) {
            delete errors[field as string];
          }
          
          return {
            step2Data: { ...state.step2Data, [field]: value },
            step2Errors: errors
          };
        });
      },
      
      updateStep3Data: (field, value) => {
        set((state) => {
          // Limpar erro se existir
          const errors = { ...state.step3Errors };
          if (errors[field as string]) {
            delete errors[field as string];
          }
          
          return {
            step3Data: { ...state.step3Data, [field]: value },
            step3Errors: errors
          };
        });
      },
      
      updateStep4Data: (field, value) => {
        set((state) => {
          // Limpar erro se existir
          const errors = { ...state.step4Errors };
          if (errors[field as string]) {
            delete errors[field as string];
          }
          
          return {
            step4Data: { ...state.step4Data, [field]: value },
            step4Errors: errors
          };
        });
      },
      
      updateStep5Data: (field, value) => {
        set((state) => {
          // Limpar erro se existir
          const errors = { ...state.step5Errors };
          if (errors[field as string]) {
            delete errors[field as string];
          }
          
          return {
            step5Data: { ...state.step5Data, [field]: value },
            step5Errors: errors
          };
        });
      },
      
      updateStep6Data: (field, value) => {
        set((state) => {
          // Limpar erro se existir
          const errors = { ...state.step6Errors };
          if (errors[field as string]) {
            delete errors[field as string];
          }
          
          return {
            step6Data: { ...state.step6Data, [field]: value },
            step6Errors: errors
          };
        });
      },
      
      // Atualização de dados específicos
      updateChildData: (index, field, value) => {
        set((state) => {
          const newChildren = [...state.step1Data.children];
          newChildren[index] = { ...newChildren[index], [field]: value };
          
          // Limpar erro se existir
          const errors = { ...state.step1Errors };
          const errorKey = `children.${index}.${field}`;
          if (errors[errorKey]) {
            delete errors[errorKey];
          }
          
          return {
            step1Data: { ...state.step1Data, children: newChildren },
            step1Errors: errors
          };
        });
      },
      
      updateDocumentStatus: (docId, status) => {
        set((state) => {
          const updatedDocs = state.step4Data.documents.map(doc =>
            doc.id === docId ? { ...doc, status } : doc
          );
          
          return {
            step4Data: { ...state.step4Data, documents: updatedDocs }
          };
        });
      },
      
      uploadDocument: (docId, file) => {
        set((state) => {
          const updatedDocs = state.step4Data.documents.map(doc =>
            doc.id === docId ? { ...doc, file, status: 'ENVIADO' as const } : doc
          );
          
          // Limpar erro se existir
          const errors = { ...state.step4Errors };
          if (errors.documents) {
            delete errors.documents;
          }
          
          return {
            step4Data: { ...state.step4Data, documents: updatedDocs },
            step4Errors: errors
          };
        });
      },
      
      // Validação
      validateStep1: () => {
        const { step1Data } = get();
        const errors: FormErrors = {};
        
        // Validação de dados pessoais
        if (!step1Data.fullName.trim()) errors.fullName = 'Nome completo é obrigatório';
        if (!step1Data.cpf.trim()) errors.cpf = 'CPF é obrigatório';
        if (!step1Data.phone.trim()) errors.phone = 'Telefone é obrigatório';
        if (!step1Data.birthDate.trim()) errors.birthDate = 'Data de nascimento é obrigatória';
        if (!step1Data.rg.trim()) errors.rg = 'RG é obrigatório';
        if (!step1Data.maritalStatus) errors.maritalStatus = 'Estado civil é obrigatório';
        if (!step1Data.nationality.trim()) errors.nationality = 'Nacionalidade é obrigatória';
        if (!step1Data.profession.trim()) errors.profession = 'Profissão é obrigatória';
        if (!step1Data.fullAddress.trim()) errors.fullAddress = 'Endereço é obrigatório';
        
        // Validação de filhos se houver
        if (parseInt(step1Data.numberOfChildren) > 0) {
          step1Data.children.forEach((child, index) => {
            if (!child.name.trim()) errors[`children.${index}.name`] = 'Nome é obrigatório';
            if (!child.cpf.trim()) errors[`children.${index}.cpf`] = 'CPF é obrigatório';
            // Adicione mais validações conforme necessário
          });
        }
        
        set({ step1Errors: errors });
        return Object.keys(errors).length === 0;
      },
      
      validateStep2: () => {
        const { step2Data } = get();
        const errors: FormErrors = {};
        
        if (!step2Data.totalEstimatedAssets.trim()) errors.totalEstimatedAssets = 'Patrimônio total estimado é obrigatório';
        if (!step2Data.assetOrganizationLevel) errors.assetOrganizationLevel = 'Grau de organização é obrigatório';
        // Adicione mais validações conforme necessário
        
        set({ step2Errors: errors });
        return Object.keys(errors).length === 0;
      },
      
      validateStep3: () => {
        const { step3Data } = get();
        const errors: FormErrors = {};
        
        // Validações para a etapa 3
        // Exemplo: if (step3Data.mainObjectives.length === 0) errors.mainObjectives = 'Selecione ao menos um objetivo';
        
        set({ step3Errors: errors });
        return Object.keys(errors).length === 0;
      },
      
      validateStep4: () => {
        const { step4Data } = get();
        const errors: FormErrors = {};
        
        // Validações para a etapa 4
        // Exemplo: const pendingDocs = step4Data.documents.filter(doc => doc.status === 'PENDENTE').length;
        // if (pendingDocs > 0) errors.documents = `Ainda há ${pendingDocs} documentos pendentes.`;
        
        set({ step4Errors: errors });
        return Object.keys(errors).length === 0;
      },
      
      validateStep5: () => {
        const { step5Data } = get();
        const errors: FormErrors = {};
        
        // Validações para a etapa 5
        
        set({ step5Errors: errors });
        return Object.keys(errors).length === 0;
      },
      
      validateStep6: () => {
        const { step6Data } = get();
        const errors: FormErrors = {};
        
        if (!step6Data.administratorPreference) errors.administratorPreference = 'Preferência de administrador é obrigatória';
        // Adicione mais validações conforme necessário
        
        set({ step6Errors: errors });
        return Object.keys(errors).length === 0;
      },
      
      handleStepSubmit: (step: number) => {
        const store = get();
        const validationFunctions = [
          store.validateStep1,
          store.validateStep2,
          store.validateStep3,
          store.validateStep4,
          store.validateStep5,
          store.validateStep6
        ];
        
        if (step >= 1 && step <= validationFunctions.length) {
          const isValid = validationFunctions[step - 1]();
          
          if (isValid) {
            console.log(`Step ${step} Data:`, store[`step${step}Data` as keyof HoldingState]);
            
            // Na última etapa, enviar todos os dados
            if (step === store.totalSteps) {
              console.log("Submitting all data...");
              const allData = {
                step1: store.step1Data,
                step2: store.step2Data,
                step3: store.step3Data,
                step4: store.step4Data,
                step5: store.step5Data,
                step6: store.step6Data,
              };
              console.log("All Data:", allData);
              
              // TODO: Enviar dados para API
              // fetch('/api/submit-holding-data', { 
              //   method: 'POST', 
              //   body: JSON.stringify(allData), 
              //   headers: {'Content-Type': 'application/json'} 
              // })
              //  .then(response => response.json())
              //  .then(data => { console.log('Success:', data); store.nextStep(); })
              //  .catch((error) => { console.error('Error:', error); alert('Erro ao enviar dados.'); });
              
              store.nextStep(); // Simular sucesso por enquanto
            } else {
              store.nextStep();
            }
          }
        }
      },
      
      // Reset
      resetForm: () => set(initialState),
    }),
    {
      name: 'holding-storage', // nome para o localStorage
      partialize: (state) => ({
        // Salvar dados do formulário e estado de navegação
        currentStep: state.currentStep,
        processStatus: state.processStatus,
        step1Data: state.step1Data,
        step2Data: state.step2Data,
        step3Data: state.step3Data,
        step4Data: {
          ...state.step4Data,
          documents: state.step4Data.documents.map(doc => ({
            ...doc,
            file: undefined // Não salvar arquivos no localStorage
          }))
        },
        step5Data: state.step5Data,
        step6Data: state.step6Data,
      }),
    }
  )
);

export default useHoldingStore;
