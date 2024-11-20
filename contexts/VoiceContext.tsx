'use client';

import { useRouter } from 'next/navigation';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

export type List = {
  name: string;
  link: string;
};

type VoiceInputProps = {
  result: string;
  setResult: (data: string) => void;
  setType: (data: string) => void;
  setLists: (data: List[]) => void;
};

const VoiceInputContext = createContext<VoiceInputProps>({
  result: '',
  setResult: () => {},
  setType: () => {},
  setLists: () => {},
});

export const VoiceInputProvider = ({ children }: PropsWithChildren) => {
  const [result, setResult] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [lists, setLists] = useState<List[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (type == 'string') {
      const list = lists.find((item) => item.name === result);
      if (list) {
        router.push(list.link);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <VoiceInputContext.Provider
      value={{ result, setResult, setType, setLists }}
    >
      {children}
    </VoiceInputContext.Provider>
  );
};

export const useVoiceInputSession = () => useContext(VoiceInputContext);
