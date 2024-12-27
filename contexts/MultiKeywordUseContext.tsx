'use client';

import {
  SettlementUsageResponse,
  TicketUsageResponse,
  UseKeywordResponse,
} from '@/types/Keyword';
import { IssueTicketResponse } from '@/types/Ticket';
import { TransferResponse } from '@/types/Transfer';
import { ReactNode, createContext, useContext, useState } from 'react';

export type MultiResponse =
  | TransferResponse
  | IssueTicketResponse
  | { keyword: SettlementUsageResponse; amount?: number };

type MultiKeywordContextType = {
  response: MultiResponse[];
  updateResponse: (newData: MultiResponse) => void;
};

const MultiKeywordResContext = createContext<MultiKeywordContextType>({
  response: [],
  updateResponse: () => {},
});

export const UseMultiKeywordProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [response, setResponse] = useState<MultiResponse[]>([]);

  const updateResponse = (newData: MultiResponse) => {
    setResponse((prevData) => [...prevData, newData]);
  };

  return (
    <MultiKeywordResContext.Provider value={{ response, updateResponse }}>
      {children}
    </MultiKeywordResContext.Provider>
  );
};

export const useMultiKeywordResponse = () => useContext(MultiKeywordResContext);
