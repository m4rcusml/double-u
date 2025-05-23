import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, ChevronRight, FileText, HelpCircle } from 'lucide-react';

interface PersonalData {
  fullName: string;
  phone: string;
  birthDate: string;
  cpf: string;
  rg: string;
  maritalStatus: string;
  nationality: string;
  profession: string;
  fullAddress: string;
}

interface FamilyData {
  numberOfChildren: string;
  children: Array<{
    age: string;
    cpf: string;
    rg: string;
    birthDate: string;
  }>;
}

interface PatrimonialData {
  totalEstimatedAssets: string;
  numberOfProperties: string;
  patrimonialProfileType: string;
  estimatedMonthlyIncome: string;
  assetOrganizationLevel: string;
}

interface Document {
  id: number;
  name: string;
  status: 'ENVIADO' | 'PENDENTE';
  file?: File;
}

interface FormErrors {
  [key: string]: string;
}

interface Step1FormData extends PersonalData, FamilyData, PatrimonialData {}

interface Step2FormData {
  documents: Document[];
  notes: string;
}

const MyJourney = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  const progressPercentage = (currentStep / totalSteps) * 100;

  // Step 1 Form Data
  const [step1Data, setStep1Data] = useState<Step1FormData>({
    fullName: '',
    phone: '',
    birthDate: '',
    cpf: '',
    rg: '',
    maritalStatus: '',
    nationality: '',
    profession: '',
    fullAddress: '',
    numberOfChildren: '',
    children: [{ age: '', cpf: '', rg: '', birthDate: '' }],
    totalEstimatedAssets: '',
    numberOfProperties: '',
    patrimonialProfileType: '',
    estimatedMonthlyIncome: '',
    assetOrganizationLevel: ''
  });

  // Step 2 Form Data
  const [step2Data, setStep2Data] = useState<Step2FormData>({
    documents: [
      { id: 1, name: 'Documento 1', status: 'ENVIADO' },
      { id: 2, name: 'Documento 2', status: 'ENVIADO' },
      { id: 3, name: 'Documento 3', status: 'ENVIADO' },
      { id: 4, name: 'Documento 4', status: 'ENVIADO' },
      { id: 5, name: 'Documento 5', status: 'PENDENTE' }
    ],
    notes: ''
  });

  // Form Errors
  const [step1Errors, setStep1Errors] = useState<FormErrors>({});
  const [step2Errors, setStep2Errors] = useState<FormErrors>({});

  // Validation Functions
  const validateStep1 = (): boolean => {
    const errors: FormErrors = {};

    // Personal Data Validation
    if (!step1Data.fullName.trim()) {
      errors.fullName = 'Nome completo é obrigatório';
    } else if (step1Data.fullName.trim().length < 2) {
      errors.fullName = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!step1Data.phone.trim()) {
      errors.phone = 'Celular é obrigatório';
    } else if (!/^[0-9+\-\s()]+$/.test(step1Data.phone)) {
      errors.phone = 'Formato de telefone inválido';
    }

    if (!step1Data.birthDate.trim()) {
      errors.birthDate = 'Data de nascimento é obrigatória';
    }

    if (!step1Data.cpf.trim()) {
      errors.cpf = 'CPF é obrigatório';
    } else if (!/^[0-9.-]+$/.test(step1Data.cpf)) {
      errors.cpf = 'Formato de CPF inválido';
    }

    if (!step1Data.rg.trim()) {
      errors.rg = 'RG é obrigatório';
    }

    if (!step1Data.maritalStatus) {
      errors.maritalStatus = 'Estado civil é obrigatório';
    }

    if (!step1Data.nationality.trim()) {
      errors.nationality = 'Nacionalidade é obrigatória';
    }

    if (!step1Data.profession.trim()) {
      errors.profession = 'Profissão é obrigatória';
    }

    if (!step1Data.fullAddress.trim()) {
      errors.fullAddress = 'Endereço é obrigatório';
    }

    // Family Data Validation
    if (!step1Data.numberOfChildren) {
      errors.numberOfChildren = 'Quantidade de filhos é obrigatória';
    }

    // Children Validation
    if (parseInt(step1Data.numberOfChildren) > 0) {
      step1Data.children.forEach((child, index) => {
        if (!child.age.trim()) {
          errors[`children.${index}.age`] = 'Idade é obrigatória';
        } else if (!/^[0-9]+$/.test(child.age)) {
          errors[`children.${index}.age`] = 'Idade deve ser um número';
        }

        if (!child.cpf.trim()) {
          errors[`children.${index}.cpf`] = 'CPF é obrigatório';
        } else if (!/^[0-9.-]+$/.test(child.cpf)) {
          errors[`children.${index}.cpf`] = 'Formato de CPF inválido';
        }

        if (!child.rg.trim()) {
          errors[`children.${index}.rg`] = 'RG é obrigatório';
        }

        if (!child.birthDate.trim()) {
          errors[`children.${index}.birthDate`] = 'Data de nascimento é obrigatória';
        }
      });
    }

    // Patrimonial Data Validation
    if (!step1Data.totalEstimatedAssets.trim()) {
      errors.totalEstimatedAssets = 'Patrimônio total é obrigatório';
    }

    if (!step1Data.numberOfProperties.trim()) {
      errors.numberOfProperties = 'Quantidade de imóveis é obrigatória';
    } else if (!/^[0-9]+$/.test(step1Data.numberOfProperties)) {
      errors.numberOfProperties = 'Deve ser um número';
    }

    if (!step1Data.patrimonialProfileType) {
      errors.patrimonialProfileType = 'Tipo de perfil patrimonial é obrigatório';
    }

    if (!step1Data.estimatedMonthlyIncome.trim()) {
      errors.estimatedMonthlyIncome = 'Renda mensal é obrigatória';
    }

    if (!step1Data.assetOrganizationLevel) {
      errors.assetOrganizationLevel = 'Grau de organização dos bens é obrigatório';
    }

    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: FormErrors = {};
    // Add Step 2 specific validation here if needed
    setStep2Errors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submissions
  const handleStep1Submit = () => {
    if (validateStep1()) {
      console.log('Step 1 Data:', step1Data);
      nextStep();
    }
  };

  const handleStep2Submit = () => {
    if (validateStep2()) {
      console.log('Step 2 Data:', step2Data);
      nextStep();
    }
  };

  // Update form data functions
  const updateStep1Data = (field: keyof Step1FormData, value: string) => {
    setStep1Data(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (step1Errors[field]) {
      setStep1Errors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const updateChildData = (index: number, field: string, value: string) => {
    setStep1Data(prev => ({
      ...prev,
      children: prev.children.map((child, i) =>
        i === index ? { ...child, [field]: value } : child
      )
    }));
    // Clear error when user starts typing
    const errorKey = `children.${index}.${field}`;
    if (step1Errors[errorKey]) {
      setStep1Errors(prev => ({ ...prev, [errorKey]: '' }));
    }
  };

  const updateStep2Data = (field: keyof Step2FormData, value: any) => {
    setStep2Data(prev => ({ ...prev, [field]: value }));
    if (step2Errors[field]) {
      setStep2Errors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // Manage children fields based on numberOfChildren
  useEffect(() => {
    const childrenCount = parseInt(step1Data.numberOfChildren) || 0;
    const currentChildrenCount = step1Data.children.length;

    if (childrenCount > currentChildrenCount) {
      // Add more children fields
      const newChildren = [...step1Data.children];
      for (let i = currentChildrenCount; i < childrenCount; i++) {
        newChildren.push({ age: '', cpf: '', rg: '', birthDate: '' });
      }
      setStep1Data(prev => ({ ...prev, children: newChildren }));
    } else if (childrenCount < currentChildrenCount && childrenCount > 0) {
      // Remove excess children fields
      const newChildren = step1Data.children.slice(0, childrenCount);
      setStep1Data(prev => ({ ...prev, children: newChildren }));
    } else if (childrenCount === 0) {
      // Keep one empty field for UI consistency
      setStep1Data(prev => ({ ...prev, children: [{ age: '', cpf: '', rg: '', birthDate: '' }] }));
    }
  }, [step1Data.numberOfChildren]);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const needHelp = () => {
    alert('Funcionalidade de ajuda em desenvolvimento');
  };

  const handleFileUpload = (docId: number, file: File) => {
    const updatedDocs = step2Data.documents.map(doc => 
      doc.id === docId 
        ? { ...doc, file, status: 'ENVIADO' as const }
        : doc
    );
    updateStep2Data('documents', updatedDocs);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Coleta de informações inicial</h2>

        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-700">Dados básicos</h3>

          <div>
            <Input
              placeholder="Nome completo"
              value={step1Data.fullName}
              onChange={(e) => updateStep1Data('fullName', e.target.value)}
              className={`w-full ${step1Errors.fullName ? 'border-red-500' : ''}`}
            />
            {step1Errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.fullName}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Celular"
              value={step1Data.phone}
              onChange={(e) => updateStep1Data('phone', e.target.value)}
              className={`w-full ${step1Errors.phone ? 'border-red-500' : ''}`}
            />
            {step1Errors.phone && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.phone}</p>
            )}
          </div>

          <div className="relative">
            <Input
              placeholder="Data de nascimento (DD/MM/AAAA)"
              value={step1Data.birthDate}
              onChange={(e) => updateStep1Data('birthDate', e.target.value)}
              className={`w-full pr-10 ${step1Errors.birthDate ? 'border-red-500' : ''}`}
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            {step1Errors.birthDate && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.birthDate}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="CPF"
              value={step1Data.cpf}
              onChange={(e) => updateStep1Data('cpf', e.target.value)}
              className={`w-full ${step1Errors.cpf ? 'border-red-500' : ''}`}
            />
            {step1Errors.cpf && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.cpf}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="RG"
              value={step1Data.rg}
              onChange={(e) => updateStep1Data('rg', e.target.value)}
              className={`w-full ${step1Errors.rg ? 'border-red-500' : ''}`}
            />
            {step1Errors.rg && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.rg}</p>
            )}
          </div>

          <div>
            <Select onValueChange={(value) => updateStep1Data('maritalStatus', value)} value={step1Data.maritalStatus}>
              <SelectTrigger className={`w-full ${step1Errors.maritalStatus ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Estado civil" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                <SelectItem value="casado">Casado(a)</SelectItem>
                <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                <SelectItem value="viuvo">Viúvo(a)</SelectItem>
              </SelectContent>
            </Select>
            {step1Errors.maritalStatus && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.maritalStatus}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Nacionalidade"
              value={step1Data.nationality}
              onChange={(e) => updateStep1Data('nationality', e.target.value)}
              className={`w-full ${step1Errors.nationality ? 'border-red-500' : ''}`}
            />
            {step1Errors.nationality && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.nationality}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Profissão"
              value={step1Data.profession}
              onChange={(e) => updateStep1Data('profession', e.target.value)}
              className={`w-full ${step1Errors.profession ? 'border-red-500' : ''}`}
            />
            {step1Errors.profession && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.profession}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Endereço completo"
              value={step1Data.fullAddress}
              onChange={(e) => updateStep1Data('fullAddress', e.target.value)}
              className={`w-full ${step1Errors.fullAddress ? 'border-red-500' : ''}`}
            />
            {step1Errors.fullAddress && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.fullAddress}</p>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-base font-medium text-gray-700">Dados familiares</h3>

          <div>
            <Select onValueChange={(value) => updateStep1Data('numberOfChildren', value)} value={step1Data.numberOfChildren}>
              <SelectTrigger className={`w-full ${step1Errors.numberOfChildren ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Quantidade de filhos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4 ou mais</SelectItem>
              </SelectContent>
            </Select>
            {step1Errors.numberOfChildren && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.numberOfChildren}</p>
            )}
          </div>

          {step1Data.numberOfChildren && parseInt(step1Data.numberOfChildren) > 0 && (
            <div className="space-y-4">
              {step1Data.children.map((child, index) => (
                <div key={index} className="space-y-3 p-4 border rounded-lg">
                  <h4 className="font-medium">Filho {index + 1}</h4>

                  <div>
                    <Input
                      placeholder="Idade"
                      value={child.age}
                      onChange={(e) => updateChildData(index, 'age', e.target.value)}
                      className={`w-full ${step1Errors[`children.${index}.age`] ? 'border-red-500' : ''}`}
                    />
                    {step1Errors[`children.${index}.age`] && (
                      <p className="text-red-500 text-sm mt-1">{step1Errors[`children.${index}.age`]}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="CPF"
                      value={child.cpf}
                      onChange={(e) => updateChildData(index, 'cpf', e.target.value)}
                      className={`w-full ${step1Errors[`children.${index}.cpf`] ? 'border-red-500' : ''}`}
                    />
                    {step1Errors[`children.${index}.cpf`] && (
                      <p className="text-red-500 text-sm mt-1">{step1Errors[`children.${index}.cpf`]}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="RG"
                      value={child.rg}
                      onChange={(e) => updateChildData(index, 'rg', e.target.value)}
                      className={`w-full ${step1Errors[`children.${index}.rg`] ? 'border-red-500' : ''}`}
                    />
                    {step1Errors[`children.${index}.rg`] && (
                      <p className="text-red-500 text-sm mt-1">{step1Errors[`children.${index}.rg`]}</p>
                    )}
                  </div>

                  <div className="relative">
                    <Input
                      placeholder="Data de nascimento (DD/MM/AAAA)"
                      value={child.birthDate}
                      onChange={(e) => updateChildData(index, 'birthDate', e.target.value)}
                      className={`w-full pr-10 ${step1Errors[`children.${index}.birthDate`] ? 'border-red-500' : ''}`}
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    {step1Errors[`children.${index}.birthDate`] && (
                      <p className="text-red-500 text-sm mt-1">{step1Errors[`children.${index}.birthDate`]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-base font-medium text-gray-700">Dados patrimoniais</h3>

          <div>
            <Input
              placeholder="Patrimônio total estimado (R$)"
              value={step1Data.totalEstimatedAssets}
              onChange={(e) => updateStep1Data('totalEstimatedAssets', e.target.value)}
              className={`w-full ${step1Errors.totalEstimatedAssets ? 'border-red-500' : ''}`}
            />
            {step1Errors.totalEstimatedAssets && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.totalEstimatedAssets}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Quantidade de imóveis"
              value={step1Data.numberOfProperties}
              onChange={(e) => updateStep1Data('numberOfProperties', e.target.value)}
              className={`w-full ${step1Errors.numberOfProperties ? 'border-red-500' : ''}`}
            />
            {step1Errors.numberOfProperties && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.numberOfProperties}</p>
            )}
          </div>

          <div>
            <Select onValueChange={(value) => updateStep1Data('patrimonialProfileType', value)} value={step1Data.patrimonialProfileType}>
              <SelectTrigger className={`w-full ${step1Errors.patrimonialProfileType ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Tipo de perfil patrimonial" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservador">Conservador</SelectItem>
                <SelectItem value="moderado">Moderado</SelectItem>
                <SelectItem value="arrojado">Arrojado</SelectItem>
              </SelectContent>
            </Select>
            {step1Errors.patrimonialProfileType && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.patrimonialProfileType}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Renda mensal estimada (R$)"
              value={step1Data.estimatedMonthlyIncome}
              onChange={(e) => updateStep1Data('estimatedMonthlyIncome', e.target.value)}
              className={`w-full ${step1Errors.estimatedMonthlyIncome ? 'border-red-500' : ''}`}
            />
            {step1Errors.estimatedMonthlyIncome && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.estimatedMonthlyIncome}</p>
            )}
          </div>

          <div>
            <Select onValueChange={(value) => updateStep1Data('assetOrganizationLevel', value)} value={step1Data.assetOrganizationLevel}>
              <SelectTrigger className={`w-full ${step1Errors.assetOrganizationLevel ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Grau de organização dos bens" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="baixo">Baixo</SelectItem>
                <SelectItem value="medio">Médio</SelectItem>
                <SelectItem value="alto">Alto</SelectItem>
              </SelectContent>
            </Select>
            {step1Errors.assetOrganizationLevel && (
              <p className="text-red-500 text-sm mt-1">{step1Errors.assetOrganizationLevel}</p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 space-y-3">
        <Button
          onClick={handleStep1Submit}
          className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3"
        >
          Próxima etapa
        </Button>

        <Button
          onClick={needHelp}
          variant="outline"
          className="w-full py-3 flex items-center justify-center space-x-2"
        >
          <HelpCircle className="h-4 w-4" />
          <span>Preciso de ajuda</span>
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-6">Organização inicial de documentos</h2>

        <div className="space-y-3">
          {step2Data.documents.map((doc) => (
            <Card key={doc.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className={`text-sm ${doc.status === 'ENVIADO' ? 'text-green-600' : 'text-yellow-600'}`}>
                        STATUS: ({doc.status})
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
                
                {doc.status === 'PENDENTE' && (
                  <div className="mt-3">
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          handleFileUpload(doc.id, file);
                        }
                      }}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                    />
                  </div>
                )}

                {doc.file && (
                  <div className="mt-2 text-sm text-green-600">
                    Arquivo enviado: {doc.file.name}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Observações adicionais
          </label>
          <textarea
            value={step2Data.notes}
            onChange={(e) => updateStep2Data('notes', e.target.value)}
            placeholder="Adicione qualquer observação sobre os documentos..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 space-y-3">
        <Button
          onClick={handleStep2Submit}
          className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3"
        >
          Próxima etapa
        </Button>

        <Button
          onClick={needHelp}
          variant="outline"
          className="w-full py-3 flex items-center justify-center space-x-2"
        >
          <HelpCircle className="h-4 w-4" />
          <span>Preciso de ajuda</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h1 className="text-xl font-semibold mb-4">Minha construção de Holding</h1>

            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600">ETAPA ATUAL</span>

              <div className='flex items-center gap-1'>
                <span className="text-sm text-gray-600">{currentStep} de {totalSteps}</span>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Step Content */}
          <div className="p-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep > 2 && (
              <div className="text-center py-12">
                <h2 className="text-lg font-semibold mb-4">Etapa {currentStep}</h2>
                <p className="text-gray-600 mb-6">Esta etapa está em desenvolvimento.</p>
                <Button
                  onClick={nextStep}
                  className="bg-teal-700 hover:bg-teal-800 text-white"
                  disabled={currentStep >= totalSteps}
                >
                  Próxima etapa
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export { MyJourney };