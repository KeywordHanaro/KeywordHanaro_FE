'use client';

import { TransferProps } from '@/types/Transfer';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

const initFormData: TransferProps = {
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
};

type TransferFormDataProps = {
  formData: TransferProps;
  saveFormData: (data: TransferProps) => void;
};

const TransferUseContext = createContext<TransferFormDataProps>({
  formData: initFormData,
  saveFormData: () => {},
});

export const TransferUseFormDataProvider = ({
  children,
}: PropsWithChildren) => {
  const [formData, setFormData] = useState<TransferProps>(initFormData);

  const saveFormData = (data: TransferProps) => {
    setFormData(data);
  };

  return (
    <TransferUseContext.Provider value={{ formData, saveFormData }}>
      {children}
    </TransferUseContext.Provider>
  );
};

export const useTransferUseSession = () => useContext(TransferUseContext);
