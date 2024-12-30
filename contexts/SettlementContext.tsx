'use client';

import { KeywordDetail } from '@/data/keyword';
import { FormData } from '@/data/settlement';
import { SettlementUsageResponse } from '@/types/Keyword';
import { useRouter } from 'next/navigation';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type SettlementProps = {
  id: number;
  formData: FormData;
  updateFormData: (newData: Partial<FormData>) => void;
  editId: (id: number) => void;
  handleOnBack: () => void;
  handleOnNext: () => void;
  isEdit?: boolean;
  originalData?: KeywordDetail | null;
  response: SettlementUsageResponse | undefined;
  updateResponse: (newResponse: SettlementUsageResponse) => void;
};

const SettlementContext = createContext<SettlementProps>({
  formData: {
    fromAccount: {
      type: 'MyAccount',
      accountName: '',
      accountNumber: '',
      bankId: 0,
      accountId: 1,
    },
    members: [],
    category: 'Settlement',
    checkEveryTime: false,
    amount: '',
    keywordName: '',
  },
  editId: () => {},
  updateFormData: () => {},
  handleOnBack: () => {},
  handleOnNext: () => {},
  isEdit: false,
  originalData: null,
  id: 0,
  response: undefined,
  updateResponse: () => {},
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
    fromAccount: {
      type: 'MyAccount',
      accountName: '',
      accountNumber: '',
      bankId: 0,
      accountId: 1,
    },
    members: [],
    category: 'Settlement',
    checkEveryTime: false,
    amount: '',
    keywordName: '',
  });
  const [response, setResponse] = useState<SettlementUsageResponse>();
  const [id, setId] = useState<number>(0);
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

  const updateFormData = useCallback((newData: Partial<FormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  }, []);

  const editId = (id: number) => {
    setId(id);
  };
  const updateResponse = useCallback((newResponse: SettlementUsageResponse) => {
    setResponse(newResponse);
  }, []);

  useEffect(() => {
    if (
      isEdit &&
      originalData &&
      (originalData.type === 'settlement' ||
        originalData.type === 'settlementAmount')
    ) {
      setFormData({
        fromAccount: originalData.accountFrom,
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
      value={{
        formData,
        id,
        editId,
        updateFormData,
        handleOnBack,
        handleOnNext,
        response,
        updateResponse,
      }}
    >
      {children}
    </SettlementContext.Provider>
  );
};

// eslint-disable-next-line react-hooks/rules-of-hooks
export const useSettlementContext = () => useContext(SettlementContext);
