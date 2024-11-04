'use client';

import { KeywordDetail } from '@/data/keyword';
import { FormData } from '@/data/settlement';
import { useRouter } from 'next/navigation';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type SettlementProps = {
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  handleOnBack: () => void;
  handleOnNext: () => void;
  isEdit?: boolean;
  originalData?: KeywordDetail | null;
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
  isEdit: false,
  originalData: null,
});

export const SettlementProvider = ({
  children,
  isEdit = false,
  originalData = null,
}: PropsWithChildren<{
  isEdit?: boolean;
  originalData?: KeywordDetail | null;
}>) => {
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

  useEffect(() => {
    if (
      isEdit &&
      originalData &&
      (originalData.type === 'settlement' ||
        originalData.type === 'settlementAmount')
    ) {
      setFormData({
        account: originalData.accountFrom,
        members: originalData.memberList,
        category: 'Settlement',
        checkEveryTime: originalData.type === 'settlement',
        amount:
          originalData.type === 'settlementAmount'
            ? originalData.amount.toString()
            : '',
        keywordName: originalData.title,
      });
    }
  }, [isEdit, originalData]);

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
