'use client';

import Header from '@/components/atoms/Header';
import SetTransferAmount from '@/components/templates/useKeyword/transfer/SetTransferAmount';
import { useTransferUseSession } from '@/contexts/TransferUseContext';
import { VoiceInputProvider } from '@/contexts/VoiceContext';
import { UseKeywordTransfer } from '@/data/transfer';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function SetTransferAmountPage() {
  const { formData, saveFormData } = useTransferUseSession();

  /**fetching 가정 */
  const initialData = UseKeywordTransfer[0];

  useEffect(() => {
    saveFormData({ ...initialData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const amountRef = useRef<HTMLInputElement>(null);

  const onNext = () => {
    saveFormData(
      formData.type === 'WithAmount'
        ? { ...formData, amount: Number(amountRef.current?.value) }
        : { ...formData }
    );
    // saveFormData(
    //   formData.type === 'WithoutAmount'
    //     ? { ...formData, transferAmount: amountRef.current?.value || '' }
    //     : {
    //         ...formData,
    //         transferAmount: formatNumberWithCommas(formData.amount.toString()),
    //       }
    // );
    router.push('/transfer/step2');
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
      <VoiceInputProvider>
        <SetTransferAmount data={initialData} onNext={onNext} ref={amountRef} />
      </VoiceInputProvider>
    </div>
  );
}
