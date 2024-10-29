'use client';

import { MyAccountItemProps } from '@/components/molecules/AccountListItem';
import SelectAccount from '@/components/templates/SelectAccount';
import { useInquiry } from '@/contexts/InquiryContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Step1() {
  const router = useRouter();
  const { updateFormData, resetFormData } = useInquiry();

  useEffect(() => {
    resetFormData();
  }, []);

  const nextStep = () => {
    router.push('/keyword/create/inquiry/step2');
  };

  return (
    <SelectAccount
      // account={formData.account}
      onUpdate={(account: MyAccountItemProps) => updateFormData({ account })}
      onNext={nextStep}
    />
  );
}
