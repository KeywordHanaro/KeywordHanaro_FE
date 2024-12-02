'use client';

// import { useRouter } from 'next/navigation';
import {
  createContext,
  PropsWithChildren,
  useContext, 
  useState,
} from 'react';

// export type List = {
//   name: string;
//   link: string;
// };

type VoiceInputProps = {
  result: string;
  setResult: (data: string) => void;
  // setLists: (data: List[]) => void;
};

const VoiceInputContext = createContext<VoiceInputProps>({
  result: '',
  setResult: () => {},
  // setLists: () => {},
});

export const VoiceInputProvider = ({ children }: PropsWithChildren) => {
  const [result, setResult] = useState<string>('');

  // useEffect(() => {
  //   console.log(result);
  // }, [result]);

  return (
    <VoiceInputContext.Provider value={{ result, setResult }}>
      {children}
    </VoiceInputContext.Provider>
  );
};

export const useVoiceInputSession = () => useContext(VoiceInputContext);
