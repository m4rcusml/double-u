import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { usePropertyStore, type Property as PropertyType } from '@/stores/usePropertyStore'

// Zod validation schema
const propertySchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório').min(2, 'Nome deve ter pelo menos 2 caracteres'),
  category: z.enum(['Residencial', 'Comercial', 'Industrial'], {
    required_error: 'Categoria é obrigatória',
  }),
  cep: z.string()
    .min(1, 'CEP é obrigatório')
    .regex(/^\d{5}-?\d{3}$/, 'CEP deve ter o formato 00000-000'),
  fullAddress: z.string().min(1, 'Endereço é obrigatório').min(5, 'Endereço deve ter pelo menos 5 caracteres'),
  venalValue: z.coerce.number({ required_error: 'Valor venal é obrigatório' })
    .nonnegative('Valor venal deve ser positivo'),
  marketValue: z.coerce.number({ required_error: 'Valor de mercado é obrigatório' })
    .nonnegative('Valor de mercado deve ser positivo')
})

type PropertyFormData = Omit<PropertyType, 'id'>

export function AddProperty() {
  const [open, setOpen] = useState(false)
  const { addProperty, loading } = usePropertyStore()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(propertySchema),
  })

  const onSubmit = function (data: PropertyFormData) {
    try {
      // Format CEP to include dash if not present
      const formattedCep = data.cep.replace(/(\d{5})(\d{3})/, '$1-$2')

      addProperty({
        ...data,
        cep: formattedCep,
        category: data.category,
        venalValue: Number(data.venalValue),
        marketValue: Number(data.marketValue),
      }).finally(() => {
        // Reset form and close dialog on success
        reset()
        setOpen(false)
      })
    } catch (error) {
      console.error('Erro ao adicionar propriedade:', error)
    }
  }

  const handleCancel = () => {
    reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='w-full bg-teal-700 text-white py-3 rounded-lg font-medium mb-4 hover:bg-teal-800'>
          Adicionar
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Adicionar propriedade</DialogTitle>
          <DialogDescription>
            Preencha abaixo para adicionar seu imóvel
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-4 py-4'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='name'>Nome</Label>
              <Input
                id='name'
                placeholder='Insira o nome'
                {...register('name')}
              />
              {errors.name && (
                <span className='text-sm text-red-500'>{errors.name.message}</span>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='category'>Categoria</Label>
              <Controller
                name='category'
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Selecione...' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Residencial'>Residencial</SelectItem>
                      <SelectItem value='Comercial'>Comercial</SelectItem>
                      <SelectItem value='Industrial'>Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <span className='text-sm text-red-500'>{errors.category.message}</span>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='cep'>CEP</Label>
              <Input
                id='cep'
                placeholder='00000-000'
                {...register('cep')}
              />
              {errors.cep && (
                <span className='text-sm text-red-500'>{errors.cep.message}</span>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='fullAddress'>Endereço completo</Label>
              <Input
                id='fullAddress'
                placeholder='Insira o endereço'
                {...register('fullAddress')}
              />
              {errors.fullAddress && (
                <span className='text-sm text-red-500'>{errors.fullAddress.message}</span>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='venalValue'>Valor venal (R$)</Label>
              <Input
                id='venalValue'
                placeholder='0.000,00'
                type='number'
                step='0.01'
                {...register('venalValue', { valueAsNumber: true })}
              />
              {errors.venalValue && (
                <span className='text-sm text-red-500'>{errors.venalValue.message}</span>
              )}
            </div>

            <div className='flex flex-col gap-2'>
              <Label htmlFor='marketValue'>Valor de mercado (R$)</Label>
              <Input
                id='marketValue'
                placeholder='0.000,00'
                type='number'
                step='0.01'
                {...register('marketValue', { valueAsNumber: true })}
              />
              {errors.marketValue && (
                <span className='text-sm text-red-500'>{errors.marketValue.message}</span>
              )}
            </div>
          </div>

          <DialogFooter className='flex flex-col flex-wrap gap-2'>
            <Button
              type='submit'
              className='w-full'
              disabled={loading}
            >
              {loading ? 'Adicionando...' : 'Adicionar'}
            </Button>
            <Button
              type='button'
              variant='outline'
              className='w-full'
              onClick={handleCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}