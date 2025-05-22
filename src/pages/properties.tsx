import React, { useState } from 'react'
import { Filter, Building, ChevronRight, ChevronLeft } from 'lucide-react'
import { PropertyCard } from '@/components/property-card';

// PropertyListItem Component
interface PropertyListItemProps {
  title: string;
  cep: string;
  price: number;
  priceChange: number;
  location: string;
  category: string;
}

const PropertyListItem: React.FC<PropertyListItemProps> = ({
  title,
  cep,
  price,
  priceChange,
  location,
  category
}) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value);
  }

  return (
    <div className='flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg'>
      <div className='flex items-center gap-3'>
        <div className='w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center'>
          <Building className='w-5 h-5 text-gray-600' />
        </div>
        <div>
          <div className='flex items-center gap-2'>
            <h3 className='font-medium text-gray-900'>{title}</h3>
            <span className='text-sm text-gray-500'>({cep})</span>
          </div>
          <div className='flex items-center gap-2 mt-1'>
            <span className='text-sm font-medium text-gray-900'>{formatPrice(price)}</span>
            <span className='text-sm text-green-600 font-medium'>+{priceChange}%</span>
          </div>
          <div className='flex gap-2 mt-2'>
            <span className='text-xs px-2 py-1 bg-gray-900 text-white rounded-full'>{location}</span>
            <span className='text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full border'>{category}</span>
          </div>
        </div>
      </div>
      <ChevronRight className='w-5 h-5 text-gray-400' />
    </div>
  )
}

// Main App Component
export const Properties: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const properties = [
    {
      id: 1,
      title: 'Imóvel xyz',
      cep: '22753-050',
      price: 344687.55,
      priceChange: 8,
      location: 'Manaus, AM',
      category: 'Comercial'
    },
    {
      id: 2,
      title: 'Imóvel xyz',
      cep: '22753-050',
      price: 344687.55,
      priceChange: 8,
      location: 'Manaus, AM',
      category: 'Comercial'
    },
    {
      id: 3,
      title: 'Imóvel xyz',
      cep: '22753-050',
      price: 344687.55,
      priceChange: 8,
      location: 'Manaus, AM',
      category: 'Comercial'
    },
    {
      id: 4,
      title: 'Imóvel xyz',
      cep: '22753-050',
      price: 344687.55,
      priceChange: 8,
      location: 'Manaus, AM',
      category: 'Comercial'
    },
    {
      id: 5,
      title: 'Imóvel xyz',
      cep: '22753-050',
      price: 344687.55,
      priceChange: 8,
      location: 'Manaus, AM',
      category: 'Comercial'
    }
  ]

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='p-4'>
        {/* Seus imóveis section */}
        <div className='mb-6'>
          <h2 className='text-xl font-semibold text-gray-900 mb-1'>
            Seus imóveis <span className='text-sm font-normal text-gray-500'>(DESTAQUES)</span>
          </h2>

          <div className='flex gap-4 overflow-x-auto pb-4'>
            <div className='flex-shrink-0 w-fit'>
              <PropertyCard />
            </div>
            <div className='flex-shrink-0 w-fit'>
              <PropertyCard
                title='Apt. Centro'
                lastUpdated='Atualizado há 1 mês'
                price={250000}
                priceChange={3}
                cep='01234-567'
                location='São Paulo, SP'
                category='Residencial'
              />
            </div>
          </div>
        </div>

        {/* Todos os imóveis section */}
        <div>
          <h2 className='text-xl font-semibold text-gray-900 mb-4'>Todos os imóveis</h2>

          {/* Search and Filter */}
          <div className='flex gap-2 mb-4'>
            <div className='flex-1'>
              <input
                type='text'
                placeholder='Pesquisar...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>
            <button className='px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2 hover:bg-gray-50'>
              <span className='text-gray-700'>Filtrar</span>
              <Filter className='w-4 h-4 text-gray-600' />
            </button>
          </div>

          {/* Add Button */}
          <button className='w-full bg-teal-700 text-white py-3 rounded-lg font-medium mb-4 hover:bg-teal-800'>
            Adicionar
          </button>

          {/* Property List */}
          <div className='space-y-3'>
            {properties.map((property) => (
              <PropertyListItem
                key={property.id}
                title={property.title}
                cep={property.cep}
                price={property.price}
                priceChange={property.priceChange}
                location={property.location}
                category={property.category}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className='flex items-center justify-between mt-6 px-2'>
            <button className='flex items-center gap-2 text-gray-600 hover:text-gray-900'>
              <ChevronLeft className='w-4 h-4' />
              <span>Previous</span>
            </button>

            <div className='flex items-center gap-2'>
              <button className='w-8 h-8 rounded bg-gray-900 text-white text-sm'>1</button>
              <button className='w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm'>2</button>
              <button className='w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm'>3</button>
              <span className='text-gray-400'>...</span>
            </div>

            <button className='flex items-center gap-2 text-gray-600 hover:text-gray-900'>
              <span>Next</span>
              <ChevronRight className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}