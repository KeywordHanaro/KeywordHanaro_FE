'use client';

import Header from '@/components/atoms/Header';
import { MicRef } from '@/components/atoms/Mic';
import { TransferProvider } from '@/contexts/TransferContext';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function TransferLayout({ children }: { children: ReactNode }) {
  return (
    <TransferProvider>
      <TransferContent>{children}</TransferContent>
    </TransferProvider>
  );
}

function TransferContent({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleBack = () => {
    if (pathname.includes('/step1')) {
      router.push('/keyword/create');
    } else {
      router.back();
    }
  };

  return (
    <div className='flex flex-col w-full h-full'>
      <Header
        text='키워드 생성하기'
        onBack={handleBack}
        showActionButton={false}
        showBackButton={!pathname.includes('step6')}
      />
      <div className='h-full flex flex-col flex-grow overflow-hidden mt-[24px] px-[20px] pb-[34px]'>
        {children}
      </div>
      {/* 마지막 페이지에서 Mic 안나오게 */}
      {!pathname.includes('/step6') && <MicRef />}
    </div>
  );
}
