import React from 'react';
import { Info, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface PropertyCardProps {
  title?: string;
  lastUpdated?: string;
  price?: number;
  priceChange?: number;
  cep?: string;
  location?: string;
  category?: string;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  title = 'Apto. Ponta Negra',
  lastUpdated = 'Atualizado há 3 meses',
  price = 190000,
  priceChange = 5,
  cep = '22753-050',
  location = 'Manaus, AM',
  category = 'Comercial'
}) => {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2
    }).format(value);
  };

  return (
    <Card className='w-fit max-w-sm bg-white shadow-sm border border-gray-200 rounded-lg'>
      <CardContent className='px-4 space-y-3'>
        {/* Header */}
        <div className='flex items-start justify-between'>
          <div>
            <h3 className='font-medium text-gray-900 text-lg'>{title}</h3>
            <p className='text-sm text-gray-500 mt-1'>{lastUpdated}</p>
          </div>
          <Info className='w-5 h-5 text-gray-400 mt-1' />
        </div>

        {/* Price */}
        <div className='flex items-center gap-2'>
          <span className='text-2xl font-semibold text-gray-900'>
            {formatPrice(price)}
          </span>
          <div className={`flex items-center gap-1 ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {priceChange >= 0 ? <TrendingUp className='w-4 h-4' /> : <TrendingDown className='w-4 h-4' />}
            <span className='text-sm font-medium'>{priceChange.toFixed(2)}%</span>
          </div>
        </div>

        {/* CEP */}
        <div className='text-sm text-gray-600'>
          <span className='font-medium'>CEP:</span> {cep}
        </div>

        {/* Tags */}
        <div className='flex gap-2'>
          <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-900 text-white'>
            {location}
          </span>
          <span className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-300'>
            {category}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}