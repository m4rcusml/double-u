import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definição dos tipos
export type DocumentStatus = 'absent' | 'pending' | 'approved' | 'rejected';

export interface Document {
  id: string;
  title: string;
  description: string;
  status: DocumentStatus;
  reason?: string;
  file?: File;
  uploadDate?: string;
  lastUpdated?: string;
}

interface DocumentState {
  // Estado
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  
  // Ações
  addDocument: (document: Omit<Document, 'id' | 'uploadDate' | 'lastUpdated'>) => void;
  uploadDocument: (id: string, file: File) => void;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  reuploadDocument: (id: string, file: File) => void;
  
  // Filtros e utilitários
  getAbsentDocuments: () => Document[];
  getPendingDocuments: () => Document[];
  getApprovedDocuments: () => Document[];
  getRejectedDocuments: () => Document[];
  getDocumentById: (id: string) => Document | undefined;
  
  // Ações de gerenciamento
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  resetStore: () => void;
}

// Documentos iniciais para demonstração
const initialDocuments: Document[] = [
  {
    id: '1',
    title: 'RG e CPF',
    description: 'Documento de identificação pessoal',
    status: 'absent'
  },
  {
    id: '2',
    title: 'Comprovante de Residência',
    description: 'Documento com data de emissão inferior a 90 dias',
    status: 'absent'
  },
  {
    id: '3',
    title: 'Certidão de Nascimento/Casamento',
    description: 'Documento civil atualizado',
    status: 'pending',
    reason: 'Documento ilegível',
    uploadDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  },
  {
    id: '4',
    title: 'Declaração de Imposto de Renda',
    description: 'Última declaração completa com recibo',
    status: 'pending',
    reason: 'Documento incompleto',
    uploadDate: new Date().toISOString(),
    lastUpdated: new Date().toISOString()
  }
];

// Criação do store com Zustand
const useDocumentStore = create<DocumentState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      documents: initialDocuments,
      isLoading: false,
      error: null,
      
      // Ações
      addDocument: (document) => {
        const newDocument: Document = {
          ...document,
          id: Date.now().toString(), // Gera um ID único baseado no timestamp
          uploadDate: new Date().toISOString(),
          lastUpdated: new Date().toISOString()
        };
        
        set((state) => ({
          documents: [...state.documents, newDocument]
        }));
      },
      
      uploadDocument: (id, file) => {
        set((state) => {
          const now = new Date().toISOString();
          
          return {
            documents: state.documents.map((doc) => 
              doc.id === id 
                ? { 
                    ...doc, 
                    file, 
                    status: 'pending', 
                    uploadDate: now,
                    lastUpdated: now,
                    reason: undefined // Limpa qualquer motivo anterior
                  } 
                : doc
            )
          };
        });
      },
      
      updateDocument: (id, updates) => {
        set((state) => ({
          documents: state.documents.map((doc) => 
            doc.id === id 
              ? { 
                  ...doc, 
                  ...updates, 
                  lastUpdated: new Date().toISOString() 
                } 
              : doc
          )
        }));
      },
      
      deleteDocument: (id) => {
        set((state) => ({
          documents: state.documents.filter((doc) => doc.id !== id)
        }));
      },
      
      reuploadDocument: (id, file) => {
        set((state) => {
          const now = new Date().toISOString();
          
          return {
            documents: state.documents.map((doc) => 
              doc.id === id 
                ? { 
                    ...doc, 
                    file, 
                    status: 'pending', 
                    lastUpdated: now,
                    reason: undefined // Limpa qualquer motivo anterior
                  } 
                : doc
            )
          };
        });
      },
      
      // Filtros e utilitários
      getAbsentDocuments: () => {
        return get().documents.filter((doc) => doc.status === 'absent');
      },
      
      getPendingDocuments: () => {
        return get().documents.filter((doc) => doc.status === 'pending');
      },
      
      getApprovedDocuments: () => {
        return get().documents.filter((doc) => doc.status === 'approved');
      },
      
      getRejectedDocuments: () => {
        return get().documents.filter((doc) => doc.status === 'rejected');
      },
      
      getDocumentById: (id) => {
        return get().documents.find((doc) => doc.id === id);
      },
      
      // Ações de gerenciamento
      setLoading: (isLoading) => {
        set({ isLoading });
      },
      
      setError: (error) => {
        set({ error });
      },
      
      resetStore: () => {
        set({
          documents: initialDocuments,
          isLoading: false,
          error: null
        });
      }
    }),
    {
      name: 'document-storage', // Nome para o localStorage
      partialize: (state) => ({
        // Salvar apenas os documentos, não o estado de loading ou erros
        documents: state.documents.map(doc => ({
          ...doc,
          file: undefined // Não salvar arquivos no localStorage
        }))
      }),
    }
  )
);

export default useDocumentStore;
