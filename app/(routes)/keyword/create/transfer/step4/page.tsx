'use client';

import HowMuch, {
  WithAmountProps,
  WithoutAmountProps,
} from '@/components/templates/createKeyword/transfer/HowMuch';
import { useTransferForm } from '@/contexts/TransferContext';
import { useRouter } from 'next/navigation';

export default function Step4() {
  const router = useRouter();
  const { formData, updateFormData } = useTransferForm();
  const handleNext = () => {
    router.push('/keyword/create/transfer/step5');
  };
  return (
    <HowMuch
      fromAccount={formData.fromAccount}
      toAccount={formData.toAccount}
      formData={formData}
      onNext={handleNext}
      onUpdate={(data: WithAmountProps | WithoutAmountProps) =>
        updateFormData(data)
      }
    />
  );
}
