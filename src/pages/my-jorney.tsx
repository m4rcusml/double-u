import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, ChevronRight, FileText, Menu, Bell, Moon, HelpCircle } from 'lucide-react';

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
}

const MyJorney = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [personalData, setPersonalData] = useState<PersonalData>({
    fullName: '',
    phone: '',
    birthDate: '',
    cpf: '',
    rg: '',
    maritalStatus: '',
    nationality: '',
    profession: '',
    fullAddress: ''
  });

  const [familyData, setFamilyData] = useState<FamilyData>({
    numberOfChildren: '',
    children: [{ age: '', cpf: '', rg: '', birthDate: '' }]
  });

  const [patrimonialData, setPatrimonialData] = useState<PatrimonialData>({
    totalEstimatedAssets: '',
    numberOfProperties: '',
    patrimonialProfileType: '',
    estimatedMonthlyIncome: '',
    assetOrganizationLevel: ''
  });

  const [documents] = useState<Document[]>([
    { id: 1, name: 'Documento 1', status: 'ENVIADO' },
    { id: 2, name: 'Documento 2', status: 'ENVIADO' },
    { id: 3, name: 'Documento 3', status: 'ENVIADO' },
    { id: 4, name: 'Documento 4', status: 'ENVIADO' },
    { id: 5, name: 'Documento 5', status: 'PENDENTE' }
  ]);

  const totalSteps = 7;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handlePersonalDataChange = (field: keyof PersonalData, value: string) => {
    setPersonalData(prev => ({ ...prev, [field]: value }));
  };

  const handleFamilyDataChange = (field: keyof FamilyData, value: string) => {
    setFamilyData(prev => ({ ...prev, [field]: value }));
  };

  const handlePatrimonialDataChange = (field: keyof PatrimonialData, value: string) => {
    setPatrimonialData(prev => ({ ...prev, [field]: value }));
  };

  const handleChildDataChange = (index: number, field: string, value: string) => {
    setFamilyData(prev => ({
      ...prev,
      children: prev.children.map((child, i) =>
        i === index ? { ...child, [field]: value } : child
      )
    }));
  };

  const addChild = () => {
    setFamilyData(prev => ({
      ...prev,
      children: [...prev.children, { age: '', cpf: '', rg: '', birthDate: '' }]
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const needHelp = () => {
    alert('Funcionalidade de ajuda em desenvolvimento');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-4">Coleta de informações inicial</h2>

        <div className="space-y-4">
          <h3 className="text-base font-medium text-gray-700">Dados básicos</h3>

          <Input
            placeholder="Nome completo"
            value={personalData.fullName}
            onChange={(e) => handlePersonalDataChange('fullName', e.target.value)}
            className="w-full"
          />

          <Input
            placeholder="Celular"
            value={personalData.phone}
            onChange={(e) => handlePersonalDataChange('phone', e.target.value)}
            className="w-full"
          />

          <div className="relative">
            <Input
              placeholder="Data de nascimento"
              value={personalData.birthDate}
              onChange={(e) => handlePersonalDataChange('birthDate', e.target.value)}
              className="w-full pr-10"
            />
            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>

          <Input
            placeholder="CPF"
            value={personalData.cpf}
            onChange={(e) => handlePersonalDataChange('cpf', e.target.value)}
            className="w-full"
          />

          <Input
            placeholder="RG"
            value={personalData.rg}
            onChange={(e) => handlePersonalDataChange('rg', e.target.value)}
            className="w-full"
          />

          <Select onValueChange={(value) => handlePersonalDataChange('maritalStatus', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Estado civil" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solteiro">Solteiro(a)</SelectItem>
              <SelectItem value="casado">Casado(a)</SelectItem>
              <SelectItem value="divorciado">Divorciado(a)</SelectItem>
              <SelectItem value="viuvo">Viúvo(a)</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Nacionalidade"
            value={personalData.nationality}
            onChange={(e) => handlePersonalDataChange('nationality', e.target.value)}
            className="w-full"
          />

          <Input
            placeholder="Profissão"
            value={personalData.profession}
            onChange={(e) => handlePersonalDataChange('profession', e.target.value)}
            className="w-full"
          />

          <Input
            placeholder="Endereço completo"
            value={personalData.fullAddress}
            onChange={(e) => handlePersonalDataChange('fullAddress', e.target.value)}
            className="w-full"
          />
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-base font-medium text-gray-700">Dados familiares</h3>

          <Select onValueChange={(value) => handleFamilyDataChange('numberOfChildren', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Quantidade de filhos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="4+">4 ou mais</SelectItem>
            </SelectContent>
          </Select>

          {familyData.numberOfChildren && parseInt(familyData.numberOfChildren) > 0 && (
            <div className="space-y-4">
              {familyData.children.map((child, index) => (
                <div key={index} className="space-y-3 p-4 border rounded-lg">
                  <h4 className="font-medium">Filho {index + 1}</h4>

                  <Input
                    placeholder="Idade"
                    value={child.age}
                    onChange={(e) => handleChildDataChange(index, 'age', e.target.value)}
                    className="w-full"
                  />

                  <Input
                    placeholder="CPF"
                    value={child.cpf}
                    onChange={(e) => handleChildDataChange(index, 'cpf', e.target.value)}
                    className="w-full"
                  />

                  <Input
                    placeholder="RG"
                    value={child.rg}
                    onChange={(e) => handleChildDataChange(index, 'rg', e.target.value)}
                    className="w-full"
                  />

                  <div className="relative">
                    <Input
                      placeholder="Data de nascimento"
                      value={child.birthDate}
                      onChange={(e) => handleChildDataChange(index, 'birthDate', e.target.value)}
                      className="w-full pr-10"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </div>
              ))}

              {familyData.children.length < parseInt(familyData.numberOfChildren) && (
                <Button onClick={addChild} variant="outline" className="w-full">
                  Adicionar mais um filho
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 space-y-4">
          <h3 className="text-base font-medium text-gray-700">Dados patrimoniais</h3>

          <Input
            placeholder="Patrimônio total estimado (R$)"
            value={patrimonialData.totalEstimatedAssets}
            onChange={(e) => handlePatrimonialDataChange('totalEstimatedAssets', e.target.value)}
            className="w-full"
          />

          <Input
            placeholder="Quantidade de imóveis"
            value={patrimonialData.numberOfProperties}
            onChange={(e) => handlePatrimonialDataChange('numberOfProperties', e.target.value)}
            className="w-full"
          />

          <Select onValueChange={(value) => handlePatrimonialDataChange('patrimonialProfileType', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Tipo de perfil patrimonial" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conservador">Conservador</SelectItem>
              <SelectItem value="moderado">Moderado</SelectItem>
              <SelectItem value="arrojado">Arrojado</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Renda mensal estimada (R$)"
            value={patrimonialData.estimatedMonthlyIncome}
            onChange={(e) => handlePatrimonialDataChange('estimatedMonthlyIncome', e.target.value)}
            className="w-full"
          />

          <Select onValueChange={(value) => handlePatrimonialDataChange('assetOrganizationLevel', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Grau de organização dos bens" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baixo">Baixo</SelectItem>
              <SelectItem value="medio">Médio</SelectItem>
              <SelectItem value="alto">Alto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold mb-6">Organização inicial de documentos</h2>

        <div className="space-y-3">
          {documents.map((doc) => (
            <Card key={doc.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 text-gray-600" />
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className={`text-sm ${doc.status === 'ENVIADO' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                      STATUS: ({doc.status})
                    </p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </CardContent>
            </Card>
          ))}
        </div>
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

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <Button
                onClick={nextStep}
                className="w-full bg-teal-700 hover:bg-teal-800 text-white py-3"
                disabled={currentStep >= totalSteps}
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
        </div>
      </main>
    </div>
  );
};

export { MyJorney };