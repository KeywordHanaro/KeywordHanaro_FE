'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '../atoms/Card';
import { AIInputRef } from '../atoms/Inputs';

type Query = {
  date: Date;
  query: string;
};

export default function QnA() {
  const [query, setQuery] = useState<Query[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    console.log(inputRef.current?.value);
    const newQuery = {
      date: new Date(),
      query: inputRef.current?.value ?? '',
    };
    setQuery((prev) => [...prev, newQuery]);
    setLoading(true);
    setTimeout(() => {
      const newAnswer = {
        date: new Date(),
        query: 'Answer',
      };
      setQuery((prev) => [...prev, newAnswer]);
      setLoading(false);
    }, 2000);
  };
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth', // 스크롤 애니메이션 추가
    });
  }, [query]);
  return (
    <>
      <div className='w-full h-full relative'>
        <div className='flex flex-col gap-3 mb-[60px]'>
          {query.map((item, index) => (
            <>
              <div
                key={index}
                className='odd:justify-end even:justify-start flex w-full'
              >
                <Card
                  className={cn(
                    'w-1/2 break-words',
                    !(index % 2) && 'bg-hanaPrimary text-white'
                  )}
                >
                  <p>{item.query}</p>
                </Card>
              </div>
            </>
          ))}
        </div>

        <AIInputRef
          ref={inputRef}
          formClassName='absolute bottom-1 w-full'
          placeHolder='궁금한 내용을 물어보세요!'
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      </div>
    </>
  );
}
