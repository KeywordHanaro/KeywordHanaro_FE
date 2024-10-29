'use client';

import Header from '@/components/atoms/Header';
import { MicRef } from '@/components/atoms/Mic';
import { InquiryProvider } from '@/contexts/InquiryContext';
import { usePathname } from 'next/navigation';
// import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function InquiryLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <InquiryProvider>
      <div className='h-screen relative'>
        <Header text='키워드 생성하기' showActionButton={false} />
        <div className='px-[20px] mt-[24px]'>{children}</div>
        {!pathname.includes('step4') && <MicRef />}
      </div>
    </InquiryProvider>
  );
}
