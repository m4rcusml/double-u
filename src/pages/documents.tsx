import React from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Document {
  id: string;
  title: string;
  description: string;
  status: 'absent' | 'pending';
  reason?: string;
}

export const Documents: React.FC = () => {
  const absentDocuments: Document[] = [
    {
      id: '1',
      title: 'Documento 1',
      description: 'Lorem ipsum dolor...',
      status: 'absent'
    },
    {
      id: '2',
      title: 'Documento 1',
      description: 'Lorem ipsum dolor...',
      status: 'absent'
    }
  ];

  const pendingDocuments: Document[] = [
    {
      id: '3',
      title: 'Documento 1',
      description: 'Lorem ipsum dolor...',
      status: 'pending',
      reason: 'Ilegível'
    },
    {
      id: '4',
      title: 'Documento 1',
      description: 'Lorem ipsum dolor...',
      status: 'pending',
      reason: 'Falha no envio'
    }
  ];

  const DocumentCard: React.FC<{ document: Document }> = ({ document }) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-gray-50 rounded-lg">
          <FileText className="w-5 h-5 text-gray-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 text-sm md:text-base">
            {document.title}
          </h3>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            {document.description}
          </p>
          {document.reason && (
            <p className="text-xs text-red-600 mt-1">
              Motivo: {document.reason}
            </p>
          )}
        </div>
      </div>
      <Button
        variant={document.status === 'absent' ? 'default' : 'outline'}
        size="sm"
        className={`
          px-4 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors
          ${document.status === 'absent'
            ? 'bg-slate-700 hover:bg-slate-800 text-white'
            : 'bg-slate-700 hover:bg-slate-800 text-white border-slate-700'
          }
        `}
      >
        {document.status === 'absent' ? 'Enviar' : 'Reenviar'}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Documentos
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Lorem ipsum dolor sit amet
          </p>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Absent Documents */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Ausentes
            </h2>
            <div className="space-y-3">
              {absentDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          </div>

          {/* Pending Documents */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Pendentes
            </h2>
            <div className="space-y-3">
              {pendingDocuments.map((doc) => (
                <DocumentCard key={doc.id} document={doc} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Bottom Indicator */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 lg:hidden">
        <div className="w-32 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  )
}