'use client';

import { MyOrOthersAccountItemProps } from '@/components/molecules/AccountListItem';
import InputToAccount from '@/components/templates/createKeyword/transfer/InputToAccount';
import { useTransferForm } from '@/contexts/TransferContext';
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
  }, []);

  return (
    <InputToAccount
      formData={formData}
      onNext={handleNext}
      onUpdate={(toAccount: MyOrOthersAccountItemProps) =>
        updateFormData({ toAccount })
      }
    />
  );
}
