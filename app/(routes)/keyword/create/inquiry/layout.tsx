'use client';

import Header from '@/components/atoms/Header';
import { MicRef } from '@/components/atoms/Mic';
import { InquiryProvider } from '@/contexts/InquiryContext';
// import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function InquiryLayout({ children }: { children: ReactNode }) {
  //   const router = useRouter();

  //   const handleOnBack = () => {
  //     if (step === 1) router.back();
  //     else prevStep();
  //   };

  return (
    <InquiryProvider>
      <div className='h-screen relative'>
        <Header
          text='키워드 생성하기'
          //   onBack={handleOnBack}
          showActionButton={false}
        />
        <div className='px-[20px] mt-[24px]'>{children}</div>
        <MicRef />
      </div>
    </InquiryProvider>
  );
}
