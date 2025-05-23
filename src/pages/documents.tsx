import React, { useState, useRef } from 'react';
import { 
  FileText, Upload, Edit, Trash2, AlertCircle, X, RefreshCw, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend 
} from 'recharts';
import useDocumentStore, { type Document, type DocumentStatus } from '@/stores/useDocumentStore';

// Cores para gráficos
const STATUS_COLORS = {
  approved: '#10b981',
  pending: '#f59e0b',
  absent: '#6b7280',
  rejected: '#ef4444'
};

export const Documents: React.FC = () => {
  // Usando o store Zustand
  const { 
    documents, 
    isLoading, 
    error,
    getAbsentDocuments,
    getPendingDocuments,
    getApprovedDocuments,
    getRejectedDocuments,
    uploadDocument,
    reuploadDocument,
    updateDocument,
    deleteDocument,
    addDocument,
    setError
  } = useDocumentStore();

  // Estados locais para edição e upload
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    title: '',
    description: '',
    status: 'absent' as DocumentStatus
  });

  // Refs para inputs de arquivo
  const fileInputRefs = useRef<{[key: string]: HTMLInputElement | null}>({});

  // Obter documentos filtrados
  const absentDocuments = getAbsentDocuments();
  const pendingDocuments = getPendingDocuments();
  const approvedDocuments = getApprovedDocuments();
  const rejectedDocuments = getRejectedDocuments();

  // Dados para estatísticas de documentos
  const documentStats = {
    absent: absentDocuments.length,
    pending: pendingDocuments.length,
    approved: approvedDocuments.length,
    rejected: rejectedDocuments.length,
    total: documents.length
  };

  // Dados para o gráfico de status
  const documentStatusData = [
    { name: 'Aprovados', value: documentStats.approved, color: STATUS_COLORS.approved },
    { name: 'Pendentes', value: documentStats.pending, color: STATUS_COLORS.pending },
    { name: 'Ausentes', value: documentStats.absent, color: STATUS_COLORS.absent },
    { name: 'Rejeitados', value: documentStats.rejected, color: STATUS_COLORS.rejected }
  ];

  // Função para formatar data
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Função para lidar com upload de arquivo
  const handleFileUpload = (id: string, file: File) => {
    if (file) {
      uploadDocument(id, file);
    }
  };

  // Função para lidar com reupload de arquivo
  const handleFileReupload = (id: string, file: File) => {
    if (file) {
      reuploadDocument(id, file);
    }
  };

  // Função para abrir diálogo de edição
  const handleEditClick = (document: Document) => {
    setEditingDocument(document);
    setIsEditDialogOpen(true);
  };

  // Função para salvar edição
  const handleSaveEdit = () => {
    if (editingDocument) {
      updateDocument(editingDocument.id, editingDocument);
      setIsEditDialogOpen(false);
      setEditingDocument(null);
    }
  };

  // Função para confirmar exclusão
  const handleDeleteConfirm = () => {
    if (editingDocument) {
      deleteDocument(editingDocument.id);
      setIsDeleteDialogOpen(false);
      setEditingDocument(null);
    }
  };

  // Função para adicionar novo documento
  const handleAddDocument = () => {
    if (newDocument.title.trim() === '') {
      setError('O título do documento é obrigatório');
      return;
    }

    addDocument({
      title: newDocument.title,
      description: newDocument.description,
      status: newDocument.status
    });

    // Resetar formulário
    setNewDocument({
      title: '',
      description: '',
      status: 'absent' as DocumentStatus
    });
    
    setIsAddDialogOpen(false);
  };

  // Componente de cartão de documento
  const DocumentCard: React.FC<{ document: Document }> = ({ document }) => {
    // Determinar cor do status
    const getStatusColor = (status: DocumentStatus) => {
      switch (status) {
        case 'absent': return 'bg-gray-200 text-gray-800';
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'approved': return 'bg-green-100 text-green-800';
        case 'rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-200 text-gray-800';
      }
    };

    // Determinar texto do status
    const getStatusText = (status: DocumentStatus) => {
      switch (status) {
        case 'absent': return 'Ausente';
        case 'pending': return 'Pendente';
        case 'approved': return 'Aprovado';
        case 'rejected': return 'Rejeitado';
        default: return 'Desconhecido';
      }
    };

    return (
      <div className="flex flex-col p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              <FileText className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900 text-sm md:text-base">
                {document.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {document.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <Badge variant="outline" className={getStatusColor(document.status)}>
                  {getStatusText(document.status)}
                </Badge>
                
                {document.file && (
                  <Badge variant="outline" className="bg-blue-100 text-blue-800">
                    Arquivo anexado
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                    onClick={() => handleEditClick(document)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Editar documento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8 text-red-500 hover:text-red-700"
                    onClick={() => {
                      setEditingDocument(document);
                      setIsDeleteDialogOpen(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Excluir documento</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        
        {document.reason && (
          <Alert variant="destructive" className="mt-2 py-2">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Motivo: {document.reason}
            </AlertDescription>
          </Alert>
        )}
        
        {document.uploadDate && (
          <p className="text-xs text-gray-400 mt-2">
            Enviado em: {formatDate(document.uploadDate)}
          </p>
        )}
        
        {document.lastUpdated && document.lastUpdated !== document.uploadDate && (
          <p className="text-xs text-gray-400 mt-1">
            Atualizado em: {formatDate(document.lastUpdated)}
          </p>
        )}
        
        <div className="mt-4 flex justify-end">
          <input
            type="file"
            id={`file-${document.id}`}
            className="hidden"
            ref={el => { fileInputRefs.current[document.id] = el }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                if (document.status === 'absent') {
                  handleFileUpload(document.id, file);
                } else {
                  handleFileReupload(document.id, file);
                }
              }
            }}
          />
          
          {document.status === 'absent' ? (
            <Button
              variant="default"
              size="sm"
              className="bg-slate-700 hover:bg-slate-800 text-white"
              onClick={() => fileInputRefs.current[document.id]?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              Enviar
            </Button>
          ) : document.status === 'pending' || document.status === 'rejected' ? (
            <Button
              variant="outline"
              size="sm"
              className="border-slate-700 text-slate-700 hover:bg-slate-100"
              onClick={() => fileInputRefs.current[document.id]?.click()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Reenviar
            </Button>
          ) : null}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* Page Title and Add Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Documentos
            </h1>
            <p className="text-sm md:text-base text-gray-600">
              Gerencie todos os documentos necessários para sua holding
            </p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-slate-700 hover:bg-slate-800">
                Adicionar Documento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Adicionar Novo Documento</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newDocument.title}
                    onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                    placeholder="Ex: Certidão de Nascimento"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea
                    id="description"
                    value={newDocument.description}
                    onChange={(e) => setNewDocument({...newDocument, description: e.target.value})}
                    placeholder="Descreva o documento..."
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
                <Button onClick={handleAddDocument}>Adicionar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
            <Button 
              variant="ghost" 
              size="icon" 
              className="ml-auto h-6 w-6" 
              onClick={() => setError(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        )}

        {/* Status dos Documentos - Integrado do Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-green-50 border-green-100">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-green-700">Aprovados</p>
                  <h3 className="text-2xl font-bold mt-1 text-green-900">{documentStats.approved}</h3>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-700" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={(documentStats.approved / documentStats.total) * 100} className="h-2 bg-green-200 [&>*]:bg-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-100">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-yellow-700">Pendentes</p>
                  <h3 className="text-2xl font-bold mt-1 text-yellow-900">{documentStats.pending}</h3>
                </div>
                <div className="p-2 bg-yellow-100 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-yellow-700" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={(documentStats.pending / documentStats.total) * 100} className="h-2 bg-yellow-200 [&>*]:bg-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-50 border-gray-100">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-700">Ausentes</p>
                  <h3 className="text-2xl font-bold mt-1 text-gray-900">{documentStats.absent}</h3>
                </div>
                <div className="p-2 bg-gray-200 rounded-full">
                  <FileText className="h-5 w-5 text-gray-700" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={(documentStats.absent / documentStats.total) * 100} className="h-2 bg-gray-200 [&>*]:bg-gray-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-red-50 border-red-100">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-red-700">Rejeitados</p>
                  <h3 className="text-2xl font-bold mt-1 text-red-900">{documentStats.rejected}</h3>
                </div>
                <div className="p-2 bg-red-100 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-700" />
                </div>
              </div>
              <div className="mt-4">
                <Progress value={(documentStats.rejected / documentStats.total) * 100} className="h-2 bg-red-200 [&>*]:bg-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gráficos de Documentos - Integrado do Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Gráfico de Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Status dos Documentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={documentStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {documentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Documentos Pendentes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documentos Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingDocuments.length > 0 ? (
                  pendingDocuments.slice(0, 4).map((doc) => (
                    <div key={doc.id} className="flex items-start p-3 border rounded-lg">
                      <div className="p-2 bg-yellow-100 rounded-lg mr-3">
                        <FileText className="h-5 w-5 text-yellow-700" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{doc.title}</h4>
                        <p className="text-sm text-gray-500">{doc.description}</p>
                        {doc.reason && (
                          <p className="text-xs text-red-600 mt-1">Motivo: {doc.reason}</p>
                        )}
                      </div>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 ml-2">
                        Pendente
                      </Badge>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    Não há documentos pendentes
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Absent Documents */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center">
              Ausentes
              <Badge className="ml-2 bg-gray-200 text-gray-800">{absentDocuments.length}</Badge>
            </h2>
            <div className="space-y-3">
              {absentDocuments.length > 0 ? (
                absentDocuments.map((doc: any) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">Não há documentos ausentes.</p>
              )}
            </div>
          </div>

          {/* Pending Documents */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center">
              Pendentes
              <Badge className="ml-2 bg-yellow-100 text-yellow-800">{pendingDocuments.length}</Badge>
            </h2>
            <div className="space-y-3">
              {pendingDocuments.length > 0 ? (
                pendingDocuments.map((doc: any) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">Não há documentos pendentes.</p>
              )}
            </div>
          </div>
        </div>

        {/* Approved and Rejected Documents */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-8">
          {/* Approved Documents */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center">
              Aprovados
              <Badge className="ml-2 bg-green-100 text-green-800">{approvedDocuments.length}</Badge>
            </h2>
            <div className="space-y-3">
              {approvedDocuments.length > 0 ? (
                approvedDocuments.map((doc: any) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">Não há documentos aprovados.</p>
              )}
            </div>
          </div>

          {/* Rejected Documents */}
          <div className="space-y-4">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 flex items-center">
              Rejeitados
              <Badge className="ml-2 bg-red-100 text-red-800">{rejectedDocuments.length}</Badge>
            </h2>
            <div className="space-y-3">
              {rejectedDocuments.length > 0 ? (
                rejectedDocuments.map((doc: any) => (
                  <DocumentCard key={doc.id} document={doc} />
                ))
              ) : (
                <p className="text-sm text-gray-500 italic">Não há documentos rejeitados.</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Documento</DialogTitle>
          </DialogHeader>
          {editingDocument && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Título</Label>
                <Input
                  id="edit-title"
                  value={editingDocument.title}
                  onChange={(e) => setEditingDocument({...editingDocument, title: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <Textarea
                  id="edit-description"
                  value={editingDocument.description}
                  onChange={(e) => setEditingDocument({...editingDocument, description: e.target.value})}
                />
              </div>
              {editingDocument.status === 'rejected' && (
                <div className="space-y-2">
                  <Label htmlFor="edit-reason">Motivo da Rejeição</Label>
                  <Input
                    id="edit-reason"
                    value={editingDocument.reason || ''}
                    onChange={(e) => setEditingDocument({...editingDocument, reason: e.target.value})}
                  />
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveEdit}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>Tem certeza que deseja excluir o documento "{editingDocument?.title}"?</p>
            <p className="text-sm text-gray-500 mt-2">Esta ação não pode ser desfeita.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Documents;
