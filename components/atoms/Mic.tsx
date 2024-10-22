'use client';

import { FaMicrophone } from 'react-icons/fa';
import { useState, ForwardedRef, forwardRef } from 'react';

// 마이크 사이즈 80 * 80
// 색 069894
// 누르면 하단 화면 올라오게 --> 부모에 relative 걸어야함

function Mic(
  { text = '음성인식되는 내용이 나타납니다' }: { text?: string },
  ref: ForwardedRef<HTMLDivElement>
) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`w-full bg-hanaPrimary flex justify-center rounded-tl-[16px] rounded-tr-[16px] rounded-bl-[0px] rounded-br-[0px] ${
        isExpanded ? 'h-[240px]' : 'h-[72px]'
      } transition-all duration-500 ease-in-out absolute bottom-0 left-0`}
    >
      {isExpanded && (
        <div className='w-full text-center text-white mt-[70px] text-lg font-bold overflow-hidden'>
          {text}
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
