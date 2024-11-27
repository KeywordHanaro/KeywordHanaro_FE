'use client';

// import { useRouter } from 'next/navigation';
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
  type: string;
  setResult: (data: string) => void;
  setType: (data: string) => void;
  // setLists: (data: List[]) => void;
};

const VoiceInputContext = createContext<VoiceInputProps>({
  result: '',
  type: '',
  setResult: () => {},
  setType: () => {},
  // setLists: () => {},
});

export const VoiceInputProvider = ({ children }: PropsWithChildren) => {
  const [result, setResult] = useState<string>('');
  const [type, setType] = useState<string>('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [socket, setSocket] = useState<WebSocket | null>(null);

  //원하는 검색 결과 리스트로 지정
  // const [lists, setLists] = useState<List[]>([]);
  // const router = useRouter();

  // useEffect(() => {
  //   if (type == 'string') {
  //     const list = lists.find((item) => item.name === result);
  //     if (list) {
  //       router.push(list.link);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [result]);
  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/audio');
    setSocket(ws);

    ws.onmessage = (event) => {
      setResult(event.data);
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <VoiceInputContext.Provider value={{ result, type, setResult, setType }}>
      {children}
    </VoiceInputContext.Provider>
  );
};

export const useVoiceInputSession = () => useContext(VoiceInputContext);
