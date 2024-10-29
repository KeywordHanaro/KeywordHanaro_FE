'use client';

import Header from '@/components/atoms/Header';
import SetTransferAmount from '@/components/templates/useKeyword/transfer/SetTransferAmount';
import TransferComplete from '@/components/templates/useKeyword/transfer/TransferComplete';
import { TransferProps, UseKeywordTransfer } from '@/data/transfer';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';
import { useRef, useState } from 'react';

type TransferData = {
  transferAmount: string;
} & TransferProps;

export default function TransferPage() {
  const initialData = UseKeywordTransfer[0];
  const [formData, setFormData] = useState<TransferData>({
    ...initialData,
    transferAmount: '',
  });

  const router = useRouter();
  const [step, setStep] = useState(1);

  const amountRef = useRef<HTMLInputElement>(null);

  const onNext = () => {
    // amountRef.current.value를 formData의 amount에 저장시켜줘
    setFormData((prev) =>
      prev.type === 'WithoutAmount'
        ? {
            ...prev,
            transferAmount: amountRef.current?.value || '',
          }
        : {
            ...prev,
            transferAmount: prev.amount?.toString() || '',
          }
    );
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='flex flex-col w-full h-full'>
      <Header
        text='키워드 송금'
        showBackButton={step === 1}
        showActionButton={false}
        onBack={handleBack}
      />
      {step === 1 && (
        <>
          <SetTransferAmount
            data={initialData}
            onNext={onNext}
            ref={amountRef}
          />
        </>
      )}
      {step === 2 && (
        <TransferComplete
          amount={formData?.transferAmount}
          fromAccount={formData?.fromAccount}
          toAccount={formData?.toAccount}
        />
      )}
    </div>
  );
}
