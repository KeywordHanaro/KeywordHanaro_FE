'use client';

import SpeechToText from '@/components/SpeechToText';
import Header from '@/components/atoms/Header';
import AddNewKeyword from '@/components/molecules/AddNewKeyword';
import Keyword from '@/components/molecules/Keyword';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { keywordList } from '@/data/keyword';
import { motion, Reorder } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ulVariants, liVariants } from '@/lib/motionVariable';
import { findSimilarKeywords } from '@/lib/utils';

export default function KeywordPage() {
  const router = useRouter();
  const onEdit = () => {
    router.push('/keyword/edit');
  };
  const [items, setItems] = useState<number[]>([]);
  useEffect(() => {
    setItems(keywordList.map((keyword) => keyword.id));
  }, []);

  const handleReorder = (newOrder: number[]) => {
    setItems(newOrder);
  };

  const { result, resetResult } = useVoiceInputSession();

  useEffect(() => {
    if (result) {
      const similarKeywords = findSimilarKeywords(keywordList, result);
      if (similarKeywords.length > 0) {
        const keywordElement = document.querySelector(
          `[data-keyword-id="${similarKeywords[0].id}"]`
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
    <div className='flex flex-col h-full'>
      <Header
        text='나의 키워드'
        actionLabel='편집'
        onBack={() => router.push('/')}
        onAction={onEdit}
      ></Header>

      <motion.ul
        variants={ulVariants}
        initial='hidden'
        animate='visible'
        className='flex flex-col flex-grow overflow-y-scroll pt-[10px] px-5 pb-24 gap-2.5'
      >
        <span className='text-center text-subGray text-[14px]'>
          키워드 순서는 꾸욱 눌러서 변경할 수 있어요
        </span>
        <Reorder.Group
          axis='y'
          values={items}
          onReorder={handleReorder}
          className='flex flex-col gap-2.5'
        >
          {items.map((id, index) => {
            const data = keywordList.find((el) => el.id === id);
            if (!data) return null;
            return (
              <motion.li key={id} variants={liVariants} custom={index}>
                <Reorder.Item key={id} value={id} drag='y'>
                  <Keyword data={data} data-keyword-id={id}></Keyword>
                </Reorder.Item>
              </motion.li>
            );
          })}
        </Reorder.Group>
        <motion.li variants={liVariants} custom={keywordList.length}>
          <AddNewKeyword />
        </motion.li>
      </motion.ul>

      <SpeechToText placeholder='키워드를 선택해주세요.' />
    </div>
  );
}
