'use client';

import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { UseKeywordResponse } from '@/types/Keyword';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { liVariants } from '@/lib/motionVariable';
import { findSimilarKeywords } from '@/lib/utils';
import Keyword from './Keyword';

type Props = {
  keywordList: UseKeywordResponse[];
};

const FavoriteKeyword = ({ keywordList }: Props) => {
  const { result, resetResult } = useVoiceInputSession();
  useEffect(() => {
    if (result) {
      const similarKeywords = findSimilarKeywords(
        keywordList.slice(0, 5),
        result
      );
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
    <>
      {keywordList.length > 0 ? (
        keywordList.slice(0, 5).map((each, index) => (
          <motion.li key={each.id} variants={liVariants} custom={index}>
            <Keyword
              key={each.id}
              data={each}
              data-keyword-id={each.id}
            ></Keyword>
          </motion.li>
        ))
      ) : (
        <div className='flex-col flex justify-center'>
          <p className='text-center font-bold text-[20px] mt-[20px]'>
            등록된 키워드가 없어요!
          </p>
          <p className='text-center'>키워드를 등록하여 사용해보세요!</p>
        </div>
      )}
    </>
  );
};

export default FavoriteKeyword;
