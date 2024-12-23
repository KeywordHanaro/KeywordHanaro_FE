'use client';

import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { ticketTasks } from '@/data/ticket';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { findTicketTask } from '@/lib/utils';
import SpeechToText from '../SpeechToText';
import { Card } from '../atoms/Card';

export default function TicketCategory() {
  const router = useRouter();

  const handleCategory = (path: string) => router.push(path);

  const { result, resetResult } = useVoiceInputSession();

  useEffect(() => {
    if (result) {
      const similarKeywords = findTicketTask(ticketTasks, result);
      if (similarKeywords.length > 0) {
        const keywordElement = document.querySelector(
          `[data-keyword-id="${similarKeywords[0].name}"]`
        );
        if (keywordElement) {
          (keywordElement as HTMLElement).click();
        }
      }
      resetResult();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className='flex flex-col gap-3 p-[8px]'>
      {ticketTasks.map((category) => (
        <Card
          key={category.name}
          onClick={() => handleCategory(category.path)}
          padding='p-[25px]'
          className='hover:bg-hanaPrimary hover:text-white'
          data-keyword-id={category.name}
        >
          <div className='flex flex-row gap-5 items-center'>
            <Image
              src={category.src}
              alt=''
              width={30}
              height={30}
              className='rounded-lg'
            ></Image>
            <h1 className='font-bold text-[17px]'>{category.name}</h1>
            <small className='text-[12px] font-bold text-descriptionGray'>
              {category.description}
            </small>
          </div>
        </Card>
      ))}
      <SpeechToText autoStart placeholder='업무를 선택해주세요' />
    </div>
  );
}
