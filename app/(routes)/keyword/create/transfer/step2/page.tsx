'use client';

import SelectToAccount from '@/components/templates/createKeyword/transfer/SelectToAccount';
import { useTransferForm } from '@/contexts/TransferContext';
import type { MyAccount, OthersAccount } from '@/data/account';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Step2() {
  const { formData, updateFormData, resetAmountData, resetToAccountData } =
    useTransferForm();
  const router = useRouter();

  const handleNext = (stepNum = 3) => {
    router.push(`/keyword/create/transfer/step${stepNum}`);
  };

  useEffect(() => {
    resetAmountData();
    resetToAccountData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <SelectToAccount
      selectedAccountNumber={formData.fromAccount.accountNumber}
      onNext={handleNext}
      onUpdate={(toAccount: OthersAccount | MyAccount) =>
        updateFormData({ toAccount })
      }
    />
  );
}
