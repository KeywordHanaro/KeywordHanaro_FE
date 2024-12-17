'use client';

import SpeechToText from '@/components/SpeechToText';
import Header from '@/components/atoms/Header';
import { InquiryProvider } from '@/contexts/InquiryContext';
import { VoiceInputProvider } from '@/contexts/VoiceContext';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function InquiryLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleOnBack = () => {
    const currentStep = parseInt(pathname.split('step')[1]);
    if (currentStep === 1) router.push('/keyword/create');
    else {
      router.push(`/keyword/create/inquiry/step${currentStep - 1}`);
    }
  };

  return (
    <VoiceInputProvider>
      <InquiryProvider>
        <div className='h-screen relative'>
          {pathname.startsWith('/keyword/create/inquiry/step4') ? (
            <Header
              text='키워드 생성하기'
              showActionButton={false}
              showBackButton={false}
              // onBack={handleOnBack}
            />
          ) : (
            <Header
              text='키워드 생성하기'
              showActionButton={false}
              onBack={handleOnBack}
            />
          )}

          <div className='px-[20px] mt-[24px]'>{children}</div>
          {!pathname.includes('step4') && <SpeechToText />}
        </div>
      </InquiryProvider>
    </VoiceInputProvider>
  );
}
