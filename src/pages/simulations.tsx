import { useEffect, useRef } from 'react'
import { FileTextIcon, BarChart3Icon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useSimulationStore } from '@/stores/simulation-store'
import { useLocation } from 'react-router'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

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

  const generatePDF = async () => {
    if (!resultRef.current) return
    const canvas = await html2canvas(resultRef.current)
    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')

    const imgProps = pdf.getImageProperties(imgData)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('relatorio_simulacao.pdf')
  }

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
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="semHolding" name="Sem Holding" stroke="#ef4444" strokeWidth={2} />
                      <Line type="monotone" dataKey="comHolding" name="Com Holding" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
