import { useEffect } from 'react';
import { FileTextIcon, BarChart3Icon, TrendingUpIcon, ShieldIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useSimulationStore } from '@/stores/simulation-store';

export function Simulations() {
  const { 
    inputs, 
    results, 
    isLoading, 
    hasSimulated, 
    errors,
    setInput, 
    runSimulation, 
    resetSimulation 
  } = useSimulationStore();

  // Dados para o gráfico de comparação
  const comparisonData = results ? [
    {
      name: 'Custos Totais',
      semHolding: results.cenarioAtual.custoTotal,
      comHolding: results.cenarioHolding.custoTotal,
    },
    {
      name: 'Impostos',
      semHolding: results.cenarioAtual.impostos,
      comHolding: results.cenarioHolding.impostos,
    },
    {
      name: 'Riscos',
      semHolding: results.cenarioAtual.riscos,
      comHolding: results.cenarioHolding.riscos,
    },
  ] : [];

  // Opções para o campo de perfil
  const perfilOptions = [
    { value: 'empresario', label: 'Empresário' },
    { value: 'sociedade', label: 'Sociedade' },
    { value: 'mei', label: 'MEI' }
  ];

  // Efeito para scroll automático para os resultados após simulação
  useEffect(() => {
    if (hasSimulated && results) {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hasSimulated, results]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="w-full bg-black text-white px-6 py-4 flex justify-between items-center">
        <button className="border border-white rounded-md px-4 py-2 text-sm font-medium hover:bg-white/10 transition-colors">
          ENTRAR
        </button>
        <div className="flex items-center gap-4">
          <button className="text-white hover:text-gray-300 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          </button>
          <div className="text-2xl font-bold">W1</div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Seção de Título */}
        <section className="w-full max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">Simulações</h1>
          <p className="text-muted-foreground mt-2">
            Descubra os benefícios financeiros de criar uma holding com a W1 Consultoria
          </p>
        </section>

        {/* Seção de Entrada de Dados */}
        <section className="w-full max-w-4xl mx-auto px-6 pb-8">
          <Card className="p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Suas informações</h2>
            <p className="text-muted-foreground mb-6">Preencha os dados abaixo para simular os benefícios de uma holding</p>
            
            <div className="space-y-6">
              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-muted-foreground">Patrimônio total (R$)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-muted-foreground">R$</span>
                  </div>
                  <Input
                    type="text"
                    placeholder="Ex: 4.000.000,00"
                    value={inputs.patrimonio}
                    onChange={(e) => setInput('patrimonio', e.target.value)}
                    className="pl-8"
                  />
                </div>
                {errors.patrimonio && (
                  <p className="text-xs text-red-500 mt-1">{errors.patrimonio}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-muted-foreground">Empresas</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 3"
                    value={inputs.empresas}
                    onChange={(e) => setInput('empresas', e.target.value)}
                  />
                  {errors.empresas && (
                    <p className="text-xs text-red-500 mt-1">{errors.empresas}</p>
                  )}
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-muted-foreground">Tipo de perfil</Label>
                  <Select value={inputs.perfil} onValueChange={(value) => setInput('perfil', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {perfilOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-muted-foreground">Herdeiros</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 2"
                    value={inputs.herdeiros}
                    onChange={(e) => setInput('herdeiros', e.target.value)}
                  />
                  {errors.herdeiros && (
                    <p className="text-xs text-red-500 mt-1">{errors.herdeiros}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label className="text-sm font-medium text-muted-foreground">Imóveis</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 5"
                    value={inputs.imoveis}
                    onChange={(e) => setInput('imoveis', e.target.value)}
                  />
                  {errors.imoveis && (
                    <p className="text-xs text-red-500 mt-1">{errors.imoveis}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-muted-foreground">Valor de mercado total (R$)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-muted-foreground">R$</span>
                  </div>
                  <Input
                    type="text"
                    placeholder="Ex: 1.000,00"
                    value={inputs.valorMercado}
                    onChange={(e) => setInput('valorMercado', e.target.value)}
                    className="pl-8"
                  />
                </div>
                {errors.valorMercado && (
                  <p className="text-xs text-red-500 mt-1">{errors.valorMercado}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-sm font-medium text-muted-foreground">Valor venal dos imóveis (R$)</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-muted-foreground">R$</span>
                  </div>
                  <Input
                    type="text"
                    placeholder="Ex: 1.000.000,00"
                    value={inputs.valorVenal}
                    onChange={(e) => setInput('valorVenal', e.target.value)}
                    className="pl-8"
                  />
                </div>
                {errors.valorVenal && (
                  <p className="text-xs text-red-500 mt-1">{errors.valorVenal}</p>
                )}
              </div>

                <div className="flex flex-col xs:flex-row gap-4 pt-2">
                <Button
                  className="w-full py-2 bg-accent text-white hover:bg-accent/90 flex items-center justify-center"
                  onClick={runSimulation}
                >
                  <BarChart3Icon className="h-5 w-5 mr-2" />
                  {isLoading ? 'Simulando...' : 'SIMULAR'}
                </Button>
                <Button
                  variant="outline"
                  className="w-full py-2 border-foreground text-foreground hover:bg-accent hover:text-white flex items-center justify-center"
                  onClick={() => {}}
                >
                  <FileTextIcon className="h-5 w-5 mr-2" />
                  GERAR RELATÓRIO PDF
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Seções de Resultados - Só aparecem após simulação */}
        {hasSimulated && results && (
          <div id="results-section">
            {/* Seção de Gráfico Comparativo */}
            <section className="w-full max-w-4xl mx-auto px-6 py-8">
              <Card className="p-6 bg-background shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Comparação de Cenários</h2>
                <p className="text-muted-foreground mb-4">Veja a diferença entre manter seu patrimônio sem uma holding e com uma holding</p>
                <div className="w-full h-[300px] mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={comparisonData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="semHolding" 
                        name="Sem Holding" 
                        stroke="#ef4444" 
                        activeDot={{ r: 8 }} 
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="comHolding" 
                        name="Com Holding" 
                        stroke="#10b981" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </section>

            {/* Seção de Insights */}
            <section className="w-full max-w-4xl mx-auto px-6 py-8">
              <Card className="p-6 bg-background shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Insights</h2>
                <p className="text-muted-foreground mb-6">Análises inteligentes baseadas nos dados da sua simulação para ajudar você a tomar as melhores decisões</p>
                
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex gap-4 p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 text-accent">
                      <TrendingUpIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-foreground mb-1">Economia Fiscal Significativa</h3>
                      <p className="text-muted-foreground">
                        Com uma holding, você pode reduzir sua carga tributária em aproximadamente {results.economiaFiscal.toFixed(1)}%, resultando em economia substancial a longo prazo.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                    <div className="flex-shrink-0 text-accent">
                      <ShieldIcon className="h-6 w-6" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-lg font-medium text-foreground mb-1">Proteção Patrimonial Aprimorada</h3>
                      <p className="text-muted-foreground">
                        A estrutura de holding pode reduzir riscos patrimoniais em até {results.protecaoPatrimonial.toFixed(1)}%, blindando seus bens contra possíveis contingências.
                      </p>
                    </div>
                  </div>
                  
                  {inputs.herdeiros && parseInt(inputs.herdeiros) > 0 && (
                    <div className="flex gap-4 p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0 text-accent">
                        <ShieldIcon className="h-6 w-6" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-foreground mb-1">Sucessão Familiar Eficiente</h3>
                        <p className="text-muted-foreground">
                          A holding facilita o processo sucessório, reduzindo custos com inventário e minimizando conflitos entre herdeiros.
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {inputs.empresas && parseInt(inputs.empresas) > 1 && (
                    <div className="flex gap-4 p-4 rounded-lg border border-border hover:shadow-md transition-shadow">
                      <div className="flex-shrink-0 text-accent">
                        <BarChart3Icon className="h-6 w-6" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-foreground mb-1">Governança Corporativa Otimizada</h3>
                        <p className="text-muted-foreground">
                          Com múltiplas empresas, a holding proporciona melhor gestão e controle centralizado, facilitando decisões estratégicas.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </section>

            {/* Seção de Indicadores Detalhados */}
            <section className="w-full max-w-4xl mx-auto px-6 py-8">
              <Card className="p-6 bg-background shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Indicadores Detalhados</h2>
                <p className="text-muted-foreground mb-6">Métricas financeiras detalhadas que demonstram o impacto da holding em seu patrimônio</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <Card className="p-4 h-full">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Economia Fiscal</h3>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">{results.economiaFiscal.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex items-center text-emerald-500">
                        <TrendingUpIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{Math.abs(results.economiaFiscal)}%</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 h-full">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Proteção Patrimonial</h3>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">{results.protecaoPatrimonial.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex items-center text-emerald-500">
                        <TrendingUpIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{Math.abs(results.protecaoPatrimonial)}%</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 h-full">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Eficiência Sucessória</h3>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">{results.sucessaoEficiente.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex items-center text-emerald-500">
                        <TrendingUpIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{Math.abs(results.sucessaoEficiente)}%</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 h-full">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Governança Familiar</h3>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold">{results.governancaFamiliar.toFixed(1)}%</span>
                    </div>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex items-center text-emerald-500">
                        <TrendingUpIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{Math.abs(results.governancaFamiliar)}%</span>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card className="p-6 shadow-sm">
                    <h3 className="text-lg font-medium mb-4">Cenário Atual</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Custo Total:</span>
                        <span className="font-medium">R$ {results.cenarioAtual.custoTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Impostos:</span>
                        <span className="font-medium">R$ {results.cenarioAtual.impostos.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Riscos Estimados:</span>
                        <span className="font-medium">R$ {results.cenarioAtual.riscos.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-6 shadow-sm border-emerald-200 bg-emerald-50/30">
                    <h3 className="text-lg font-medium mb-4">Cenário com Holding</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Custo Total:</span>
                        <span className="font-medium text-emerald-600">R$ {results.cenarioHolding.custoTotal.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Impostos:</span>
                        <span className="font-medium text-emerald-600">R$ {results.cenarioHolding.impostos.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Riscos Estimados:</span>
                        <span className="font-medium text-emerald-600">R$ {results.cenarioHolding.riscos.toLocaleString('pt-BR', {minimumFractionDigits: 2})}</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </Card>
            </section>

            {/* Botões de Ação */}
            <section className="w-full max-w-4xl mx-auto px-6 py-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="w-full py-2 bg-accent text-white hover:bg-accent/90"
                  onClick={resetSimulation}
                >
                  Fazer outra simulação
                </Button>
                <Button 
                  variant="outline"
                  className="w-full py-2 border-accent text-accent-foreground hover:bg-accent hover:text-white flex items-center justify-center"
                  onClick={() => {}}
                >
                  <FileTextIcon className="h-5 w-5 mr-2" />
                  Gerar relatório PDF
                </Button>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  );
}