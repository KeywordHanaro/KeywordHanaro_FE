'use client';

import type {
  MyAccountItemProps,
  MyOrOthersAccountItemProps,
} from '@/components/molecules/AccountListItem';
import { createContext, useState, PropsWithChildren, useContext } from 'react';

export type TransferForm =
  | {
      type: 'WithoutAmount';
      fromAccount: MyAccountItemProps;
      toAccount: MyOrOthersAccountItemProps;
      checkEverytime: true;
      keyword: string;
    }
  | {
      type: 'WithAmount';
      fromAccount: MyAccountItemProps;
      toAccount: MyOrOthersAccountItemProps;
      checkEverytime: false;
      amount: string;
      keyword: string;
    };

type TransferContextType = {
  formData: TransferForm;
  updateFormData: (newData: Partial<TransferForm>) => void;
  resetAmountData: () => void;
};

const contextInitValue: TransferForm = {
  type: 'WithAmount',
  fromAccount: {
    type: 'MyAccount',
    accountName: '',
    accountNumber: '',
    bankId: 0,
  },
  toAccount: {
    type: 'OthersAccount',
    name: '',
    accountNumber: '',
    bankId: 0,
  },
  checkEverytime: false,
  amount: '',
  keyword: '',
};

const TransferContext = createContext<TransferContextType>({
  formData: contextInitValue,
  updateFormData: () => {},
  resetAmountData: () => {},
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
      setFormData({ ...formData, amount: '' });
    }
  };

  return (
    <TransferContext.Provider
      value={{
        formData,
        updateFormData,
        resetAmountData,
      }}
    >
      {children}
    </TransferContext.Provider>
  );
};

export const useTransferForm = () => useContext(TransferContext);
