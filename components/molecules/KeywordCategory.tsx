'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ulVariants, liVariants } from '@/lib/motionVariable';
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
    name: '정산하기/회비걷기',
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

  const handleCategory = (path: string) => router.push(path);

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
    </div>
  );
};

export default KeywordCategory;
