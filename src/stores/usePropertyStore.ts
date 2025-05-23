import { create } from 'zustand'
import { supabase } from '@/lib/supabaseClient'

// Define the property type
export interface Property {
  id?: string
  name: string
  category: 'Residencial' | 'Comercial' | 'Industrial'
  cep: string
  fullAddress: string
  venalValue: number
  marketValue: number
}

// Define the store state
interface PropertyState {
  properties: Property[]
  search: { query: string, result: Property[] }
  loading: boolean
  error: string | null
  addProperty: (property: Omit<Property, 'id'>) => Promise<void>
  fetchProperties: () => Promise<void>
  updateProperty: (id: string, property: Partial<Property>) => Promise<void>
  deleteProperty: (id: string) => Promise<void>
  searchProperties: (query: string) => void
}

// Create the store
export const usePropertyStore = create<PropertyState>((set) => ({
  properties: [],
  search: {
    query: '',
    result: []
  },
  loading: false,
  error: null,

  addProperty: async (property) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([property])
        .select()

      if (error) throw error

      set((state) => ({
        properties: [...state.properties, ...(data as Property[])],
        loading: false
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  fetchProperties: async () => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')

      if (error) throw error

      set({ properties: data as Property[], loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  updateProperty: async (id, property) => {
    set({ loading: true, error: null })
    try {
      const { error } = await supabase
        .from('properties')
        .update(property)
        .eq('id', id)

      if (error) throw error

      set((state) => ({
        properties: state.properties.map((p) =>
          p.id === id ? { ...p, ...property } : p
        ),
        loading: false
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  deleteProperty: async (id) => {
    set({ loading: true, error: null })
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id)

      if (error) throw error

      set((state) => ({
        properties: state.properties.filter((p) => p.id !== id),
        loading: false
      }))
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  searchProperties: (query: string) => {
    set((state) => ({
      search: {
        query,
        result: state.properties.filter((property) =>
          property.name.toLowerCase().includes(query.toLowerCase())
        )
      }
    }))
  }
}))