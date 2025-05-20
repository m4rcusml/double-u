import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';

export function Simulations() {
  return (<>
    <section className='flex flex-col gap-6 p-6'>
      <div className='flex flex-col gap-1'>
        <h1 className='text-2xl font-bold'>Simulações</h1>
        <p className='text-muted-foreground'>Lorem ipsum dolor sit amet</p>
      </div>

      <Card className='bg-background flex flex-col gap-2.5 p-3'>
        <h2 className='text-2xl font-semibold'>Suas informações</h2>

        <Input placeholder='Patrimônio total (R$)' type='number' />

        <div className='flex gap-2.5'>
          <Input placeholder='Empresas' type='number' />
          <Select defaultValue='empresario'>
            <SelectTrigger className='w-full'>
              
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='empresario'>Empresário</SelectItem>
              <SelectItem value='sociedade'>Sociedade</SelectItem>
              <SelectItem value='mei'>MEI</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className='flex gap-2.5'>
          <Input placeholder='Herdeiros' type='number' />
          <Input placeholder='Imóveis' type='number' />
        </div>
        
        <Input placeholder='Valor de mercado total (R$)' type='number' />
        <Input placeholder='Valor venal dos imóveis (R$)' type='number' />
        
        <div className='flex gap-2.5'>
          <Button className='bg-accent flex-1/3'>Simular</Button>
          <Button variant='outline' className='flex-2/3 border-accent text-accent-foreground hover:bg-accent hover:text-white'>Gerar relatório PDF</Button>
        </div>
      </Card>

      <Card className='bg-background flex flex-col gap-2.5 p-3'>
        <h2 className='text-2xl font-semibold'>Insights</h2>
        <p className='text-muted-foreground'>
          Aqui você verá as análises inteligentes baseadas nos dados que resultam da sua simulação para ajudar você a tomar as melhores decisões.
        </p>
      </Card>

      <Card className='bg-background flex flex-col gap-2.5 p-3'>
        <h2 className='text-2xl font-semibold'>Indicadores detalhados</h2>
        <p className='text-muted-foreground'>
          Aqui você verá as análises inteligentes baseadas nos dados que resultam da sua simulação para ajudar você a tomar as melhores decisões.
        </p>
      </Card>

      <div className='flex flex-col gap-2.5'>
        <Button className='bg-accent'>Fazer outra simulação</Button>
        <Button variant='secondary' className='text-accent-foreground'>Gerar relatório PDF</Button>
      </div>
    </section>
  </>)
}