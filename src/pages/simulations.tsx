import { useEffect, useRef } from 'react'
import { FileTextIcon, BarChart3Icon, TrendingUpIcon, ArrowDownIcon, ShieldCheckIcon, ClockIcon, PieChartIcon, CheckCircleIcon } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts'
import { useSimulationStore } from '@/stores/simulation-store'
import { useLocation, useNavigate } from 'react-router'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { toast } from 'sonner'

export function Simulations() {
  const {
    inputs,
    results,
    isLoading,
    hasSimulated,
    errors,
    setInput,
    runSimulation
  } = useSimulationStore()
  const navigate = useNavigate()

  const { pathname } = useLocation()

  const resultRef = useRef<HTMLDivElement>(null)

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
  ] : []

  // Dados para gráficos e insights adicionais
  const economiaTotal = results ? results.cenarioAtual.custoTotal - results.cenarioHolding.custoTotal : 0;
  const economiaTotalPercentual = results ? ((results.cenarioAtual.custoTotal - results.cenarioHolding.custoTotal) / results.cenarioAtual.custoTotal) * 100 : 0;
  const economiaImpostos = results ? results.cenarioAtual.impostos - results.cenarioHolding.impostos : 0;
  const economiaImpostosPercentual = results ? ((results.cenarioAtual.impostos - results.cenarioHolding.impostos) / results.cenarioAtual.impostos) * 100 : 0;
  const reducaoRiscosPercentual = results ? ((results.cenarioAtual.riscos - results.cenarioHolding.riscos) / results.cenarioAtual.riscos) * 100 : 0;

  // Tempo estimado de retorno do investimento (em meses)
  const custoMedioHolding = 15000; // Valor médio estimado para criação de holding
  const tempoRetornoMeses = economiaTotal > 0 ? Math.ceil((custoMedioHolding / (economiaTotal / 12))) : 0;

  // Dados para gráfico de barras (comparação detalhada)
  const detailedComparisonData = results ? [
    {
      name: 'ITBI',
      semHolding: results.cenarioAtual.impostos * 0.3,
      comHolding: results.cenarioHolding.impostos * 0.1,
    },
    {
      name: 'ITCMD',
      semHolding: results.cenarioAtual.impostos * 0.4,
      comHolding: results.cenarioHolding.impostos * 0.15,
    },
    {
      name: 'IR',
      semHolding: results.cenarioAtual.impostos * 0.3,
      comHolding: results.cenarioHolding.impostos * 0.2,
    },
    {
      name: 'Processos',
      semHolding: results.cenarioAtual.riscos * 0.6,
      comHolding: results.cenarioHolding.riscos * 0.2,
    },
    {
      name: 'Disputas',
      semHolding: results.cenarioAtual.riscos * 0.4,
      comHolding: results.cenarioHolding.riscos * 0.15,
    },
  ] : [];

  // Formatador de valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Insights baseados nos resultados
  const getInsights = () => {
    if (!results) return [];

    const insights = [];

    // Insight sobre economia fiscal
    if (economiaImpostosPercentual > 30) {
      insights.push({
        title: "Economia fiscal significativa",
        description: `A holding pode reduzir sua carga tributária em aproximadamente ${economiaImpostosPercentual.toFixed(1)}%, representando uma economia anual de R$ ${formatCurrency(economiaImpostos)}.`,
        icon: <ArrowDownIcon className="h-5 w-5 text-green-600" />,
        priority: "high"
      });
    } else if (economiaImpostosPercentual > 10) {
      insights.push({
        title: "Economia fiscal moderada",
        description: `A holding pode reduzir sua carga tributária em aproximadamente ${economiaImpostosPercentual.toFixed(1)}%, representando uma economia anual de R$ ${formatCurrency(economiaImpostos)}.`,
        icon: <ArrowDownIcon className="h-5 w-5 text-green-600" />,
        priority: "medium"
      });
    }

    // Insight sobre proteção patrimonial
    if (reducaoRiscosPercentual > 40) {
      insights.push({
        title: "Proteção patrimonial elevada",
        description: `A estrutura de holding pode reduzir seus riscos patrimoniais em aproximadamente ${reducaoRiscosPercentual.toFixed(1)}%, blindando seu patrimônio contra contingências.`,
        icon: <ShieldCheckIcon className="h-5 w-5 text-blue-600" />,
        priority: "high"
      });
    }

    // Insight sobre retorno do investimento
    if (tempoRetornoMeses <= 12) {
      insights.push({
        title: "Retorno rápido do investimento",
        description: `O investimento na criação da holding pode se pagar em apenas ${tempoRetornoMeses} meses, considerando apenas a economia direta.`,
        icon: <ClockIcon className="h-5 w-5 text-purple-600" />,
        priority: "high"
      });
    } else if (tempoRetornoMeses <= 24) {
      insights.push({
        title: "Bom retorno do investimento",
        description: `O investimento na criação da holding pode se pagar em aproximadamente ${tempoRetornoMeses} meses, considerando apenas a economia direta.`,
        icon: <ClockIcon className="h-5 w-5 text-purple-600" />,
        priority: "medium"
      });
    }

    // Insight sobre sucessão
    if (Number(inputs.herdeiros) > 1) {
      insights.push({
        title: "Sucessão familiar facilitada",
        description: `Com ${inputs.herdeiros} herdeiros, a holding pode simplificar significativamente o processo sucessório, reduzindo custos e conflitos potenciais.`,
        icon: <TrendingUpIcon className="h-5 w-5 text-amber-600" />,
        priority: Number(inputs.herdeiros) > 2 ? "high" : "medium"
      });
    }

    // Insight sobre imóveis
    if (Number(inputs.imoveis) > 2) {
      insights.push({
        title: "Gestão imobiliária otimizada",
        description: `Com ${inputs.imoveis} imóveis, a holding permite uma administração centralizada e mais eficiente do seu portfólio imobiliário.`,
        icon: <PieChartIcon className="h-5 w-5 text-indigo-600" />,
        priority: Number(inputs.imoveis) > 4 ? "high" : "medium"
      });
    }

    return insights;
  };

  const insights = getInsights();

  const perfilOptions = [
    { value: 'empresario', label: 'Empresário' },
    { value: 'sociedade', label: 'Sociedade' },
    { value: 'mei', label: 'MEI' }
  ]

  useEffect(() => {
    if (hasSimulated && results) {
      const resultsElement = document.getElementById('results-section')
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }, [hasSimulated, results])

  // Função para verificar se uma string contém cores OKLCH ou outras cores problemáticas
  const containsUnsupportedColor = (style: string) => {
    if (!style) return false;
    return style.includes('oklch') || style.includes('hsl') || style.includes('hwb') || style.includes('lab');
  };

  // Função para converter cores para RGB
  const convertToSafeColor = (element: HTMLElement, property: string) => {
    const computedStyle = window.getComputedStyle(element);
    const value = computedStyle[property as any];

    // Se a propriedade não existir ou não for uma cor problemática, retorne
    if (!value || !containsUnsupportedColor(value)) return null;

    // Obtenha a cor computada em RGB
    const rgbColor = computedStyle[property as any];
    return rgbColor;
  };

  // Função melhorada para gerar PDF
  const generatePDF = async () => {
    try {
      if (!resultRef.current) {
        toast("Não foi possível gerar o PDF. Tente novamente.");
        return;
      }

      // Mostrar toast de carregamento
      toast("Gerando PDF");

      // Clonar o elemento para não modificar o original
      const clone = resultRef.current.cloneNode(true) as HTMLElement;
      document.body.appendChild(clone);
      clone.style.position = 'absolute';
      clone.style.left = '-9999px';
      clone.style.top = '-9999px';

      // Processar todos os elementos no clone
      const processElements = (element: HTMLElement) => {
        // Processar cores de texto
        const textColor = convertToSafeColor(element, 'color');
        if (textColor) {
          element.style.color = textColor;
        }

        // Processar cores de fundo
        const bgColor = convertToSafeColor(element, 'backgroundColor');
        if (bgColor) {
          element.style.backgroundColor = bgColor;
        }

        // Processar cores de borda
        const borderColor = convertToSafeColor(element, 'borderColor');
        if (borderColor) {
          element.style.borderColor = borderColor;
        }

        // Processar cores de preenchimento para SVGs
        if (element.tagName.toLowerCase() === 'svg' || element.tagName.toLowerCase() === 'path') {
          const fillColor = convertToSafeColor(element, 'fill');
          if (fillColor) {
            element.setAttribute('fill', fillColor);
          }

          const strokeColor = convertToSafeColor(element, 'stroke');
          if (strokeColor) {
            element.setAttribute('stroke', strokeColor);
          }
        }

        // Processar elementos filhos
        Array.from(element.children).forEach(child => {
          processElements(child as HTMLElement);
        });
      };

      // Processar todos os elementos
      processElements(clone);

      // Remover elementos que podem causar problemas
      const problematicElements = clone.querySelectorAll('canvas, video, iframe');
      problematicElements.forEach(el => el.remove());

      // Gerar canvas a partir do clone
      const canvas = await html2canvas(clone, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: '#ffffff',
        onclone: (document, _) => {
          // Remover estilos que podem causar problemas
          const styleSheets = Array.from(document.styleSheets);
          styleSheets.forEach(sheet => {
            try {
              const rules = Array.from(sheet.cssRules);
              rules.forEach((rule, index) => {
                if (rule.cssText.includes('oklch') ||
                  rule.cssText.includes('hsl') ||
                  rule.cssText.includes('hwb') ||
                  rule.cssText.includes('lab')) {
                  sheet.deleteRule(index);
                }
              });
            } catch (e) {
              // Ignorar erros de CORS em folhas de estilo externas
            }
          });
        }
      });

      // Remover o clone
      document.body.removeChild(clone);

      // Criar PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;

      // Adicionar cabeçalho
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pdfWidth, 20, 'F');
      pdf.setTextColor(0, 0, 0);
      pdf.setFontSize(16);
      pdf.text('Relatório de Simulação - W1 Consultoria', pdfWidth / 2, 10, { align: 'center' });

      // Adicionar imagem
      pdf.addImage(imgData, 'PNG', imgX, 20, imgWidth * ratio, imgHeight * ratio);

      // Adicionar rodapé
      const pageCount = pdf.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Página ${i} de ${pageCount} - Gerado em ${new Date().toLocaleDateString('pt-BR')}`, pdfWidth / 2, pdfHeight - 10, { align: 'center' });
      }

      // Salvar PDF
      pdf.save('relatorio_simulacao_w1.pdf');

      // Mostrar toast de sucesso
      toast("PDF Gerado com Sucesso");
    } catch (error) {
      console.error('Error generating PDF:', error);

      // Mostrar toast de erro
      toast("Erro ao Gerar PDF");
    }
  };

  // Formatador de percentuais
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className={`flex flex-col min-h-screen bg-background text-foreground ${pathname.includes('not-logged') ? 'pt-16' : ''}`}>
      <main className="flex-grow">
        <section className="w-full max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold">Simulações</h1>
          <p className="text-muted-foreground mt-2">
            Descubra os benefícios financeiros de criar uma holding com a W1 Consultoria
          </p>
        </section>

        <section className="w-full max-w-4xl mx-auto px-6 pb-8">
          <Card className="p-6 shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Suas informações</h2>
            <p className="text-muted-foreground mb-6">Preencha os dados abaixo para simular os benefícios de uma holding</p>

            <div className="space-y-6">
              <div className="flex flex-col gap-1.5">
                <Label>Patrimônio total (R$)</Label>
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
                {errors.patrimonio && <p className="text-xs text-red-500 mt-1">{errors.patrimonio}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <Label>Empresas</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 3"
                    value={inputs.empresas}
                    onChange={(e) => setInput('empresas', e.target.value)}
                  />
                  {errors.empresas && <p className="text-xs text-red-500 mt-1">{errors.empresas}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>Tipo de perfil</Label>
                  <Select value={inputs.perfil} onValueChange={(value) => setInput('perfil', value)}>
                    <SelectTrigger>
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
                  <Label>Herdeiros</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 2"
                    value={inputs.herdeiros}
                    onChange={(e) => setInput('herdeiros', e.target.value)}
                  />
                  {errors.herdeiros && <p className="text-xs text-red-500 mt-1">{errors.herdeiros}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>Imóveis</Label>
                  <Input
                    type="number"
                    placeholder="Ex: 5"
                    value={inputs.imoveis}
                    onChange={(e) => setInput('imoveis', e.target.value)}
                  />
                  {errors.imoveis && <p className="text-xs text-red-500 mt-1">{errors.imoveis}</p>}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Valor de mercado total (R$)</Label>
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
                {errors.valorMercado && <p className="text-xs text-red-500 mt-1">{errors.valorMercado}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Valor venal dos imóveis (R$)</Label>
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
                {errors.valorVenal && <p className="text-xs text-red-500 mt-1">{errors.valorVenal}</p>}
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
                  onClick={generatePDF}
                  disabled={true}
                >
                  <FileTextIcon className="h-5 w-5 mr-2" />
                  GERAR RELATÓRIO PDF
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {hasSimulated && results && (
          <div id="results-section" ref={resultRef}>
            <section className="w-full max-w-4xl mx-auto px-6 py-8">
              <Card className="p-6 bg-background shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Comparação de Cenários</h2>
                <p className="text-muted-foreground mb-4">
                  Veja a diferença entre manter seu patrimônio sem uma holding e com uma holding
                </p>
                <div className="w-full h-[300px] mt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={comparisonData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                      <Line type="monotone" dataKey="semHolding" name="Sem Holding" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="comHolding" name="Com Holding" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </section>

            {/* Nova seção de Insights e Indicadores Detalhados */}
            <section className="w-full max-w-4xl mx-auto px-6 py-8">
              <h2 className="text-2xl font-semibold text-foreground mb-6">Insights e Indicadores Detalhados</h2>

              {/* KPIs principais */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <Card className="bg-green-50 border-green-100">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-green-700">Economia Total</p>
                        <h3 className="text-2xl font-bold mt-1 text-green-900">{formatCurrency(economiaTotal)}</h3>
                      </div>
                      <div className="p-2 bg-green-100 rounded-full">
                        <ArrowDownIcon className="h-5 w-5 text-green-700" />
                      </div>
                    </div>
                    <div className="mt-4 flex items-center">
                      <Badge className="bg-green-100 text-green-800 mr-2">
                        {formatPercent(economiaTotalPercentual)}
                      </Badge>
                      <span className="text-xs text-green-700">de redução nos custos</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-blue-50 border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-blue-700">Retorno do Investimento</p>
                        <h3 className="text-2xl font-bold mt-1 text-blue-900">{tempoRetornoMeses} meses</h3>
                      </div>
                      <div className="p-2 bg-blue-100 rounded-full">
                        <ClockIcon className="h-5 w-5 text-blue-700" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={(24 - Math.min(tempoRetornoMeses, 24)) / 24 * 100} className="h-2 bg-blue-200 [&>*]:bg-blue-600" />
                      <span className="text-xs text-blue-700 mt-1 inline-block">
                        {tempoRetornoMeses <= 12 ? "Excelente" : tempoRetornoMeses <= 24 ? "Bom" : "Moderado"}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-100">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-purple-700">Proteção Patrimonial</p>
                        <h3 className="text-2xl font-bold mt-1 text-purple-900">{formatPercent(reducaoRiscosPercentual)}</h3>
                      </div>
                      <div className="p-2 bg-purple-100 rounded-full">
                        <ShieldCheckIcon className="h-5 w-5 text-purple-700" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={reducaoRiscosPercentual} className="h-2 bg-purple-200 [&>*]:bg-purple-600" />
                      <span className="text-xs text-purple-700 mt-1 inline-block">
                        Redução de riscos patrimoniais
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tabs para diferentes visualizações */}
              <Tabs defaultValue="insights" className="mb-8">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="insights">Insights</TabsTrigger>
                  <TabsTrigger value="detalhes">Finanças</TabsTrigger>
                  <TabsTrigger value="beneficios">Benefícios</TabsTrigger>
                </TabsList>

                {/* Tab de Insights */}
                <TabsContent value="insights" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Principais Insights</CardTitle>
                      <CardDescription>
                        Análise personalizada com base nos seus dados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {insights.length > 0 ? (
                          insights.map((insight, index) => (
                            <div key={index} className={`p-4 rounded-lg border ${insight.priority === "high"
                              ? "border-green-200 bg-green-50"
                              : insight.priority === "medium"
                                ? "border-blue-200 bg-blue-50"
                                : "border-gray-200 bg-gray-50"
                              }`}>
                              <div className="flex items-start">
                                <div className="mr-3 mt-0.5">
                                  {insight.icon}
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{insight.title}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-gray-500 py-4">
                            Preencha mais dados para obter insights personalizados
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Tab de Detalhes Financeiros */}
                <TabsContent value="detalhes" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Comparativo Detalhado</CardTitle>
                      <CardDescription>
                        Análise detalhada dos custos e impostos
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={detailedComparisonData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                            <Legend />
                            <Bar dataKey="semHolding" name="Sem Holding" fill="#ef4444" />
                            <Bar dataKey="comHolding" name="Com Holding" fill="#10b981" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Economia em Impostos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">ITBI</span>
                            <div className="flex items-center">
                              <span className="text-green-600 font-medium mr-2">
                                {formatPercent(70)}
                              </span>
                              <ArrowDownIcon className="h-4 w-4 text-green-600" />
                            </div>
                          </div>
                          <Progress value={70} className="h-2 bg-gray-100 [&>*]:bg-green-600" />

                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">ITCMD</span>
                            <div className="flex items-center">
                              <span className="text-green-600 font-medium mr-2">
                                {formatPercent(65)}
                              </span>
                              <ArrowDownIcon className="h-4 w-4 text-green-600" />
                            </div>
                          </div>
                          <Progress value={65} className="h-2 bg-gray-100 [&>*]:bg-green-600" />

                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">IR</span>
                            <div className="flex items-center">
                              <span className="text-green-600 font-medium mr-2">
                                {formatPercent(35)}
                              </span>
                              <ArrowDownIcon className="h-4 w-4 text-green-600" />
                            </div>
                          </div>
                          <Progress value={35} className="h-2 bg-gray-100 [&>*]:bg-green-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Economia Total Anual</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="flex flex-col items-center justify-center">
                          <div className="text-4xl font-bold text-green-600 mb-2">
                            {formatCurrency(economiaTotal)}
                          </div>
                          <div className="text-sm text-gray-500 mb-4">
                            Economia anual estimada
                          </div>
                          <div className="w-full max-w-xs bg-gray-100 rounded-full h-4 mb-2">
                            <div
                              className="bg-green-600 h-4 rounded-full"
                              style={{ width: `${Math.min(economiaTotalPercentual, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-sm font-medium text-green-600">
                            {formatPercent(economiaTotalPercentual)} de redução
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Tab de Benefícios */}
                <TabsContent value="beneficios" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center">
                          <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2" />
                          Benefícios Fiscais
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Redução de até 80% no ITBI na transferência de imóveis</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Economia significativa no ITCMD durante o processo sucessório</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Possibilidade de tributação reduzida sobre rendimentos</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Planejamento tributário mais eficiente para o patrimônio</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center">
                          <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-2" />
                          Proteção Patrimonial
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Blindagem contra riscos empresariais e pessoais</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Proteção contra processos judiciais e credores</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Separação entre patrimônio pessoal e empresarial</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Redução de riscos em caso de divórcio ou disputas familiares</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center">
                          <TrendingUpIcon className="h-5 w-5 text-purple-600 mr-2" />
                          Sucessão Familiar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Simplificação do processo sucessório</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Evita disputas entre herdeiros e conflitos familiares</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Redução de custos e tempo no inventário</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Planejamento sucessório com maior segurança jurídica</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="flex items-center">
                          <PieChartIcon className="h-5 w-5 text-amber-600 mr-2" />
                          Gestão Patrimonial
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Administração centralizada de múltiplos ativos</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Maior controle sobre investimentos e propriedades</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Facilidade na gestão de imóveis e participações societárias</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">Estrutura profissional para governança familiar</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Comparativo de Benefícios</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left py-3 px-4 font-medium">Aspecto</th>
                              <th className="text-center py-3 px-4 font-medium">Sem Holding</th>
                              <th className="text-center py-3 px-4 font-medium">Com Holding</th>
                              <th className="text-right py-3 px-4 font-medium">Impacto</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b">
                              <td className="py-3 px-4">Carga Tributária</td>
                              <td className="text-center py-3 px-4">
                                <Badge variant="outline" className="bg-red-100 text-red-800">Alta</Badge>
                              </td>
                              <td className="text-center py-3 px-4">
                                <Badge variant="outline" className="bg-green-100 text-green-800">Reduzida</Badge>
                              </td>
                              <td className="text-right py-3 px-4 text-green-600 font-medium">
                                {formatPercent(economiaImpostosPercentual)} menor
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 px-4">Proteção Patrimonial</td>
                              <td className="text-center py-3 px-4">
                                <Badge variant="outline" className="bg-red-100 text-red-800">Limitada</Badge>
                              </td>
                              <td className="text-center py-3 px-4">
                                <Badge variant="outline" className="bg-green-100 text-green-800">Elevada</Badge>
                              </td>
                              <td className="text-right py-3 px-4 text-green-600 font-medium">
                                {formatPercent(reducaoRiscosPercentual)} menor risco
                              </td>
                            </tr>
                            <tr className="border-b">
                              <td className="py-3 px-4">Processo Sucessório</td>
                              <td className="text-center py-3 px-4">
                                <Badge variant="outline" className="bg-red-100 text-red-800">Complexo</Badge>
                              </td>
                              <td className="text-center py-3 px-4">
                                <Badge variant="outline" className="bg-green-100 text-green-800">Simplificado</Badge>
                              </td>
                              <td className="text-right py-3 px-4 text-green-600 font-medium">
                                Até 90% mais rápido
                              </td>
                            </tr>
                            <tr>
                              <td className="py-3 px-4">Gestão de Ativos</td>
                              <td className="text-center py-3 px-4">
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Fragmentada</Badge>
                              </td>
                              <td className="text-center py-3 px-4">
                                <Badge variant="outline" className="bg-green-100 text-green-800">Centralizada</Badge>
                              </td>
                              <td className="text-right py-3 px-4 text-green-600 font-medium">
                                Eficiência aumentada
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Chamada para ação */}
              <Card className="bg-accent/10 border-accent/20">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-semibold text-foreground">Vamos criar sua holding juntos?</h3>
                      <p className="text-muted-foreground mt-1">
                        Torne-se cliente da W1 e comece a proteger seu patrimônio hoje
                      </p>
                    </div>
                    <Button onClick={() => navigate('/auth')} className="bg-accent text-white hover:bg-accent/90">
                      Quero ser cliente
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
