'use client';

import { TransferProps } from '@/types/Transfer';
import { createContext, useState, PropsWithChildren, useContext } from 'react';

export type TransferForm = TransferProps;

type TransferContextType = {
  formData: TransferForm;
  updateFormData: (newData: Partial<TransferForm>) => void;
  resetAmountData: () => void;
  resetToAccountData: () => void;
};

const contextInitValue: TransferForm = {
  type: 'WithAmount',
  fromAccount: {
    type: 'MyAccount',
    accountName: '',
    accountNumber: '',
    accountId: 0,
    bankId: 0,
    balance: '',
  },
  toAccount: {
    type: 'OthersAccount',
    name: '',
    accountNumber: '',
    bankId: 0,
  },
  checkEverytime: false,
  amount: 0,
  keyword: '',
};

const TransferContext = createContext<TransferContextType>({
  formData: contextInitValue,
  updateFormData: () => {},
  resetAmountData: () => {},
  resetToAccountData: () => {},
});

export const TransferProvider = ({ children }: PropsWithChildren) => {
  const [formData, setFormData] = useState<TransferForm>(contextInitValue);

  const updateFormData = (newData: Partial<TransferForm>) => {
    setFormData((prevData) => {
      let updatedData: TransferForm;

      if (
        newData.type === 'WithoutAmount' &&
        newData.checkEverytime &&
        prevData.type === 'WithAmount'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { amount, ...rest } = prevData;
        updatedData = { ...rest, ...newData } as TransferForm;
      } else {
        updatedData = { ...prevData, ...newData } as TransferForm;
      }

      return updatedData;
    });
  };

  const resetAmountData = () => {
    if (formData.type === 'WithAmount') {
      setFormData({ ...formData, amount: 0 });
    }
  };

  const resetToAccountData = () => {
    setFormData({
      ...formData,
      toAccount: {
        type: 'OthersAccount',
        name: '',
        accountNumber: '',
        bankId: 0,
      },
    });
  };

  return (
    <TransferContext.Provider
      value={{
        formData,
        updateFormData,
        resetAmountData,
        resetToAccountData,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
};

export const useTransferForm = () => useContext(TransferContext);
