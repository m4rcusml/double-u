import { useState } from 'react';
import { useNavigate } from "react-router";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  ArrowUpRight, ArrowDownRight, Building2, Home, FileText,
  TrendingUp, Wallet,
  ChevronRight, BarChart3, RefreshCw
} from 'lucide-react';
import { usePropertyStore, type Property } from '@/stores/usePropertyStore';
import useHoldingStore from '@/stores/useHoldingStore';
import useDocumentStore from '@/stores/useDocumentStore';
import { useSimulationStore } from '@/stores/simulation-store';

// Cores para gráficos
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('month');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Hooks para os stores
  const { properties } = usePropertyStore();
  const {
    step2Data, processStatus, currentStep, totalSteps
  } = useHoldingStore();
  const {
    documents, getAbsentDocuments, getPendingDocuments,
    getApprovedDocuments, getRejectedDocuments
  } = useDocumentStore();
  const { results: simulationResults, hasSimulated } = useSimulationStore();

  // Dados derivados para KPIs
  const totalPropertyValue = properties.reduce((sum: number, prop: Property) => sum + prop.marketValue, 0);
  const totalVenalValue = properties.reduce((sum: number, prop: Property) => sum + prop.venalValue, 0);
  const propertyValueDiff = totalPropertyValue - totalVenalValue;
  const propertyValueDiffPercent = totalVenalValue ? (propertyValueDiff / totalVenalValue) * 100 : 0;

  const totalEstimatedAssets = step2Data.totalEstimatedAssets ? parseFloat(step2Data.totalEstimatedAssets) : 0;
  const totalVehiclesValue = step2Data.vehiclesValue ? parseFloat(step2Data.vehiclesValue) : 0;

  const documentStats = {
    absent: getAbsentDocuments().length,
    pending: getPendingDocuments().length,
    approved: getApprovedDocuments().length,
    rejected: getRejectedDocuments().length,
    total: documents.length
  };

  const documentCompletionRate = documentStats.total > 0
    ? (documentStats.approved / documentStats.total) * 100
    : 0;

  const holdingProgress = (currentStep / (totalSteps + 1)) * 100;

  // Dados de evolução patrimonial (simulados para demonstração)
  const generatePatrimonialEvolutionData = () => {
    const now = new Date();
    const data = [];

    // Dados históricos simulados
    for (let i = 11; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();

      // Valor base + crescimento simulado
      const baseValue = totalEstimatedAssets * 0.85;
      const growthFactor = 1 + (i * 0.015);

      data.push({
        name: `${month}/${year}`,
        Imóveis: Math.round(totalPropertyValue / growthFactor),
        Veículos: Math.round(totalVehiclesValue / growthFactor),
        Investimentos: Math.round(baseValue * 0.3 / growthFactor),
        Empresas: Math.round(baseValue * 0.2 / growthFactor),
        Outros: Math.round(baseValue * 0.1 / growthFactor),
      });
    }

    // Adicionar previsão futura
    for (let i = 1; i <= 3; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();

      // Crescimento projetado
      const growthFactor = 1 + (i * 0.02);

      data.push({
        name: `${month}/${year}`,
        Imóveis: Math.round(totalPropertyValue * growthFactor),
        Veículos: Math.round(totalVehiclesValue * growthFactor),
        Investimentos: Math.round(totalEstimatedAssets * 0.3 * growthFactor),
        Empresas: Math.round(totalEstimatedAssets * 0.2 * growthFactor),
        Outros: Math.round(totalEstimatedAssets * 0.1 * growthFactor),
        _projected: true
      });
    }

    return data;
  };

  const patrimonialEvolutionData = generatePatrimonialEvolutionData();

  // Dados de simulação de economia
  const simulationData = hasSimulated && simulationResults ? [
    { name: 'Economia Fiscal', value: simulationResults.economiaFiscal },
    { name: 'Proteção Patrimonial', value: simulationResults.protecaoPatrimonial },
    { name: 'Sucessão Eficiente', value: simulationResults.sucessaoEficiente },
    { name: 'Governança Familiar', value: simulationResults.governancaFamiliar }
  ] : [];

  // Função para navegar para a jornada de holding
  function navigateToHolding() {
    navigate('/my-journey');
  }

  // Função para navegar para a página de propriedades
  function navigateToProperties() {
    navigate('/properties');
  }

  // Função para navegar para a página de simulação
  function navigateToSimulation() {
    navigate('/simulations');
  }

  // Efeito para simular atualização de dados
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  // Formatador de valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Componente de tooltip personalizado para gráficos
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded shadow-md">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
          {payload[0].payload._projected && (
            <p className="text-xs text-blue-600 mt-1">Valor projetado</p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Cabeçalho e Navegação */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">
              Visão geral do seu patrimônio e holding
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              size="sm"
              onClick={refreshData}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>

            <Button onClick={navigateToHolding} className="bg-teal-700 hover:bg-teal-800">
              Ir para Holding
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>

        {/* Tabs de Navegação - IMPORTANTE: Todos os TabsContent devem estar dentro deste componente Tabs */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 md:w-[400px]">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="assets">Patrimônio</TabsTrigger>
          </TabsList>

          {/* Conteúdo da Tab Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPIs Principais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Patrimônio Total</p>
                      <h3 className="text-2xl font-bold mt-1">{formatCurrency(totalEstimatedAssets || totalPropertyValue)}</h3>
                    </div>
                    <div className="p-2 bg-teal-100 rounded-full">
                      <Wallet className="h-5 w-5 text-teal-700" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <Badge variant={propertyValueDiffPercent >= 0 ? "default" : "destructive"} className="flex items-center">
                      {propertyValueDiffPercent >= 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {Math.abs(propertyValueDiffPercent).toFixed(1)}%
                    </Badge>
                    <span className="text-xs text-gray-500 ml-2">vs. valor venal</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Imóveis</p>
                      <h3 className="text-2xl font-bold mt-1">{properties.length}</h3>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Home className="h-5 w-5 text-blue-700" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <span className="text-xs text-gray-500">Valor total: {formatCurrency(totalPropertyValue)}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Documentos</p>
                      <h3 className="text-2xl font-bold mt-1">{documentStats.approved}/{documentStats.total}</h3>
                    </div>
                    <div className="p-2 bg-amber-100 rounded-full">
                      <FileText className="h-5 w-5 text-amber-700" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={documentCompletionRate} className="h-2" />
                    <span className="text-xs text-gray-500 mt-1 inline-block">
                      {documentCompletionRate.toFixed(0)}% completos
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Holding</p>
                      <h3 className="text-2xl font-bold mt-1">{processStatus === 'CONCLUÍDO' ? 'Concluída' : 'Em Andamento'}</h3>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Building2 className="h-5 w-5 text-purple-700" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Progress value={holdingProgress} className="h-2" />
                    <span className="text-xs text-gray-500 mt-1 inline-block">
                      Etapa {currentStep} de {totalSteps + 1}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Gráficos Principais */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Gráfico da Evolução dos Patrimônios */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-teal-700" />
                    Evolução Patrimonial
                  </CardTitle>
                  <CardDescription>
                    Histórico e projeção do seu patrimônio
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={patrimonialEvolutionData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Area type="monotone" dataKey="Imóveis" stackId="1" stroke="#0088FE" fill="#0088FE" />
                        <Area type="monotone" dataKey="Veículos" stackId="1" stroke="#00C49F" fill="#00C49F" />
                        <Area type="monotone" dataKey="Investimentos" stackId="1" stroke="#FFBB28" fill="#FFBB28" />
                        <Area type="monotone" dataKey="Empresas" stackId="1" stroke="#FF8042" fill="#FF8042" />
                        <Area type="monotone" dataKey="Outros" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Resultados da Simulação */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold flex items-center">
                      <BarChart3 className="h-5 w-5 mr-2 text-purple-700" />
                      Benefícios da Holding
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={navigateToSimulation}>
                      Simular
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {hasSimulated && simulationResults ? (
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={simulationData}
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `${value}%`} />
                          <Tooltip formatter={(value) => `${value}%`} />
                          <Bar dataKey="value" fill="#8884d8">
                            {simulationData.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[250px] bg-gray-50 rounded-lg">
                      <p className="text-gray-500 mb-4">Realize uma simulação para ver os benefícios da sua holding</p>
                      <Button onClick={navigateToSimulation}>
                        Iniciar Simulação
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Conteúdo da Tab Patrimônio */}
          <TabsContent value="assets" className="space-y-6">
            {/* Filtros e Ações */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={timeRange === 'month' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('month')}
                >
                  Mensal
                </Button>
                <Button
                  variant={timeRange === 'quarter' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('quarter')}
                >
                  Trimestral
                </Button>
                <Button
                  variant={timeRange === 'year' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('year')}
                >
                  Anual
                </Button>
              </div>
              <Button onClick={navigateToProperties}>
                Gerenciar Propriedades
              </Button>
            </div>

            {/* Detalhes do Patrimônio */}
            <div>
              {/* Gráfico de Evolução por Categoria */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg">Evolução por Categoria</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={patrimonialEvolutionData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        <Line type="monotone" dataKey="Imóveis" stroke="#0088FE" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Veículos" stroke="#00C49F" />
                        <Line type="monotone" dataKey="Investimentos" stroke="#FFBB28" />
                        <Line type="monotone" dataKey="Empresas" stroke="#FF8042" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Propriedades */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Suas Propriedades</CardTitle>
                  <Button variant="outline" size="sm" onClick={navigateToProperties}>
                    Adicionar Propriedade
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Nome</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Categoria</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Endereço</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-500">Valor Venal</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-500">Valor de Mercado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.length > 0 ? (
                        properties.map((property: any, index: any) => (
                          <tr key={property.id || index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">{property.name}</td>
                            <td className="py-3 px-4">
                              <Badge variant="outline" className="font-normal">
                                {property.category}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-gray-500 text-sm">{property.fullAddress}</td>
                            <td className="py-3 px-4 text-right">{formatCurrency(property.venalValue)}</td>
                            <td className="py-3 px-4 text-right font-medium">{formatCurrency(property.marketValue)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="py-6 text-center text-gray-500">
                            Nenhuma propriedade cadastrada
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
