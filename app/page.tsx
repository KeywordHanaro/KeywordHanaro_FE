import { MicRef } from '@/components/atoms/Mic';
import AccountCard from '@/components/molecules/AccountCard';
import Keyword from '@/components/molecules/Keyword';
import { Toggle } from '@/components/ui/toggle';
import { VoiceInputProvider } from '@/contexts/VoiceContext';
import { keywordList } from '@/data/keyword';
import { SlArrowRight } from 'react-icons/sl';

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
          {
            // 여기에 나의 키워드 5개 불러와야함
            keywordList.slice(0, 5).map((data, idx) => (
              <Keyword key={idx} data={data} />
            ))
          }
        </div>
        {/* 나의 키워드 끝 */}
      </div>

      {/* stt context 사용 예시*/}
      <VoiceInputProvider>
        <MicRef lists={[]} />
      </VoiceInputProvider>
    </div>
  );
}
