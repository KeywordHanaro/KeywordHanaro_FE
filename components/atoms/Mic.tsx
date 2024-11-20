'use client';

import { List, useVoiceInputSession } from '@/contexts/VoiceContext';
import { FaMicrophone } from 'react-icons/fa';
import { useState, ForwardedRef, forwardRef, useEffect } from 'react';

// 마이크 사이즈 80 * 80
// 색 069894
// 누르면 하단 화면 올라오게 --> 부모에 relative 걸어야함

function Mic(
  { text = '음성인식되는 내용이 나타납니다',lists }: { text?: string,lists:List[] },
  ref: ForwardedRef<HTMLDivElement>
) {
  const { result, setResult, setType, setLists } = useVoiceInputSession();

  useEffect(()=>{
    setResult(text);
  },[])

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [onRecord, setOnRecord] = useState<boolean>(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    setOnRecord(!onRecord);
  };

  const getValue = async () => {
    try {
      //fetching하기
      const response = await setTimeout(() => {
        setResult('성엽이 용돈');
      }, 2000);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (onRecord) {
      getValue();
      setType('text');
      setLists(lists)
    }
  }, [onRecord]);

  return (
    <div
      className={`w-full bg-hanaPrimary flex justify-center rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[0px] rounded-br-[0px] ${
        isExpanded ? 'h-[240px]' : 'h-[72px]'
      } transition-all duration-500 ease-in-out fixed bottom-0 left-0`}
    >
      {isExpanded && (
        <div className='w-full text-center text-white mt-[70px] text-lg font-bold overflow-hidden'>
          {result}
        </div>
      )}
      <div
        className='flex items-center justify-center w-[77px] h-[77px] border border-hanaPrimary rounded-full bg-white cursor-pointer absolute bottom-[38px] left-1/2 transform -translate-x-1/2'
        ref={ref}
        onClick={toggleExpand}
      >
        <FaMicrophone className='text-hanaPrimary w-[41.3px] h-[41.3px]' />
      </div>
    </div>
  );
}

export const MicRef = forwardRef(Mic);
