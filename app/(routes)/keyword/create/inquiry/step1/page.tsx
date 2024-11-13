'use client';

import SelectAccount from '@/components/templates/SelectAccount';
import { useInquiry } from '@/contexts/InquiryContext';
import { MyAccount } from '@/data/account';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Step1() {
  const router = useRouter();
  const { updateFormData, resetFormData } = useInquiry();

  useEffect(() => {
    resetFormData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nextStep = () => {
    router.push('/keyword/create/inquiry/step2');
  };

  return (
    <SelectAccount
      // account={formData.account}
      onUpdate={(account: MyAccount) => updateFormData({ account })}
      onNext={nextStep}
    />
  );
}
