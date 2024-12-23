'use client';

import Header from '@/components/atoms/Header';
import TransferComplete from '@/components/templates/useKeyword/transfer/TransferComplete';
import { useTransferUseSession } from '@/contexts/TransferUseContext';
import { useRouter } from 'next/navigation';

export default function TransferCompletePage() {
  const { formData } = useTransferUseSession();

  const router = useRouter();

  const handleBack = () => {
    router.back();
  };
  console.log(formData);
  return (
    <div className='flex flex-col w-full h-full'>
      <Header
        text='키워드 송금'
        showBackButton={false}
        showActionButton={false}
        onBack={handleBack}
      />
      <TransferComplete
        amount={formData?.transferAmount}
        fromAccount={formData?.fromAccount}
        toAccount={formData?.toAccount}
      />
    </div>
  );
}
