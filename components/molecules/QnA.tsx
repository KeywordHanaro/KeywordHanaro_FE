'use client';

import { useLLMApi } from '@/hooks/useLLM/useLLM';
// import { query } from '@/types/LLM';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '../atoms/Card';
import { AIInputRef } from '../atoms/Inputs';

type Query = {
  question: string;
};

export default function QnA() {
  const [query, setQuery] = useState<Query[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const { chat } = useLLMApi();

  const handleSubmit = async () => {
    // console.log(inputRef.current?.value);
    const newQuery: Query = {
      question: inputRef.current?.value ?? '',
    };
    setQuery((prev) => [...prev, newQuery]);
    setLoading(true);
    const response = await chat(newQuery);
    console.log(response);
    const newAnswer = {
      question: `${response.answer}`,
    };
    setQuery((prev) => [...prev, newAnswer]);
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth', // 스크롤 애니메이션 추가
    });
  }, [query]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [query]);
  return (
    <>
      <div className='w-full h-full relative'>
        <div className='h-full overflow-y-auto'>
          <div className='flex flex-col gap-3 mb-[60px]'>
            {query.map((item, index) => (
              <div
                key={index}
                className='odd:justify-end even:justify-start flex w-full'
                ref={index === query.length - 1 ? lastMessageRef : null}
              >
                <Card
                  className={cn(
                    'max-w-[80%] break-words',
                    !(index % 2) && 'bg-hanaPrimary text-white'
                  )}
                >
                  <p>{item.question}</p>
                </Card>
              </div>
            ))}
          </div>

          <AIInputRef
            ref={inputRef}
            formClassName='absolute bottom-0 w-full'
            placeHolder='궁금한 내용을 물어보세요!'
            onSubmit={handleSubmit}
            isLoading={loading}
          />
        </div>
      </div>
    </>
  );
}
