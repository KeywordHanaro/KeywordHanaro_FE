'use client';

import type { MyAccountItemProps } from '@/components/molecules/AccountListItem';
import SelectAccount from '@/components/templates/SelectAccount';
import { useTransferForm } from '@/contexts/TransferContext';
import { useRouter } from 'next/navigation';

export default function Step1() {
  const { updateFormData } = useTransferForm();
  const router = useRouter();

  const handleNext = () => {
    router.push('/keyword/create/transfer/step2');
  };

  return (
    <SelectAccount
      onUpdate={(fromAccount: MyAccountItemProps) =>
        updateFormData({ fromAccount })
      }
      onNext={handleNext}
    />
  );
}
