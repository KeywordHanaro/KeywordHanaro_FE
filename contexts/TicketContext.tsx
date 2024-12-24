'use client';

import { TBranch } from '@/types/Bank';
import { createContext, useContext, useState } from 'react';

type TicketContextType = {
  isCheck: boolean;
  isTerms: boolean;
  selectedBranch: TBranch;
  keywordName: string;
  setIsCheck: React.Dispatch<React.SetStateAction<boolean>>;
  setIsTerms: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedBranch: React.Dispatch<React.SetStateAction<TBranch>>;
  setKeywordName: React.Dispatch<React.SetStateAction<string>>;
};

const TicketContext = createContext<TicketContextType | undefined>(undefined);

export const TicketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCheck, setIsCheck] = useState(false);
  const [isTerms, setIsTerms] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<TBranch>({
    id: '0',
    placeName: '',
    addressName: '',
    distance: '',
    phone: '',
  });
  const [keywordName, setKeywordName] = useState<string>('');

  return (
    <TicketContext.Provider
      value={{
        isCheck,
        isTerms,
        selectedBranch,
        keywordName,
        setIsCheck,
        setIsTerms,
        setSelectedBranch,
        setKeywordName,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => {
  const context = useContext(TicketContext);
  if (!context) {
    throw new Error('useTicket 에러');
  }
  return context;
};
