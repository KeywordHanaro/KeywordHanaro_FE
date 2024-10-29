'use client';

import Header from '@/components/atoms/Header';
import SetTransferAmount from '@/components/templates/useKeyword/transfer/SetTransferAmount';
import { useTransferUseSession } from '@/contexts/TransferUseContext';
import { UseKeywordTransfer } from '@/data/transfer';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

const formatNumberWithCommas = (inputValue: string): string => {
  if (!inputValue) return '';
  const numericValue = inputValue.replace(/[^0-9]/g, '');
  const parsedValue = numericValue ? parseInt(numericValue, 10) : 0;
  return new Intl.NumberFormat('ko-KR').format(parsedValue);
};

export default function TransferPage() {
  const { formData, saveFormData } = useTransferUseSession();

  /**fetching 가정 */
  const initialData = UseKeywordTransfer[1];

  useEffect(() => {
    saveFormData({ ...initialData, transferAmount: '' });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = useRouter();

  const amountRef = useRef<HTMLInputElement>(null);

  const onNext = () => {
    saveFormData(
      formData.type === 'WithoutAmount' ?
      {...formData, transferAmount: amountRef.current?.value || ''} : {...formData, transferAmount: formatNumberWithCommas(formData.amount.toString())}
    );
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
      <>
        <SetTransferAmount data={initialData} onNext={onNext} ref={amountRef} />
      </>
    </div>
  );
}
