import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";

export function Dashboard() {
  const navigate = useNavigate();

  function navigateToHolding() {
    navigate('/my-journey');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Dashboard</h1>
            <button
              onClick={navigateToHolding}
              className="cursor-pointer text-teal-700 hover:text-teal-800 font-medium"
            >
              Ir para Holding
            </button>
          </div>

          <div className="space-y-4">
            {/* Gráfico da Evolução dos Patrimônios */}
            <Card className="bg-gray-200 min-h-48">
              <CardContent className="p-6 flex items-center justify-center h-48">
                <div className="text-center text-gray-500">
                  <h3 className="text-lg font-medium mb-2">GRÁFICO DA EVOLUÇÃO</h3>
                  <h3 className="text-lg font-medium mb-2">DOS</h3>
                  <h3 className="text-lg font-medium">PATRIMÔNIOS (COLUNAS)</h3>
                </div>
              </CardContent>
            </Card>

            {/* Gráfico dos Ativos */}
            <Card className="bg-gray-200 min-h-48">
              <CardContent className="p-6 flex items-center justify-center h-48">
                <div className="text-center text-gray-500">
                  <h3 className="text-lg font-medium mb-2">GRÁFICO DOS ATIVOS</h3>
                  <h3 className="text-lg font-medium">(SETORES)</h3>
                </div>
              </CardContent>
            </Card>

            {/* Terceiro Card Vazio */}
            <Card className="bg-gray-200 min-h-48">
              <CardContent className="p-6 flex items-center justify-center h-48">
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 bg-gray-300 rounded mx-auto"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}