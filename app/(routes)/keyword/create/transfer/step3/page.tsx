'use client';

import InputToAccount from '@/components/templates/createKeyword/transfer/InputToAccount';
import { useTransferForm } from '@/contexts/TransferContext';
import type { MyAccount, OthersAccount } from '@/data/account';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Step3() {
  const router = useRouter();
  const { formData, updateFormData, resetAmountData } = useTransferForm();
  const handleNext = () => {
    router.push(`/keyword/create/transfer/step4`);
  };

  useEffect(() => {
    resetAmountData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InputToAccount
      formData={formData}
      onNext={handleNext}
      onUpdate={(toAccount: OthersAccount | MyAccount) =>
        updateFormData({ toAccount })
      }
    />
  );
}
