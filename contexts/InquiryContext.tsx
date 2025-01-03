import { MyAccount } from '@/types/Account';
import { createContext, ReactNode, useContext, useState } from 'react';

export type DataProps = {
  account: MyAccount;
  inquiry: string;
  keywordName: string;
};

type InquiryContextProps = {
  formData: DataProps;
  updateFormData: (newData: Partial<DataProps>) => void;
  resetFormData: () => void;
};

const initialFormData: DataProps = {
  account: {
    type: 'MyAccount',
    accountName: '',
    bankId: 0,
    accountId: 0,
    accountNumber: '',
  },
  inquiry: '',
  keywordName: '',
};

const initialContextValue: InquiryContextProps = {
  formData: initialFormData,
  updateFormData: () => {},
  resetFormData: () => {},
};

const InquiryContext = createContext<InquiryContextProps>(initialContextValue);

export const InquiryProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<DataProps>(initialFormData);

  const resetFormData = () => {
    setFormData({ ...initialFormData });
  };

  const updateFormData = (newData: Partial<DataProps>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };
  return (
    <InquiryContext.Provider
      value={{ formData, updateFormData, resetFormData }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => useContext(InquiryContext);
