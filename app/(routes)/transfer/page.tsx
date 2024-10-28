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
  // api call 한번 돌아야한다. 그런데 지금은 데이터가 없다
  // 그러면 지금은 일단 더미로 놔두고, 나중에 백엔드가 만들어지면

  // useEffect(() => {
  //   api call을 한다
  // }, []);
  const initialData = UseKeywordTransfer[1];
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
    // 실제 송금
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='flex flex-col w-full h-full'>
      <Header
        text='키워드 송금'
        showBackButton={step === 1}
        onBack={handleBack}
        showActionButton={initialData.type === 'WithoutAmount' && step === 1}
        actionLabel={'다음'}
        onAction={() => {
          if (amountRef.current && amountRef.current.value) {
            onNext();
          }
        }}
      />
      {step === 1 && (
        <>
          <SetTransferAmount
            data={initialData}
            ref={amountRef}
            onNext={onNext}
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
