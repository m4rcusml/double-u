import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Calendar, ChevronRight, FileText, HelpCircle, UploadCloud, CheckCircle, Clock } from 'lucide-react';
import useHoldingStore from '@/stores/useHoldingStore'; // Importando o store Zustand
import { useNavigate } from 'react-router';

const MyJourney = () => {
  const navigate = useNavigate();
  // Usando o store Zustand em vez de useState
  const {
    // Estados
    currentStep,
    totalSteps,
    displaySteps,
    processStatus,
    step1Data,
    step2Data,
    step3Data,
    step4Data,
    step5Data,
    step6Data,
    step1Errors,
    step2Errors,
    step3Errors,
    step4Errors,
    step5Errors,
    step6Errors,
    
    // Ações
    nextStep,
    prevStep,
    updateStep1Data,
    updateStep2Data,
    updateStep3Data,
    updateStep4Data,
    updateStep5Data,
    updateStep6Data,
    updateChildData,
    uploadDocument,
    handleStepSubmit
  } = useHoldingStore();

  // Helper Functions
  const needHelp = () => {
    // Lógica para abrir o modal de ajuda
    console.log('Abriu o modal de ajuda');
  };

  // --- Render Functions for Each Step --- //

  // STEP 1: Personal & Family Data
  const renderStep1 = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">ETAPA 1: Informações Pessoais e Familiares</h2>
        <p className="text-sm text-gray-600 mb-6">Nesta primeira etapa, precisamos conhecer você e sua estrutura familiar. Estas informações são fundamentais para personalizar sua holding.</p>

        {/* Personal Data Section */}
        <div className="space-y-4 border p-4 rounded-md mb-6 bg-white">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Dados Pessoais</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
            <Input placeholder="Seu nome completo" value={step1Data.fullName} onChange={(e) => updateStep1Data('fullName', e.target.value)} className={step1Errors.fullName ? 'border-red-500' : ''} />
            {step1Errors.fullName && <p className="text-red-500 text-xs mt-1">{step1Errors.fullName}</p>}
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Celular</label>
            <Input placeholder="(XX) XXXXX-XXXX" value={step1Data.phone} onChange={(e) => updateStep1Data('phone', e.target.value)} className={step1Errors.phone ? 'border-red-500' : ''} />
            {step1Errors.phone && <p className="text-red-500 text-xs mt-1">{step1Errors.phone}</p>}
          </div>
           <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Data de Nascimento</label>
            <Input placeholder="DD/MM/AAAA" value={step1Data.birthDate} onChange={(e) => updateStep1Data('birthDate', e.target.value)} className={`pr-10 ${step1Errors.birthDate ? 'border-red-500' : ''}`} />
            <Calendar className="absolute right-3 top-[calc(1.75rem+8px)] transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            {step1Errors.birthDate && <p className="text-red-500 text-xs mt-1">{step1Errors.birthDate}</p>}
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPF</label>
            <Input placeholder="Seu CPF" value={step1Data.cpf} onChange={(e) => updateStep1Data('cpf', e.target.value)} className={step1Errors.cpf ? 'border-red-500' : ''} />
            {step1Errors.cpf && <p className="text-red-500 text-xs mt-1">{step1Errors.cpf}</p>}
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RG</label>
            <Input placeholder="Seu RG" value={step1Data.rg} onChange={(e) => updateStep1Data('rg', e.target.value)} className={step1Errors.rg ? 'border-red-500' : ''} />
            {step1Errors.rg && <p className="text-red-500 text-xs mt-1">{step1Errors.rg}</p>}
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado Civil</label>
            <Select onValueChange={(value) => updateStep1Data('maritalStatus', value)} value={step1Data.maritalStatus}>
              <SelectTrigger className={step1Errors.maritalStatus ? 'border-red-500' : ''}><SelectValue placeholder="Selecione..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                <SelectItem value="casado">Casado(a)</SelectItem>
                <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                <SelectItem value="uniao_estavel">União Estável</SelectItem>
              </SelectContent>
            </Select>
            {step1Errors.maritalStatus && <p className="text-red-500 text-xs mt-1">{step1Errors.maritalStatus}</p>}
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nacionalidade</label>
            <Input placeholder="Sua nacionalidade" value={step1Data.nationality} onChange={(e) => updateStep1Data('nationality', e.target.value)} className={step1Errors.nationality ? 'border-red-500' : ''} />
            {step1Errors.nationality && <p className="text-red-500 text-xs mt-1">{step1Errors.nationality}</p>}
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profissão</label>
            <Input placeholder="Sua profissão" value={step1Data.profession} onChange={(e) => updateStep1Data('profession', e.target.value)} className={step1Errors.profession ? 'border-red-500' : ''} />
            {step1Errors.profession && <p className="text-red-500 text-xs mt-1">{step1Errors.profession}</p>}
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
            <Input placeholder="Rua, Número, Bairro, Cidade, Estado, CEP" value={step1Data.fullAddress} onChange={(e) => updateStep1Data('fullAddress', e.target.value)} className={step1Errors.fullAddress ? 'border-red-500' : ''} />
            {step1Errors.fullAddress && <p className="text-red-500 text-xs mt-1">{step1Errors.fullAddress}</p>}
          </div>
        </div>

        {/* Family Data Section */}
        <div className="space-y-4 border p-4 rounded-md bg-white">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Dados Familiares</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo do Cônjuge (Opcional)</label>
            <Input placeholder="Nome do cônjuge" value={step1Data.spouseFullName || ''} onChange={(e) => updateStep1Data('spouseFullName', e.target.value)} />
          </div>
           <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CPF do Cônjuge (Opcional)</label>
            <Input placeholder="CPF do cônjuge" value={step1Data.spouseCpf || ''} onChange={(e) => updateStep1Data('spouseCpf', e.target.value)} />
          </div>

          <div className='mt-4'>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade de Filhos</label>
            <Select onValueChange={(value) => updateStep1Data('numberOfChildren', value)} value={step1Data.numberOfChildren}>
              <SelectTrigger className={step1Errors.numberOfChildren ? 'border-red-500' : ''}><SelectValue placeholder="Selecione..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                 <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
            {step1Errors.numberOfChildren && <p className="text-red-500 text-xs mt-1">{step1Errors.numberOfChildren}</p>}
          </div>

          {parseInt(step1Data.numberOfChildren) > 0 && (
            <div className="space-y-4 mt-4">
              {step1Data.children.map((child: any, index: any) => (
                <div key={index} className="space-y-3 p-4 border rounded-lg bg-gray-50">
                  <h4 className="font-medium text-gray-700">Dados do Filho {index + 1}</h4>
                   <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Nome Completo</label>
                      <Input placeholder="Nome do filho" value={child.name} onChange={(e) => updateChildData(index, 'name', e.target.value)} />
                   </div>
                   <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">Idade</label>
                      <Input type="number" placeholder="Idade" value={child.age} onChange={(e) => updateChildData(index, 'age', e.target.value)} />
                   </div>
                   <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">CPF</label>
                      <Input placeholder="CPF do filho" value={child.cpf} onChange={(e) => updateChildData(index, 'cpf', e.target.value)} />
                   </div>
                   <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">RG</label>
                      <Input placeholder="RG do filho" value={child.rg} onChange={(e) => updateChildData(index, 'rg', e.target.value)} />
                   </div>
                   <div className="relative">
                      <label className="block text-xs font-medium text-gray-600 mb-1">Data de Nascimento</label>
                      <Input placeholder="DD/MM/AAAA" value={child.birthDate} onChange={(e) => updateChildData(index, 'birthDate', e.target.value)} className="pr-10" />
                      <Calendar className="absolute right-3 top-[calc(1.75rem+8px)] transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                   </div>
                </div>
              ))}
            </div>
          )}

           <div className='mt-4'>
            <label className="block text-sm font-medium text-gray-700 mb-1">Outros Dependentes/Herdeiros</label>
            <Textarea placeholder="Descreva outros dependentes ou herdeiros a serem considerados (nomes, relação)" value={step1Data.otherDependents || ''} onChange={(e) => updateStep1Data('otherDependents', e.target.value)} />
          </div>

          <div className='mt-4'>
            <label className="block text-sm font-medium text-gray-700 mb-1">Situação Familiar Atual</label>
            <Textarea placeholder="Descreva brevemente o relacionamento entre os membros da família, se há conflitos relevantes, etc." value={step1Data.familySituation || ''} onChange={(e) => updateStep1Data('familySituation', e.target.value)} />
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="mt-8 flex justify-between items-center">
        <Button onClick={needHelp} variant="outline" className="flex items-center space-x-2"><HelpCircle className="h-4 w-4" /><span>Preciso de Ajuda</span></Button>
        <Button onClick={() => handleStepSubmit(1)} className="bg-teal-700 hover:bg-teal-800 text-white">Próxima Etapa <ChevronRight className="h-4 w-4 ml-2" /></Button>
      </div>
    </div>
  );

  // STEP 2: Patrimonial Data
  const renderStep2 = () => (
     <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">ETAPA 2: Mapeamento do Patrimônio</h2>
        <p className="text-sm text-gray-600 mb-6">Precisamos conhecer detalhadamente seu patrimônio para definir a melhor estratégia de proteção e gestão.</p>

        <div className="space-y-4 border p-4 rounded-md bg-white">
           <h3 className="text-lg font-medium text-gray-800 mb-3">Visão Geral e Imóveis</h3>
           <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patrimônio Total Estimado (R$)</label>
                <Input type="number" placeholder="Valor aproximado" value={step2Data.totalEstimatedAssets} onChange={(e) => updateStep2Data('totalEstimatedAssets', e.target.value)} className={step2Errors.totalEstimatedAssets ? 'border-red-500' : ''} />
                {step2Errors.totalEstimatedAssets && <p className="text-red-500 text-xs mt-1">{step2Errors.totalEstimatedAssets}</p>}
            </div>
            {/* TODO: Add dynamic form for properties array */}
            <p className="text-sm text-gray-500">(Seção para adicionar detalhes dos imóveis será implementada)</p>
        </div>

        <div className="space-y-4 border p-4 rounded-md mt-6 bg-white">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Participações Societárias e Investimentos</h3>
             {/* TODO: Add dynamic form for companyShares array */}
             <p className="text-sm text-gray-500">(Seção para adicionar detalhes das participações societárias será implementada)</p>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Investimentos Financeiros</label>
                <Textarea placeholder="Descreva seus principais investimentos (tipos, valores, instituições)" value={step2Data.financialInvestments} onChange={(e) => updateStep2Data('financialInvestments', e.target.value)} />
            </div>
        </div>

         <div className="space-y-4 border p-4 rounded-md mt-6 bg-white">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Outros Bens, Dívidas e Organização</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor Estimado de Veículos (R$)</label>
                <Input type="number" placeholder="Soma do valor dos veículos" value={step2Data.vehiclesValue} onChange={(e) => updateStep2Data('vehiclesValue', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Outros Bens Móveis Relevantes</label>
                <Textarea placeholder="Descreva outros bens de valor (obras de arte, joias, etc.)" value={step2Data.otherAssets || ''} onChange={(e) => updateStep2Data('otherAssets', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dívidas e Financiamentos</label>
                <Textarea placeholder="Liste as principais dívidas e financiamentos existentes" value={step2Data.debtsAndLiabilities} onChange={(e) => updateStep2Data('debtsAndLiabilities', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expectativa de Aquisição de Novos Bens</label>
                <Textarea placeholder="Planeja adquirir novos bens relevantes nos próximos anos?" value={step2Data.futureAcquisitions || ''} onChange={(e) => updateStep2Data('futureAcquisitions', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grau Atual de Organização Patrimonial</label>
                <Select onValueChange={(value) => updateStep2Data('assetOrganizationLevel', value)} value={step2Data.assetOrganizationLevel}>
                    <SelectTrigger className={step2Errors.assetOrganizationLevel ? 'border-red-500' : ''}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="baixo">Baixo</SelectItem>
                        <SelectItem value="medio">Médio</SelectItem>
                        <SelectItem value="alto">Alto</SelectItem>
                    </SelectContent>
                </Select>
                 {step2Errors.assetOrganizationLevel && <p className="text-red-500 text-xs mt-1">{step2Errors.assetOrganizationLevel}</p>}
            </div>
        </div>

      </div>
      {/* Action Buttons */}
      <div className="mt-8 flex justify-between items-center">
        <Button onClick={prevStep} variant="outline">Voltar</Button>
        <Button onClick={() => handleStepSubmit(2)} className="bg-teal-700 hover:bg-teal-800 text-white">Próxima Etapa <ChevronRight className="h-4 w-4 ml-2" /></Button>
      </div>
    </div>
  );

  // STEP 3: Objectives & Strategy
  const renderStep3 = () => (
     <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">ETAPA 3: Objetivos e Estratégia</h2>
        <p className="text-sm text-gray-600 mb-6">Entender seus objetivos é fundamental para estruturar uma holding que atenda suas necessidades específicas.</p>

        <div className="space-y-4 border p-4 rounded-md bg-white">
             <h3 className="text-lg font-medium text-gray-800 mb-3">Seus Objetivos</h3>
             {/* TODO: Add Checkbox group for mainObjectives */}
             <p className="text-sm text-gray-500">(Seção para selecionar os principais objetivos será implementada - Ex: Proteção Patrimonial, Planejamento Sucessório, Otimização Tributária)</p>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priorização dos Objetivos</label>
                <Textarea placeholder="Descreva qual(is) objetivo(s) é(são) mais importante(s) para você e por quê." value={step3Data.objectivePrioritization} onChange={(e) => updateStep3Data('objectivePrioritization', e.target.value)} />
            </div>
        </div>

        <div className="space-y-4 border p-4 rounded-md mt-6 bg-white">
             <h3 className="text-lg font-medium text-gray-800 mb-3">Planejamento e Expectativas</h3>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expectativas de Crescimento Patrimonial</label>
                <Textarea placeholder="Quais são suas expectativas em relação ao crescimento do seu patrimônio?" value={step3Data.growthExpectations} onChange={(e) => updateStep3Data('growthExpectations', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Planos para Sucessão Familiar</label>
                <Textarea placeholder="Como você deseja que seu patrimônio seja distribuído no futuro? Existem diretrizes específicas?" value={step3Data.successionPlans} onChange={(e) => updateStep3Data('successionPlans', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preocupações Patrimoniais Atuais</label>
                <Textarea placeholder="Quais são suas maiores preocupações em relação à gestão atual do seu patrimônio?" value={step3Data.patrimonialConcerns} onChange={(e) => updateStep3Data('patrimonialConcerns', e.target.value)} />
            </div>
        </div>

         <div className="space-y-4 border p-4 rounded-md mt-6 bg-white">
             <h3 className="text-lg font-medium text-gray-800 mb-3">Implementação</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Horizonte de Tempo para Implementação</label>
                <Select onValueChange={(value) => updateStep3Data('implementationTimeline', value)} value={step3Data.implementationTimeline}>
                    <SelectTrigger className={step3Errors.implementationTimeline ? 'border-red-500' : ''}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="curto">Curto Prazo (até 6 meses)</SelectItem>
                        <SelectItem value="medio">Médio Prazo (6-12 meses)</SelectItem>
                        <SelectItem value="longo">Longo Prazo (mais de 1 ano)</SelectItem>
                        <SelectItem value="flexivel">Flexível</SelectItem>
                    </SelectContent>
                </Select>
                 {step3Errors.implementationTimeline && <p className="text-red-500 text-xs mt-1">{step3Errors.implementationTimeline}</p>}
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Disposição para Mudanças na Gestão Atual</label>
                <Select onValueChange={(value) => updateStep3Data('managementChangeWillingness', value)} value={step3Data.managementChangeWillingness}>
                    <SelectTrigger className={step3Errors.managementChangeWillingness ? 'border-red-500' : ''}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="alta">Alta</SelectItem>
                        <SelectItem value="media">Média</SelectItem>
                        <SelectItem value="baixa">Baixa</SelectItem>
                    </SelectContent>
                </Select>
                 {step3Errors.managementChangeWillingness && <p className="text-red-500 text-xs mt-1">{step3Errors.managementChangeWillingness}</p>}
            </div>
        </div>

      </div>
      {/* Action Buttons */}
      <div className="mt-8 flex justify-between items-center">
        <Button onClick={prevStep} variant="outline">Voltar</Button>
        <Button onClick={() => handleStepSubmit(3)} className="bg-teal-700 hover:bg-teal-800 text-white">Próxima Etapa <ChevronRight className="h-4 w-4 ml-2" /></Button>
      </div>
    </div>
  );

  // STEP 4: Documentation Upload
  const renderStep4 = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">ETAPA 4: Documentos Essenciais</h2>
        <p className="text-sm text-gray-600 mb-6">Para avançarmos, precisamos de alguns documentos importantes. Anexe os arquivos correspondentes.</p>

        <div className="space-y-4">
          {step4Data.documents.map((doc: any) => (
            <Card key={doc.id} className={`border ${doc.status === 'ENVIADO' ? 'border-green-200 bg-green-50' : doc.status === 'PENDENTE' ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200 bg-white'}`}>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start space-x-3 mb-3 sm:mb-0">
                    <FileText className="h-5 w-5 text-gray-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-800">{doc.name}</p>
                      <p className="text-xs text-gray-500 mb-1">{doc.description}</p>
                      <p className={`text-xs font-semibold ${doc.status === 'ENVIADO' ? 'text-green-700' : 'text-yellow-700'}`}>
                        STATUS: {doc.status}
                      </p>
                      {doc.file && (
                        <p className="text-xs text-blue-600 mt-1">Arquivo: {doc.file.name} ({(doc.file.size / 1024).toFixed(1)} KB)</p>
                      )}
                    </div>
                  </div>
                  <label htmlFor={`file-upload-${doc.id}`} className="cursor-pointer mt-2 sm:mt-0">
                     <Button asChild variant="outline" size="sm" className='bg-white'>
                        <div>
                            <UploadCloud className="h-4 w-4 mr-2" />
                            {doc.status === 'PENDENTE' ? 'Anexar Arquivo' : 'Substituir Arquivo'}
                        </div>
                     </Button>
                    <input
                      id={`file-upload-${doc.id}`}
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.zip"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          uploadDocument(doc.id, file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {step4Errors.documents && <p className="text-red-500 text-sm mt-4">{step4Errors.documents}</p>}

        <div className="mt-6 bg-white border p-4 rounded-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">Observações Adicionais (Opcional)</label>
          <Textarea
            value={step4Data.notes || ''}
            onChange={(e) => updateStep4Data('notes', e.target.value)}
            placeholder="Adicione qualquer observação relevante sobre os documentos enviados..."
            className="w-full p-3 border border-gray-300 rounded-md resize-none h-24"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between items-center">
        <Button onClick={prevStep} variant="outline">Voltar</Button>
        <Button onClick={() => handleStepSubmit(4)} className="bg-teal-700 hover:bg-teal-800 text-white">Próxima Etapa <ChevronRight className="h-4 w-4 ml-2" /></Button>
      </div>
    </div>
  );

  // STEP 5: Risks & Opportunities
  const renderStep5 = () => (
     <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">ETAPA 5: Riscos e Oportunidades</h2>
        <p className="text-sm text-gray-600 mb-6">Cada situação patrimonial possui riscos e oportunidades. Queremos entender melhor os desafios e possibilidades do seu caso.</p>

        <div className="space-y-4 border p-4 rounded-md bg-white">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Pontos de Atenção</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Atividades Profissionais de Risco</label>
                <Textarea placeholder="Descreva se você ou familiares exercem atividades que podem gerar responsabilização pessoal (ex: médico, engenheiro)" value={step5Data.riskyActivities} onChange={(e) => updateStep5Data('riskyActivities', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Processos Judiciais em Andamento</label>
                <Textarea placeholder="Informe se há processos judiciais relevantes em andamento (como autor ou réu)" value={step5Data.ongoingLawsuits} onChange={(e) => updateStep5Data('ongoingLawsuits', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dívidas ou Passivos Potenciais</label>
                <Textarea placeholder="Existem dívidas significativas ou passivos que podem impactar o patrimônio?" value={step5Data.potentialDebts} onChange={(e) => updateStep5Data('potentialDebts', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Relações Societárias Conflituosas</label>
                <Textarea placeholder="Existem conflitos em sociedades das quais participa?" value={step5Data.conflictingRelationships} onChange={(e) => updateStep5Data('conflictingRelationships', e.target.value)} />
            </div>
        </div>

        <div className="space-y-4 border p-4 rounded-md mt-6 bg-white">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Oportunidades e Planos Futuros</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expectativa de Recebimento de Heranças/Doações</label>
                <Textarea placeholder="Há expectativa de receber heranças ou doações relevantes no futuro?" value={step5Data.inheritanceExpectation} onChange={(e) => updateStep5Data('inheritanceExpectation', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Planos de Expansão de Negócios/Investimentos</label>
                <Textarea placeholder="Existem planos para expandir negócios ou realizar novos investimentos significativos?" value={step5Data.businessExpansionPlans} onChange={(e) => updateStep5Data('businessExpansionPlans', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Intenção de Residência/Bens no Exterior</label>
                <Textarea placeholder="Há planos de residir no exterior ou adquirir bens internacionais?" value={step5Data.internationalResidencyPlans} onChange={(e) => updateStep5Data('internationalResidencyPlans', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preocupações com Privacidade Patrimonial</label>
                <Textarea placeholder="Você possui preocupações específicas sobre a privacidade dos seus bens?" value={step5Data.privacyConcerns} onChange={(e) => updateStep5Data('privacyConcerns', e.target.value)} />
            </div>
        </div>

      </div>
      {/* Action Buttons */}
      <div className="mt-8 flex justify-between items-center">
        <Button onClick={prevStep} variant="outline">Voltar</Button>
        <Button onClick={() => handleStepSubmit(5)} className="bg-teal-700 hover:bg-teal-800 text-white">Próxima Etapa <ChevronRight className="h-4 w-4 ml-2" /></Button>
      </div>
    </div>
  );

  // STEP 6: Management & Governance Preferences
  const renderStep6 = () => (
     <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-1">ETAPA 6: Gestão e Governança</h2>
        <p className="text-sm text-gray-600 mb-6">Suas preferências sobre a gestão da holding determinarão como seu patrimônio será administrado.</p>

        <div className="space-y-4 border p-4 rounded-md bg-white">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Administração e Decisões</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferência de Administrador da Holding</label>
                <Select onValueChange={(value) => updateStep6Data('administratorPreference', value)} value={step6Data.administratorPreference}>
                    <SelectTrigger className={step6Errors.administratorPreference ? 'border-red-500' : ''}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="eu_mesmo">Eu mesmo</SelectItem>
                        <SelectItem value="familiar">Familiar(es)</SelectItem>
                        <SelectItem value="profissional">Profissional Externo</SelectItem>
                        <SelectItem value="misto">Misto (Familiar e Profissional)</SelectItem>
                        <SelectItem value="avaliar">Ainda não definido / Avaliar</SelectItem>
                    </SelectContent>
                </Select>
                 {step6Errors.administratorPreference && <p className="text-red-500 text-xs mt-1">{step6Errors.administratorPreference}</p>}
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Processo de Tomada de Decisões</label>
                <Textarea placeholder="Como você gostaria que as decisões importantes fossem tomadas (ex: unanimidade, maioria, poder de veto para certas decisões)?" value={step6Data.decisionMakingProcess} onChange={(e) => updateStep6Data('decisionMakingProcess', e.target.value)} />
            </div>
        </div>

        <div className="space-y-4 border p-4 rounded-md mt-6 bg-white">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Regras e Políticas</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Regras para Entrada e Saída de Sócios/Herdeiros</label>
                <Textarea placeholder="Existem regras específicas que você gostaria de definir para a entrada de novos sócios (ex: cônjuges) ou saída?" value={step6Data.entryExitRules} onChange={(e) => updateStep6Data('entryExitRules', e.target.value)} />
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Política de Distribuição de Lucros</label>
                <Textarea placeholder="Como você prefere que os lucros da holding sejam distribuídos ou reinvestidos?" value={step6Data.profitDistributionPolicy} onChange={(e) => updateStep6Data('profitDistributionPolicy', e.target.value)} />
            </div>
             {/* TODO: Add Checkbox group for restrictions */}
             <p className="text-sm text-gray-500">(Seção para selecionar restrições será implementada - Ex: Inalienabilidade, Impenhorabilidade)</p>
        </div>

        <div className="space-y-4 border p-4 rounded-md mt-6 bg-white">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Estrutura e Acordos</h3>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferência de Modelo Societário</label>
                <Select onValueChange={(value) => updateStep6Data('corporateModelPreference', value)} value={step6Data.corporateModelPreference}>
                    <SelectTrigger className={step6Errors.corporateModelPreference ? 'border-red-500' : ''}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ltda">Sociedade Limitada (LTDA)</SelectItem>
                        <SelectItem value="sa">Sociedade Anônima (S.A.)</SelectItem>
                        <SelectItem value="indiferente">Indiferente / Avaliar</SelectItem>
                    </SelectContent>
                </Select>
                 {step6Errors.corporateModelPreference && <p className="text-red-500 text-xs mt-1">{step6Errors.corporateModelPreference}</p>}
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Necessidade de Acordo de Sócios/Protocolo Familiar</label>
                <Select onValueChange={(value) => updateStep6Data('shareholderAgreementNeed', value)} value={step6Data.shareholderAgreementNeed}>
                    <SelectTrigger className={step6Errors.shareholderAgreementNeed ? 'border-red-500' : ''}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                        <SelectItem value="avaliar">Avaliar com o consultor</SelectItem>
                    </SelectContent>
                </Select>
                 {step6Errors.shareholderAgreementNeed && <p className="text-red-500 text-xs mt-1">{step6Errors.shareholderAgreementNeed}</p>}
            </div>
             <div className='mt-4'>
                <label className="block text-sm font-medium text-gray-700 mb-1">Necessidade de Conselho Familiar/Administração</label>
                <Select onValueChange={(value) => updateStep6Data('familyCouncilNeed', value)} value={step6Data.familyCouncilNeed}>
                    <SelectTrigger className={step6Errors.familyCouncilNeed ? 'border-red-500' : ''}><SelectValue placeholder="Selecione..." /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="sim">Sim</SelectItem>
                        <SelectItem value="nao">Não</SelectItem>
                        <SelectItem value="avaliar">Avaliar com o consultor</SelectItem>
                    </SelectContent>
                </Select>
                 {step6Errors.familyCouncilNeed && <p className="text-red-500 text-xs mt-1">{step6Errors.familyCouncilNeed}</p>}
            </div>
        </div>

      </div>
      {/* Action Buttons */}
      <div className="mt-8 flex justify-between items-center">
        <Button onClick={prevStep} variant="outline">Voltar</Button>
        <Button onClick={() => handleStepSubmit(6)} className="bg-green-600 hover:bg-green-700 text-white">Finalizar e Enviar Dados <CheckCircle className="h-4 w-4 ml-2" /></Button>
      </div>
    </div>
  );

  // STEP 7: Completion Screen
  const renderCompletionScreen = () => (
    <div className="text-center py-12 px-6 bg-white rounded-lg shadow-md">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Parabéns, {step1Data.fullName || 'Cliente'}!</h2>
        <p className="text-gray-600 mb-6">
            Você concluiu com sucesso o preenchimento das informações iniciais para a estruturação da sua holding.
            Recebemos seus dados e documentos.
        </p>
        <div className="bg-gray-100 p-4 rounded-md border border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Status do Processo</h3>
            <div className="flex items-center justify-center space-x-2 text-blue-600">
                <Clock className="h-5 w-5" />
                <span className="font-medium">{processStatus}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Atualizaremos o status aqui conforme o andamento.</p>
        </div>
        <p className="text-sm text-gray-500 mb-8">
            Nossa equipe de consultoria analisará tudo cuidadosamente.
            Entraremos em contato em breve caso necessitemos de informações adicionais ou para agendar os próximos passos.
        </p>
        <Button onClick={() => navigate('/')} variant="outline">
            Voltar ao Início
        </Button>
    </div>
  );

  // --- Main Render --- //
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <main className="max-w-4xl mx-auto px-4">
        <Card className="shadow-lg overflow-hidden">
          <CardContent className="p-6">
            {/* Header and Progress Bar - Only show during steps 1-6 */}
            {currentStep <= totalSteps && (
                <div className="border-b pb-4 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Minha Jornada - Construção de Holding</h1>
                    <p className="text-sm text-gray-500">Preencha as etapas para que nosso consultor possa elaborar a melhor estrutura para você.</p>
                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-teal-700">ETAPA {currentStep} DE {totalSteps}</span>
                        {/* Calculate progress based on displaySteps for visual completeness */}
                        <span className="text-xs font-semibold text-teal-700">{((currentStep / displaySteps) * 100).toFixed(0)}%</span>
                        </div>
                        <Progress value={(currentStep / displaySteps) * 100} className="h-2 bg-teal-100 [&>*]:bg-teal-600" />
                    </div>
                </div>
            )}

            {/* Step Content */}
            <div className="mt-6">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
              {currentStep === 4 && renderStep4()}
              {currentStep === 5 && renderStep5()}
              {currentStep === 6 && renderStep6()}
              {currentStep === 7 && renderCompletionScreen()} {/* Show completion screen */} 
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export { MyJourney };
