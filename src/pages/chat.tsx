import { Badge } from '@/components/ui/badge'
import { SendHorizonal } from 'lucide-react'

export function Chat() {
  return (
    <section className='flex flex-col h-full'>
      <div className='flex-1 flex flex-col items-center justify-center overflow-y-auto p-4'>
        <h1 className='text-2xl font-bold mb-4'>Como podemos te ajudar?</h1>
        <div className='flex gap-2'>
          <Badge variant='secondary'>Fale com um consultor</Badge>
          <Badge variant='secondary'>Documentos</Badge>
        </div>
      </div>

      <div className='bg-muted border-t border-muted p-4'>
        <div className='max-w-2xl mx-auto flex items-center gap-2'>
          <input
            type='text'
            placeholder='Escreva aqui'
            className='w-full py-2 px-4 bg-background rounded-full focus:outline-none'
          />
          <button className='cursor-pointer hover:bg-muted'>
            <SendHorizonal size={28} />
          </button>
        </div>
      </div>
    </section>
  )
}