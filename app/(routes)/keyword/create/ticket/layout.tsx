'use client';

import Header from '@/components/atoms/Header';
import { TicketProvider } from '@/contexts/TicketContext';
import { VoiceInputProvider } from '@/contexts/VoiceContext';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function CreateTicketLayout({ children }: PropsWithChildren) {
  const pathname = usePathname().split('step')[1];
  const router = useRouter();
  const onAction = () => {
    router.push('/');
  };

  return (
    <VoiceInputProvider>
      <TicketProvider>
        <div className='w-full h-full relative'>
          <Header
            text='키워드 생성하기'
            showActionButton={pathname !== '4' ? false : true}
            onAction={pathname !== '4' ? onAction : undefined}
          />
          <div className='w-full flex flex-col mt-[24px] px-[20px] pb-[34px]'>
            {children}
          </div>
          {/* {pathname === '3' && <MicRef />} */}
        </div>
      </TicketProvider>
    </VoiceInputProvider>
  );
}
