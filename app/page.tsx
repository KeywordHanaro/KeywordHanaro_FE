'use client';

import SpeechToText from '@/components/SpeechToText';
// import { MicRef } from '@/components/atoms/Mic';
import AccountCard from '@/components/molecules/AccountCard';
import Keyword from '@/components/molecules/Keyword';
import { Toggle } from '@/components/ui/toggle';
// // import { VoiceInputProvider } from '@/contexts/VoiceContext';
import { keywordList } from '@/data/keyword';
import { motion } from 'motion/react';
import { SlArrowRight } from 'react-icons/sl';
import { ulVariants, liVariants } from '@/lib/motionVariable';

export default function Home() {
  return (
    <div className='h-screen relative bg-[#F6F7F9]'>
      {/* 헤더 시작 */}
      <div className='w-full h-[60px] flex px-[30px] items-center justify-between bg-white'>
        <a href='#'>
          <p>디지털 하나로</p>
        </a>
        <div className='flex items-center'>
          <Toggle className='mr-[15px]' />
          <a href='#' className='mr-[15px]'>
            지갑
          </a>
          <a href='#'>알림</a>
        </div>
      </div>
      {/* 헤더 끝 */}

      <div className='px-[20px] flex flex-col items-center py-[10px]'>
        {/* 카드 */}
        <AccountCard
          title='터틀넥즈감자탕식비'
          accountNumber='000-000000-00000'
          balance='1000000'
        />
        {/* 카드 끝 */}

        {/* 나의 키워드 */}
        <div className='w-full flex flex-col gap-[8px] mb-[110.5px] mt-[20px]'>
          {/* 나의 키워드 헤더 */}
          <div className='flex w-full justify-between'>
            <p className='text-[18px] font-semibold'>나의 키워드</p>
            <a href='/keyword'>
              <SlArrowRight className='cursor-pointer' />
            </a>
          </div>
          {/* 나의 키워드 헤더 끝 */}

          <motion.ul
            variants={ulVariants}
            initial='hidden'
            animate='visible'
            className='flex flex-col  gap-2.5'
          >
            {keywordList.slice(0, 5).map((each, index) => (
              <motion.li key={each.id} variants={liVariants} custom={index}>
                <Keyword key={each.id} data={each}></Keyword>
              </motion.li>
            ))}
          </motion.ul>
        </div>
        {/* 나의 키워드 끝 */}
        <SpeechToText />
      </div>

      {/* stt context 사용 예시*/}
      {/* <VoiceInputProvider>
      {/* <VoiceInputProvider>
        <MicRef />
      </VoiceInputProvider> */}
    </div>
  );
}
