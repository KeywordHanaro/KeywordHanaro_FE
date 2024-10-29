import Header from '@/components/atoms/Header';
import { MicRef } from '@/components/atoms/Mic';
import { InquiryProvider } from '@/contexts/InquiryContext';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';

export default function InquiryLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleOnBack = () => {
    if (step === 1) router.back();
    else prevStep();
  };

  return (
    <InquiryProvider>
      <div className='h-screen relative'>
        <Header
          text='키워드 생성하기'
          onBack={handleOnBack}
          showActionButton={false}
        />
        <div className='px-[20px] mt-[24px]'>{children}</div>
        <MicRef />
      </div>
    </InquiryProvider>
  );
}
