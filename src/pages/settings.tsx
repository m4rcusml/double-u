import { SettingButton } from '@/components/setting-button';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { signOut } from '@/services/authService';
import { UserIcon } from 'lucide-react';

export function Settings() {
  const { isMobile } = useSidebar()

  return (
    <section className='h-full flex flex-col gap-4 p-6'>
      <h1 className='text-3xl font-bold'>Configurações</h1>
      <div className='flex-1 flex gap-6'>
        <nav className={`w-full rounded-md ${isMobile ? '' : 'border border-gray-300'} flex flex-col`}>
          <div className='p-3 flex flex-col gap-2'>
            {Array.from({ length: 6 }).map((_, index) =>
              <>
                <SettingButton
                  icon={<UserIcon className='w-6 h-6' />}
                  title='Meu perfil'
                  description='Informações pessoais'
                  onClick={() => { }}
                />
                {index < 9 && <Separator />}
              </>)}

            <Button className='w-full' onClick={signOut}>Logout</Button>
          </div>
        </nav>

        <div className={`w-full rounded-md ${isMobile ? '' : 'border border-gray-300'} px-6 py-4 gap-4 flex flex-col`}>
          <h2 className='text-2xl font-bold'>Meu perfil</h2>
          
          <div className='flex flex-col gap-3'>
            <Input placeholder='Nome' />
            <Input placeholder='Email' />
            <Input placeholder='Senha' />
          </div>
          
        </div>
      </div>
    </section>
  )
}