'use client';

import { FormData } from '@/app/(routes)/keyword/create/settlement/page';
import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type SettlementProps = {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  handleOnBack: () => void;
  handleOnNext: () => void;
};

const SettlementContext = createContext<SettlementProps>({
  formData: {
    account: {
      type: 'MyAccount',
      accountName: '',
      accountNumber: '',
      bankId: 0,
    },
    members: [],
    category: 'Settlement',
    checkEveryTime: false,
    amount: '',
    keywordName: '',
  },
  updateFormData: () => {},
  handleOnBack: () => {},
  handleOnNext: () => {},
});

export const SettlementProvider = ({ children }: PropsWithChildren) => {
  const [formData, setFormData] = useState<FormData>({
    account: {
      type: 'MyAccount',
      accountName: '',
      accountNumber: '',
      bankId: 0,
    },
    members: [],
    category: 'Settlement',
    checkEveryTime: false,
    amount: '',
    keywordName: '',
  });
  const router = useRouter();
  const nextStep = () => router.push('/keyword/create/settlement/step3');
  const prevStep = () => router.push('/');

  const handleOnBack = () => {
    // if (step === 1) router.back();
    // else prevStep();
    prevStep();
    console.log('context handleonback');
  };

  const handleOnNext = () => {
    updateFormData(formData);
    nextStep();
  };

  const updateFormData = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };
  return (
    <SettlementContext.Provider
      value={{ formData, updateFormData, handleOnBack, handleOnNext }}
    >
      {children}
    </SettlementContext.Provider>
  );
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useSettlementContext = () => useContext(SettlementContext);
