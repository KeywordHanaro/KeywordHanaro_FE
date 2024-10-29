'use client';

import Header from '@/components/atoms/Header';
import SetTransferAmount from '@/components/templates/useKeyword/transfer/SetTransferAmount';
import { useTransferUseSession } from '@/contexts/TransferUseContext';
import { UseKeywordTransfer } from '@/data/transfer';
import { useRouter } from 'next/navigation';
// import Image from 'next/image';
import { useEffect, useRef } from 'react';

// type TransferData = {
//   transferAmount: string;
// } & TransferProps;

export default function TransferPage() {
  const { formData, saveFormData } = useTransferUseSession();

  /**fetching 가정 */
  const initialData = UseKeywordTransfer[0];

  // const [formData, setFormData] = useState<TransferData>({
  //   ...initialData,
  //   transferAmount: '',
  // });

  useEffect(() => {
    saveFormData({ ...initialData, transferAmount: '' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();
  // const [step, setStep] = useState(1);

  const amountRef = useRef<HTMLInputElement>(null);

  const onNext = () => {
    // amountRef.current.value를 formData의 amount에 저장시켜줘
    saveFormData(
      formData.type === 'WithoutAmount' ?
      {...formData, transferAmount: amountRef.current?.value || ''} : {...formData, transferAmount: formData.amount.toString()}
    );
    router.push('/transfer/step2');

    // setFormData((prev) =>
    //   prev.type === 'WithoutAmount'
    //     ? {
    //         ...prev,
    //         transferAmount: amountRef.current?.value || '',
    //       }
    //     : {
    //         ...prev,
    //         transferAmount: prev.amount?.toString() || '',
    //       }
    // );
    // setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className='flex flex-col w-full h-full'>
      <Header
        text='키워드 송금'
        showBackButton={true}
        showActionButton={false}
        onBack={handleBack}
      />
      <>
        <SetTransferAmount data={initialData} onNext={onNext} ref={amountRef} />
      </>
    </div>
  );
}
