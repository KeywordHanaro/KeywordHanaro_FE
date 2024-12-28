'use client';

import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { motion } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ulVariants, liVariants } from '@/lib/motionVariable';
import { levenshtein } from '@/lib/utils';
import SpeechToText from '../SpeechToText';
import { Card } from '../atoms/Card';

const categories = [
  {
    name: '송금',
    path: '/keyword/create/transfer/step1',
    src: '/images/icons/transfer.png',
  },
  {
    name: '조회',
    path: '/keyword/create/inquiry/step1',
    src: '/images/icons/inquiry.png',
  },
  {
    name: '모바일 번호표',
    path: '/keyword/create/ticket/step1',
    src: '/images/icons/ticket.png',
  },
  {
    name: '정산 / 회비',
    path: '/keyword/create/settlement/step1',
    src: '/images/icons/settlement.png',
  },
  {
    name: '키워드 조합하기',
    path: '/keyword/create/multiKeyword/step1',
    src: '/images/icons/multiKeyword.png',
  },
];

const KeywordCategory = () => {
  const router = useRouter();

  const { result, resetResult } = useVoiceInputSession();
  const handleCategory = (path: string) => router.push(path);

  useEffect(() => {
    if (result) {
      console.log(result);
      const threshold = 2; // 허용할 최대 편집 거리
      let bestMatch = null;
      let minDistance = Infinity;
      for (const category of categories) {
        console.log(category.name.replace('/', '').toLowerCase());
        const distance = levenshtein(
          category.name.replace('/', '').toLowerCase(),
          result.replace(' ', '').toLowerCase()
        );
        console.log(distance);
        if (distance < minDistance && distance <= threshold) {
          minDistance = distance;
          bestMatch = category;
        }
      }

      if (bestMatch) {
        resetResult();
        handleCategory(bestMatch.path);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  return (
    <div className='flex flex-col gap-3 p-[8px]'>
      <motion.ul
        variants={ulVariants}
        initial='hidden'
        animate='visible'
        className='flex flex-col  gap-2.5'
      >
        {categories.map((category, index) => (
          <motion.li key={category.name} variants={liVariants} custom={index}>
            <Card
              key={category.name}
              onClick={() => handleCategory(category.path)}
              padding='p-[25px]'
              // className='hover:bg-hanaPrimary hover:text-white'
            >
              <div className='flex flex-row gap-5 items-center'>
                <motion.div
                  className='box'
                  animate={{
                    scale: [1, 1, 1, 1, 1],
                    rotate: [0, 0, -30, 30, 0],
                    borderRadius: ['0%', '0%', '50%', '50%', '0%'],
                  }}
                  transition={{
                    duration: 2,
                    ease: 'easeInOut',
                    times: [0, 0.2, 0.5, 0.8, 1],
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <Image
                    src={category.src}
                    alt=''
                    width={30}
                    height={30}
                    className='rounded-lg'
                  ></Image>
                </motion.div>
                <h1 className='font-bold text-[17px]'>{category.name}</h1>
              </div>
            </Card>
          </motion.li>
        ))}
      </motion.ul>
      <SpeechToText autoStart placeholder='키워드 카테고리를 선택해 주세요' />
    </div>
  );
};

export default KeywordCategory;
