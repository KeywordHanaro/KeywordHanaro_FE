'use client';

// import { useRouter } from 'next/navigation';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

// export type List = {
//   name: string;
//   link: string;
// };

type VoiceInputProps = {
  result: string;
  setResult: (data: string) => void;
  resetResult: () => void;
};

const VoiceInputContext = createContext<VoiceInputProps>({
  result: '',
  setResult: () => {},
  resetResult: () => {},
});

export const VoiceInputProvider = ({ children }: PropsWithChildren) => {
  const [result, setResult] = useState<string>('');
  const resetResult = () => {
    setResult('');
  };

  // useEffect(() => {
  //   console.log(result);
  // }, [result]);

  return (
    <VoiceInputContext.Provider value={{ result, setResult, resetResult }}>
      {children}
    </VoiceInputContext.Provider>
  );
};

export const useVoiceInputSession = () => useContext(VoiceInputContext);
