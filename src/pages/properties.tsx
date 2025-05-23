import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { Filter, ChevronRight, Search, Loader2, Building2, ChevronLeft } from 'lucide-react'
import { PropertyCard } from '@/components/property-card'
import { AddProperty } from './add-property'
import { usePropertyStore, type Property } from '@/stores/usePropertyStore'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination'

// PropertyListItem Component
interface PropertyListItemProps extends Property { }

const PropertyListItem: React.FC<PropertyListItemProps> = ({
  name,
  category,
  cep,
  fullAddress,
  venalValue,
  marketValue
}) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value)
  }

  return (
    <div className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
          <Building2 className='w-5 h-5 text-gray-600' />
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <h3 className='font-medium text-gray-900'>{name}</h3>
            <span className='text-sm text-gray-500'>({cep})</span>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <span className='text-sm font-medium text-gray-900'>{formatPrice(venalValue)}</span>
            <span className={`text-sm font-medium ${((marketValue - venalValue) / venalValue) * 100 > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {((marketValue - venalValue) / venalValue) * 100 > 0 ? '+' : ''}
              {(((marketValue - venalValue) / venalValue) * 100).toFixed(2)}%
            </span>
          </div>
          <div className='flex gap-2 mt-2'>
            <span className='text-xs px-2 py-1 bg-gray-900 text-white rounded-full'>{fullAddress}</span>
            <span className='text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full border'>{category}</span>
          </div>
        </div>
      </div>
      <ChevronRight className='w-5 h-5 text-gray-400' />
    </div>
  )
}

// Loading Skeleton Component
const PropertySkeleton: React.FC = () => (
  <div className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg animate-pulse'>
    <div className='flex items-center gap-3'>
      <div className='w-10 h-10 bg-gray-200 rounded-lg'></div>
      <div>
        <div className='h-4 bg-gray-200 rounded w-32 mb-2'></div>
        <div className='h-3 bg-gray-200 rounded w-24 mb-2'></div>
        <div className='flex gap-2'>
          <div className='h-5 bg-gray-200 rounded w-20'></div>
          <div className='h-5 bg-gray-200 rounded w-16'></div>
        </div>
      </div>
    </div>
    <div className='w-5 h-5 bg-gray-200 rounded'></div>
  </div>
)

// Main App Component
export const Properties: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearching, setIsSearching] = useState(false)
  const { fetchProperties, searchProperties, loading, properties } = usePropertyStore()

  const ITEMS_PER_PAGE = 5

  useEffect(() => {
    fetchProperties()
  }, [])

  // Enhanced search functionality with debouncing and caching
  const [searchCache, setSearchCache] = useState<Map<string, Property[]>>(new Map())

  const performSearch = useCallback(async (term: string) => {
    if (!term.trim()) {
      return properties
    }

    // Check cache first
    if (searchCache.has(term)) {
      return searchCache.get(term)!
    }

    setIsSearching(true)
    try {
      // If searchProperties returns filtered results, use it
      if (searchProperties) {
        await searchProperties(term)
        // Cache the current properties state after search
        setSearchCache(prev => new Map(prev).set(term, properties))
        return properties
      }
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }

    return properties
  }, [properties, searchProperties, searchCache])

  // Debounced search effect
  useEffect(() => {
    const delayedSearch = setTimeout(async () => {
      if (searchTerm.trim()) {
        await performSearch(searchTerm)
        setCurrentPage(1) // Reset to first page when searching
      } else {
        setCurrentPage(1)
      }
    }, 300)

    return () => clearTimeout(delayedSearch)
  }, [searchTerm, performSearch])

  // Clear cache when properties change (new property added/removed)
  useEffect(() => {
    setSearchCache(new Map())
  }, [properties.length])

  // Optimized filtered and paginated properties with memoization
  const { paginatedProperties, totalPages, totalItems } = useMemo(() => {
    let filteredProps = properties

    // Client-side filtering for better performance with cached results
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      const normalizedTerm = term.replace(/\s+/g, ' ').trim()

      filteredProps = properties.filter(property => {
        // Create searchable text combining all relevant fields
        const searchableText = [
          property.name,
          property.fullAddress,
          property.category,
          property.cep
        ].join(' ').toLowerCase()

        // Support for partial matches and multiple terms
        return normalizedTerm.split(' ').every(termPart =>
          searchableText.includes(termPart)
        )
      })
    }

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    const paginated = filteredProps.slice(startIndex, endIndex)
    const totalPages = Math.ceil(filteredProps.length / ITEMS_PER_PAGE)

    return {
      paginatedProperties: paginated,
      totalPages,
      totalItems: filteredProps.length,
      filteredProperties: filteredProps
    }
  }, [properties, searchTerm, currentPage, ITEMS_PER_PAGE])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
      // Scroll to top of list
      document.querySelector('.property-list')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchTerm(value)

    // If clearing search, immediately fetch all properties
    if (!value.trim()) {
      setIsSearching(false)
      fetchProperties()
    }
  }, [fetchProperties])

  const clearSearch = useCallback(() => {
    setSearchTerm('')
    setCurrentPage(1)
    setIsSearching(false)
    fetchProperties()
  }, [fetchProperties])

  // Generate page numbers for shadcn pagination
  const getVisiblePages = useCallback(() => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...')
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }, [currentPage, totalPages])

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='p-4'>
        {/* Seus imóveis section */}
        <div className='mb-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-1'>
            Seus imóveis <span className='text-sm font-normal text-gray-500'>(DESTAQUES)</span>
          </h2>

          {loading ? (
            <div className='flex gap-4 overflow-x-auto pb-4'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='flex-shrink-0 w-72 h-40 bg-gray-200 rounded-lg animate-pulse'></div>
              ))}
            </div>
          ) : (
            <div className='flex gap-4 overflow-x-auto pb-4'>
              {properties.slice(0, 3).map((property) => (
                <div key={property.id} className='flex-shrink-0 w-fit'>
                  <PropertyCard
                    title={property.name}
                    lastUpdated='Atualizado recentemente'
                    price={property.marketValue}
                    priceChange={((property.marketValue - property.venalValue) / property.venalValue) * 100}
                    cep={property.cep}
                    location={property.fullAddress}
                    category={property.category}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Todos os imóveis section */}
        <div className='property-list'>
          <div className='flex items-center justify-between mb-4'>
            <h2 className='text-xl font-semibold text-gray-900'>Todos os imóveis</h2>
            {!loading && (
              <span className='text-sm text-gray-500'>
                {totalItems} {totalItems === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
              </span>
            )}
          </div>

          {/* Search and Filter */}
          <div className='flex gap-2 mb-4'>
            <div className='flex-1 relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                {isSearching ? (
                  <Loader2 className='h-4 w-4 text-gray-400 animate-spin' />
                ) : (
                  <Search className='h-4 w-4 text-gray-400' />
                )}
              </div>
              <input
                type='text'
                placeholder='Pesquisar por nome, endereço, categoria ou CEP...'
                value={searchTerm}
                onChange={handleSearchChange}
                className='w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                aria-label='Pesquisar imóveis'
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600'
                >
                  ×
                </button>
              )}
            </div>
            <button className='px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors'>
              <span className='text-gray-700'>Filtrar</span>
              <Filter className='w-4 h-4 text-gray-600' />
            </button>
          </div>

          {/* Add Button */}
          <AddProperty />

          {/* Property List */}
          <div className='space-y-3'>
            {loading ? (
              // Loading skeletons
              Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                <PropertySkeleton key={index} />
              ))
            ) : paginatedProperties.length > 0 ? (
              // Properties list
              paginatedProperties.map((property) => (
                <PropertyListItem
                  key={property.id}
                  name={property.name}
                  cep={property.cep}
                  venalValue={property.venalValue}
                  marketValue={property.marketValue}
                  fullAddress={property.fullAddress}
                  category={property.category}
                  id={property.id}
                />
              ))
            ) : (
              // Empty state
              <div className='text-center py-12'>
                <Building2 className='w-12 h-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-gray-900 font-medium mb-2'>
                  {searchTerm ? 'Nenhum imóvel encontrado' : 'Nenhum imóvel cadastrado'}
                </h3>
                <p className='text-gray-500'>
                  {searchTerm
                    ? 'Tente ajustar sua pesquisa ou limpar os filtros.'
                    : 'Comece adicionando seu primeiro imóvel.'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                  >
                    Limpar pesquisa
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Shadcn UI Pagination */}
          {!loading && (
            <div className='mt-8'>
              <Pagination>
                <PaginationContent className='flex-1 self-stretch flex justify-between'>
                  <PaginationItem>
                    <button
                      className={'flex items-center gap-2 text-gray-600 hover:bg-gray-100 border-2 rounded-md px-3 py-1' + (currentPage === 1 ? ' pointer-events-none opacity-50' : ' cursor-pointer')}
                      onClick={(e: React.MouseEvent) => {
                      e.preventDefault()
                      handlePageChange(currentPage - 1)
                      }}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className='w-4 h-4' />
                      <span>Anterior</span>
                    </button>
                  </PaginationItem>

                  <div className='flex items-center gap-1'>
                    {getVisiblePages().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === '...' ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href='#'
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault()
                              handlePageChange(page as number)
                            }}
                            isActive={currentPage === page}
                            className='cursor-pointer'
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}
                  </div>

                  <PaginationItem>
                    <button
                      className={'flex items-center gap-2 text-gray-600 hover:bg-gray-100 border-2 rounded-md px-3 py-1' + (currentPage === totalPages ? ' pointer-events-none opacity-50' : ' cursor-pointer')}
                      disabled={currentPage === totalPages}
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault()
                        handlePageChange(currentPage + 1)
                      }}
                    >
                      <span>Próximo</span>
                      <ChevronRight className='w-4 h-4' />
                    </button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

          {/* Pagination info */}
          {!loading && totalItems > 0 && (
            <div className='text-center mt-4 text-sm text-gray-500'>
              Mostrando {Math.min((currentPage - 1) * ITEMS_PER_PAGE + 1, totalItems)} a{' '}
              {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} de {totalItems} imóveis
            </div>
          )}
        </div>
      </div>
    </div>
  )
}