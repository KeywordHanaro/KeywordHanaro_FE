'use client';

import { UseKeywordResponse } from '@/types/Keyword';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

export type MultiKeywordForm = {
  keywordIdArr: number[];
  keywordList: UseKeywordResponse[];
  keywordName: string;
};

type MultiKeywordContextType = {
  formData: MultiKeywordForm;
  updateFormData: (newData: Partial<MultiKeywordForm>) => void;
};

const contextInitValue: MultiKeywordForm = {
  keywordIdArr: [],
  keywordList: [],
  keywordName: '',
};

const MultiKeywordContext = createContext<MultiKeywordContextType>({
  formData: contextInitValue,
  updateFormData: () => {},
});

export const MultiKeywordProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<MultiKeywordForm>(contextInitValue);

  const updateFormData = (newData: Partial<MultiKeywordForm>) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <MultiKeywordContext.Provider value={{ formData, updateFormData }}>
      {children}
    </MultiKeywordContext.Provider>
  );
};

export const useMultiKeywordForm = () => useContext(MultiKeywordContext);
