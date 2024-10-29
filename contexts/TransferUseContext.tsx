'use client';

import { TransferProps } from '@/data/transfer';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type TransferData = {
  transferAmount: string;
} & TransferProps;

const initFormData: TransferData = {
  type: 'WithAmount',
  fromAccount: {
    type: 'MyAccount',
    accountName: '',
    bankId: 0,
    accountNumber: '',
    balance: '',
  },
  toAccount: {
    type: 'OthersAccount',
    name: '',
    bankId: 0,
    accountNumber: '',
  },
  checkEverytime: false,
  keyword: '',
  amount: 0,
  transferAmount: '',
};

type TransferFormDataProps = {
  formData: TransferData;
  saveFormData: (data: TransferData) => void;
};

const TransferUseContext = createContext<TransferFormDataProps>({
  formData: initFormData,
  saveFormData: () => {},
});

export const TransferUseFormDataProvider = ({
  children,
}: PropsWithChildren) => {
  const [formData, setFormData] = useState<TransferData>(initFormData);

  const saveFormData = (data: TransferData) => {
    setFormData(data);
  };

  return (
    <TransferUseContext.Provider value={{ formData, saveFormData }}>
      {children}
    </TransferUseContext.Provider>
  );
};

export const useTransferUseSession = () => useContext(TransferUseContext);
