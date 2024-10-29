'use client';

import type { MyOrOthersAccountItemProps } from '@/components/molecules/AccountListItem';
import SelectToAccount from '@/components/templates/createKeyword/transfer/SelectToAccount';
import { useTransferForm } from '@/contexts/TransferContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Step2() {
  const { formData, updateFormData, resetAmountData } = useTransferForm();
  const router = useRouter();

  const handleNext = (stepNum = 3) => {
    router.push(`/keyword/create/transfer/step${stepNum}`);
  };

  useEffect(() => {
    resetAmountData();
  }, []);

  return (
    <SelectToAccount
      selectedAccountNumber={formData.fromAccount.accountNumber}
      onNext={handleNext}
      onUpdate={(toAccount: MyOrOthersAccountItemProps) =>
        updateFormData({ toAccount })
      }
    />
  );
}
