import { MyAccountItemProps } from '@/components/molecules/AccountListItem';
import { createContext, ReactNode, useContext, useState } from 'react';

export type DataProps = {
  account: MyAccountItemProps;
  inquiry: string;
  keywordName: string;
};

type InquiryContextProps = {
  formData: DataProps;
  updateFormData: (newData: Partial<DataProps>) => void;
};

const initialFormData: DataProps = {
  account: {
    type: 'MyAccount',
    accountName: '',
    bankId: 0,
    accountNumber: '',
  },
  inquiry: '',
  keywordName: '',
};

const initialContextValue: InquiryContextProps = {
  formData: initialFormData,
  updateFormData: () => {},
};

const InquiryContext = createContext<InquiryContextProps>(initialContextValue);

export const InquiryProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<DataProps>(initialFormData);

  const updateFormData = (newData: Partial<DataProps>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };
  return (
    <InquiryContext.Provider value={{ formData, updateFormData }}>
      {children}
    </InquiryContext.Provider>
  );
};

export const useInquiry = () => useContext(InquiryContext);
