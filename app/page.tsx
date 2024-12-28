'use client';

import SpeechToText from '@/components/SpeechToText';
import { CustomSidebarTrigger } from '@/components/atoms/CustomSidebarTrigger';
import LoadingDot from '@/components/atoms/LoadingDot';
import AccountCard from '@/components/molecules/AccountCard';
import FavoriteKeyword from '@/components/molecules/FavoriteKeyword';
import { AppSidebar } from '@/components/organisms/AppSidebar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { Toggle } from '@/components/ui/toggle';
import { VoiceInputProvider } from '@/contexts/VoiceContext';
import { useAccountApi } from '@/hooks/useAccount/useAccount';
import { useKeywordApi } from '@/hooks/useKeyword/useKeyword';
import { Account } from '@/types/Account';
import { UseKeywordResponse } from '@/types/Keyword';
import { motion } from 'motion/react';
import { useSession } from 'next-auth/react';
import { SlArrowRight } from 'react-icons/sl';
import { useEffect, useState } from 'react';
import { ulVariants } from '@/lib/motionVariable';

export default function Home() {
  const { getAllKeywords } = useKeywordApi();
  const { showMyAccounts } = useAccountApi();

  const [keywordList, setKeywordList] = useState<UseKeywordResponse[]>([]);
  const [accountList, setAccountList] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { status } = useSession();

  useEffect(() => {
    const fetchKeywordList = async () => {
      const keywordResponse = await getAllKeywords();
      const favoriteKeywords = keywordResponse.filter((k) => k.favorite);
      const nonFavoriteKeywords = keywordResponse.filter((k) => !k.favorite);

      if (favoriteKeywords.length > 0) {
        setKeywordList(favoriteKeywords.slice(0, 5));
      } else if (nonFavoriteKeywords.length > 0) {
        setKeywordList(nonFavoriteKeywords.slice(0, 5));
      }
    };
    const fetchAccountList = async () => {
      const accountResponse = await showMyAccounts();
      setAccountList(accountResponse);
    };
    try {
      if (status === 'authenticated') {
        fetchAccountList();
        fetchKeywordList();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [status]);

  // useEffect(() => {
  //   if (result) {
  //     const similarKeywords = findSimilarKeywords(
  //       keywordList.slice(0, 5),
  //       result
  //     );
  //     if (similarKeywords.length > 0) {
  //       const keywordElement = document.querySelector(
  //         `[data-keyword-id="${similarKeywords[0].id}"]`
  //       );
  //       if (keywordElement) {
  //         (keywordElement as HTMLElement).click();
  //       }
  //     }
  //     resetResult();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [result]);

  return (
    <>
      <SidebarProvider className=''>
        {loading && (
          <div className='absolute'>
            <LoadingDot />
          </div>
        )}
        <div className='absolute'>
          <AppSidebar />
        </div>
        <div className='h-screen relative bg-[#F6F7F9]'>
          {/* 헤더 시작 */}
          <div className='w-full h-[60px] flex px-[30px] items-center justify-between bg-white'>
            <a href='#'>
              <p className='font-pretendard font-bold text-xl'>키워드 하나로</p>
            </a>
            <div className='flex items-center gap-[15px]'>
              <Toggle />
              <a href='#'>지갑</a>
              <a href='#'>알림</a>
              <CustomSidebarTrigger />
              {/* <IoReorderThree size={30} /> */}
            </div>
          </div>
          {/* 헤더 끝 */}

          <div className='px-[20px] flex flex-col items-center py-[10px]'>
            {/* 카드 */}
            {accountList.length > 0 ? (
              <Carousel className='w-[calc(100%+20px)] h-[221px]'>
                <CarouselContent className=''>
                  {accountList.map((account) => (
                    <CarouselItem
                      key={account.id}
                      className='rounded-xl h-[221px] flex justify-center items-center'
                    >
                      <AccountCard
                        title={account.name}
                        accountNumber={account.accountNumber}
                        balance={account.balance.toString()}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            ) : (
              <>
                <div className='flex flex-col w-full h-[221px] py-[10px]'>
                  <Skeleton className='h-[201px] w-full rounded-xl' />
                </div>
              </>
            )}

            {/* 카드 끝 */}

            {/* 나의 키워드 */}
            <VoiceInputProvider>
              <div className='w-full flex flex-col gap-[8px] mb-[120px] mt-[20px]'>
                {/* 나의 키워드 헤더 */}
                <div className='flex w-full justify-between items-center'>
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
                  <FavoriteKeyword keywordList={keywordList}></FavoriteKeyword>
                </motion.ul>
              </div>
              <SpeechToText placeholder='키워드를 선택해주세요.' />
            </VoiceInputProvider>
            {/* 나의 키워드 끝 */}
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
