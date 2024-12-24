'use client';

import Header from '@/components/atoms/Header';
import SetTransferAmount from '@/components/templates/useKeyword/transfer/SetTransferAmount';
import { useTransferUseSession } from '@/contexts/TransferUseContext';
import { VoiceInputProvider } from '@/contexts/VoiceContext';
import { UseKeywordTransfer } from '@/data/transfer';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
import { TransferData } from '@/types/Transfer';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function SetTransferAmountPage() {
  const { formData, saveFormData } = useTransferUseSession();
  const { transfer } = useAccountApi();

  /**fetching 가정 */
  const initialData = UseKeywordTransfer[0];

  useEffect(() => {
    saveFormData({ ...initialData });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const amountRef = useRef<HTMLInputElement>(null);

  const onNext = async () => {
    saveFormData({
      ...formData,
      amount: parseFloat((amountRef.current?.value || '0').replace(/,/g, '')),
    });
    const transferData: TransferData = {
      fromAccountNumber: formData.fromAccount.accountNumber,
      toAccountNumber: formData.toAccount.accountNumber,
      amount: parseFloat((amountRef.current?.value || '0').replace(/,/g, '')),
    };
    await transfer(transferData)
      .then(() => {
        router.push('/transfer/step2');
      })
      .catch((e) => {
        alert(e.message);
      });
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
