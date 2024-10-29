import { MyAccountItemProps } from '@/components/molecules/AccountListItem';
import { createContext, ReactNode, useState } from 'react';

export type DataProps = {
  account: MyAccountItemProps;
  inquiry: string;
  keywordName: string;
};

type InquiryContextProps = {
  formData: DataProps;
  updateFormData: (newData: Partial<DataProps>) => void;
};

const InquiryContext = createContext<InquiryContextProps | undefined>(
  undefined
);

export const InquiryProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<DataProps>({
    account: {
      type: 'MyAccount',
      accountName: '',
      bankId: 0,
      accountNumber: '',
    },
    inquiry: '',
    keywordName: '',
  });

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
