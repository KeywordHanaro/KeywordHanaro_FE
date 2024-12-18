'use client';

import SpeechToText from '@/components/SpeechToText';
import { CustomSidebarTrigger } from '@/components/atoms/CustomSidebarTrigger';
import AccountCard from '@/components/molecules/AccountCard';
import Keyword from '@/components/molecules/Keyword';
import { AppSidebar } from '@/components/organisms/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toggle } from '@/components/ui/toggle';
import { useVoiceInputSession } from '@/contexts/VoiceContext';
import { keywordList } from '@/data/keyword';
import { motion } from 'motion/react';
// import { signOut } from 'next-auth/react';
import { SlArrowRight } from 'react-icons/sl';
import { useEffect } from 'react';
import { ulVariants, liVariants } from '@/lib/motionVariable';
import { findSimilarKeywords } from '@/lib/utils';

export default function Home() {
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
      <SidebarProvider className=''>
        <div className='absolute'>
          <AppSidebar />
        </div>
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
              <CustomSidebarTrigger />
              {/* <IoReorderThree size={30} /> */}
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
            <div className='w-full flex flex-col gap-[8px] mb-[120px] mt-[20px]'>
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
                    <Keyword
                      key={each.id}
                      data={each}
                      data-keyword-id={each.id}
                    ></Keyword>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
            {/* 나의 키워드 끝 */}
            <SpeechToText placeholder='키워드를 선택해주세요.' />
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
